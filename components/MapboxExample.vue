<template>
  <div>
    <!-- 输入起点和终点 -->
    <div style="margin-bottom: 10px;">
      <div class="address-input">
        <label for="start">起点：</label>
        <input 
          id="start" 
          v-model="startAddress" 
          @input="getSuggestions($event.target.value, true)"
          placeholder="输入起点地址" 
        />
        <!-- 起点建议列表 -->
        <ul v-if="startSuggestions.length" class="suggestions">
          <li 
            v-for="suggestion in startSuggestions" 
            :key="suggestion.mapbox_id"
            @click="selectSuggestion(suggestion, true)"
          >
            {{ suggestion.full_address }}
          </li>
        </ul>
      </div>

      <div class="address-input">
        <label for="end">终点：</label>
        <input 
          id="end" 
          v-model="endAddress" 
          @input="getSuggestions($event.target.value, false)"
          placeholder="输入终点地址" 
        />
        <!-- 终点建议列表 -->
        <ul v-if="endSuggestions.length" class="suggestions">
          <li 
            v-for="suggestion in endSuggestions" 
            :key="suggestion.mapbox_id"
            @click="selectSuggestion(suggestion, false)"
          >
            {{ suggestion.full_address }}
          </li>
        </ul>
      </div>

      <button @click="planRoute">规划路径</button>
    </div>

    <!-- 地图容器 -->
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  
  const accessToken = 'pk.eyJ1IjoiaGlhaGlhNDUiLCJhIjoiY2lvdHcyZ3FqMDBkOHUwbTRyMTk1MmR1eCJ9.2SdvRkolF1B_GSrABB_Pxg';
  
  // 地址输入和地图对象
  const startAddress = ref('');
  const endAddress = ref('');
  const startSuggestions = ref([]);
  const endSuggestions = ref([]);
  let map;
  
  onMounted(() => {
    mapboxgl.accessToken = accessToken;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [139.6917, 35.6895], // 东京坐标
      zoom: 12,
    });
  });
  
  // 生成会话token
  const generateSessionToken = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  // 获取地址建议
  const getSuggestions = async (query, isStart = true) => {
    if (!query) {
      if (isStart) startSuggestions.value = [];
      else endSuggestions.value = [];
      return;
    }
    
    try {
      // 1. 首先使用 suggest endpoint 获取建议列表
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?` + 
        new URLSearchParams({
          q: query,
          language: 'zh',
          access_token: accessToken,
          session_token: generateSessionToken()
        })
      );
      
      const data = await response.json();
      
      // 保存建议列表
      if (isStart) {
        startSuggestions.value = data.suggestions.map(item => ({
          mapbox_id: item.mapbox_id,
          full_address: `${item.name}${item.place_formatted ? ', ' + item.place_formatted : ''}`
        }));
      } else {
        endSuggestions.value = data.suggestions.map(item => ({
          mapbox_id: item.mapbox_id,
          full_address: `${item.name}${item.place_formatted ? ', ' + item.place_formatted : ''}`
        }));
      }
    } catch (error) {
      console.error('获取地址建议失败:', error);
    }
  };
  
  // 选择建议地址时，使用 retrieve endpoint 获取完整信息
  const selectSuggestion = async (suggestion, isStart = true) => {
    try {
      // 2. 使用选中建议的 mapbox_id 调用 retrieve endpoint
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?` +
        new URLSearchParams({
          session_token: generateSessionToken(),
          access_token: accessToken
        })
      );
      
      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates;
      
      if (isStart) {
        startAddress.value = suggestion.full_address;
        startSuggestions.value = [];
      } else {
        endAddress.value = suggestion.full_address;
        endSuggestions.value = [];
      }
      
      return coordinates;
    } catch (error) {
      console.error('获取地址详情失败:', error);
      return null;
    }
  };
  
  // 规划路径
  const planRoute = async () => {
    try {
      // 获取起点和终点的坐标
      const startCoords = await geocode(startAddress.value);
      const endCoords = await geocode(endAddress.value);
  
      // 请求路径规划 API
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${accessToken}`
      );
      const data = await response.json();
      const route = data.routes[0].geometry;
  
      // 清除现有的路线
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }
  
      // 添加新路线
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route,
        },
      });
  
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
        },
      });
  
      // 添加起点和终点标记
      new mapboxgl.Marker().setLngLat(startCoords).addTo(map);
      new mapboxgl.Marker().setLngLat(endCoords).addTo(map);
  
      // 调整地图视野
      map.fitBounds([startCoords, endCoords], { padding: 50 });
    } catch (error) {
      console.error('路径规划失败:', error);
      alert('路径规划失败，请检查地址输入是否正确');
    }
  };
  
  // 地址转坐标
  const geocode = async (address) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${accessToken}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].geometry.coordinates;
    }
    throw new Error('地址解析失败');
  };
  </script>
  
  <style scoped>
  .address-input {
    position: relative;
    margin-bottom: 10px;
  }
  
  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .suggestions li {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .suggestions li:hover {
    background-color: #f5f5f5;
  }
  
  #map {
    width: 100%;
    height: 500px;
  }
  </style>
  