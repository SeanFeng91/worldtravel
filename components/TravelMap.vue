<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-view"></div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const props = defineProps({
  travelPlan: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const map = ref(null);
const markers = ref([]);
const mapContainer = ref(null);

// 定义每天使用的颜色
const dayColors = [
  '#FF0000', // 红色
  '#00FF00', // 绿色
  '#0000FF', // 蓝色
  '#FFA500', // 橙色
  '#800080', // 紫色
  '#008080', // 青色
  '#FFD700'  // 金色
];

// 获取某天的颜色
const getDayColor = (dayNumber) => {
  return dayColors[(dayNumber - 1) % dayColors.length];
};

// 从行程内容中提取城市名
const extractCityName = (plan) => {
  if (!plan || !plan.overview) return '';
  
  // 直接从第一个地点名中提取城市名
  if (plan.days && plan.days[0] && plan.days[0].locations && plan.days[0].locations[0]) {
    const firstLocation = plan.days[0].locations[0].name;
    // 如果地点名包含市/省等字样，提取前面的部分
    const cityMatch = firstLocation.match(/^([^市省区县]+)[市省区县]/);
    if (cityMatch) {
      return cityMatch[1];
    }
  }
  
  // 如果从地点名无法提取，尝试从概览提取
  const cityMatches = plan.overview.match(/^([^市省区县]+)[市省区县]/);
  if (cityMatches) {
    return cityMatches[1];
  }
  
  return '';
};

// 获取地理坐标
const getCoordinates = async (locationName, cityName = '') => {
  try {
    // 判断是否是国外地点
    const isOverseas = /[a-zA-Z]/.test(locationName) || 
                      ['美国', '英国', '法国', '德国', '意大利', '日本'].some(country => 
                        locationName.includes(country) || (cityName && cityName.includes(country))
                      );

    let coordinates = null;
    
    // 国内地点优先使用高德地图
    if (!isOverseas) {
      const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
      if (AMAP_KEY) {
        try {
          const searchQuery = cityName ? `${cityName}${locationName}` : locationName;
          const amapResponse = await fetch(
            `https://restapi.amap.com/v3/place/text?` +
            `key=${AMAP_KEY}&` +
            `keywords=${encodeURIComponent(searchQuery)}&` +
            `city=${encodeURIComponent(cityName || 'all')}&` +
            `citylimit=true&` +
            `output=json&` +
            `offset=1&` +
            `page=1&` +
            `extensions=base`
          );

          if (amapResponse.ok) {
            const amapData = await amapResponse.json();
            console.log('高德地图搜索结果:', amapData);

            if (amapData.status === '1' && amapData.pois && amapData.pois.length > 0) {
              const [lng, lat] = amapData.pois[0].location.split(',');
              coordinates = [parseFloat(lng), parseFloat(lat)];
              console.log(`高德地图找到坐标: [${coordinates}] for ${searchQuery}`);
            }
          }
        } catch (error) {
          console.error('高德地图搜索失败:', error);
        }
      }
    }

    // 如果高德地图未找到结果或是国外地点，使用 OSM
    if (!coordinates) {
      console.log(`使用 OSM 搜索${isOverseas ? '国外' : '备选'}地点`);
      const searchQuery = cityName ? `${cityName} ${locationName}` : locationName;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` + 
        `q=${encodeURIComponent(searchQuery)}&` +
        `format=json&` +
        `limit=1&` +
        `accept-language=${isOverseas ? 'en' : 'zh-CN'}&` +
        (isOverseas ? '' : 'countrycodes=cn&')
      );

      if (!response.ok) {
        throw new Error(`OSM Geocoding error: ${response.status}`);
      }

      const data = await response.json();
      console.log('OSM搜索结果:', {
        query: searchQuery,
        result: data
      });

      if (data && data.length > 0) {
        coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
        console.log(`OSM找到坐标: [${coordinates}] for ${searchQuery}`);
      } else if (cityName) {
        // 如果带城市名搜索失败，尝试只用地点名
        return await getCoordinates(locationName);
      }
    }

    if (!coordinates) {
      console.warn(`未找到地点坐标: ${locationName}`);
      return null;
    }

    return coordinates;
  } catch (error) {
    console.error('获取坐标失败:', locationName, error);
    return null;
  }
};

// 添加标记
const addMarker = (coordinates, { title, description }) => {
  console.log('添加标记:', coordinates, title, description);
  
  try {
    // 创建标记元素
    const el = document.createElement('div');
    el.className = 'custom-marker';
    
    // 添加内部圆点
    const dot = document.createElement('div');
    dot.className = 'marker-dot';
    el.appendChild(dot);

    // 创建并添加标记
    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'bottom', // 修改锚点位置
      offset: [0, -5] // 微调位置
    })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        maxWidth: '300px'
      })
      .setHTML(`
        <div class="popup-content">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      `)
    );

    // 确保地图已加载
    if (map.value) {
      marker.addTo(map.value);
      console.log('标记已添加到地图:', coordinates);
    } else {
      console.error('地图实例未到');
    }

    return marker;
  } catch (error) {
    console.error('创建标记失败:', error);
    return null;
  }
};

// 监听行程数据变化
watch(() => props.travelPlan, async (newPlan) => {
  if (!newPlan || !map.value) return;
  console.log('更新地图标记:', newPlan);

  clearMarkers();
  const bounds = new mapboxgl.LngLatBounds();
  let hasValidLocation = false;

  // 处理每天的地点
  for (const day of newPlan.days) {
    const dayColor = getDayColor(day.day);
    const dayCoordinates = []; // 存储当天的所有坐标点

    for (const location of day.locations) {
      try {
        const coordinates = await getCoordinates(location.name);
        if (coordinates) {
          hasValidLocation = true;
          console.log(`添加标记: ${location.name}`, coordinates);
          
          // 使用带颜色的标记
          const marker = new mapboxgl.Marker({
            color: dayColor
          })
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="popup-content">
                    <h3>${location.name}</h3>
                    <p>第${day.day}天 ${location.period} ${location.arrival_time}-${location.departure_time}</p>
                  </div>
                `)
            )
            .addTo(map.value);

          markers.value.push(marker);
          bounds.extend(coordinates);
          dayCoordinates.push(coordinates);
        }
      } catch (error) {
        console.error(`处理地点失败: ${location.name}`, error);
      }
    }

    // 如果当天有多个地点，添加路径
    if (dayCoordinates.length > 1) {
      // 添加路径线
      const routeId = `route-day-${day.day}`;
      
      // 如果已存在相同ID的路径，先移除
      if (map.value.getSource(routeId)) {
        map.value.removeLayer(routeId);
        map.value.removeSource(routeId);
      }

      map.value.addSource(routeId, {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': dayCoordinates
          }
        }
      });

      map.value.addLayer({
        'id': routeId,
        'type': 'line',
        'source': routeId,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': dayColor,
          'line-width': 2,
          'line-opacity': 0.8,
          'line-dasharray': [2, 2] // 虚线效果
        }
      });
    }
  }

  // 调整地图视角
  if (hasValidLocation && markers.value.length > 0) {
    map.value.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      duration: 1000,
      maxZoom: 15
    });
  }
});

// 清除所有标记和路径
const clearMarkers = () => {
  // 清除标记
  markers.value.forEach(marker => marker.remove());
  markers.value = [];

  // 清除路径
  if (map.value) {
    map.value.getStyle().layers.forEach(layer => {
      if (layer.id.startsWith('route-day-')) {
        map.value.removeLayer(layer.id);
        map.value.removeSource(layer.id);
      }
    });
  }
};

// 创建标记元素
const createMarkerElement = () => {
  const el = document.createElement('div');
  el.className = 'custom-marker';
  
  const dot = document.createElement('div');
  dot.className = 'marker-dot';
  el.appendChild(dot);

  const pulse = document.createElement('div');
  pulse.className = 'marker-pulse';
  el.appendChild(pulse);

  return el;
};

// 初始化地图
onMounted(() => {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  
  if (!MAPBOX_TOKEN) {
    console.error('未找到 Mapbox token，请检查环境变量 VITE_MAPBOX_ACCESS_TOKEN');
    return;
  }

  mapboxgl.accessToken = MAPBOX_TOKEN;

  try {
    // 确保 DOM 元素已经挂载
    nextTick(() => {
      if (!mapContainer.value) {
        console.error('地图容器元素未找到');
        return;
      }

      map.value = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [120.143202, 30.246044], // 默认显示杭州
        zoom: 12
      });

      // 添加导航控件
      map.value.addControl(new mapboxgl.NavigationControl());

      // 等待地图加载完成
      map.value.on('load', () => {
        console.log('地图加载完成');
      });

      map.value.on('error', (e) => {
        console.error('Mapbox 错误:', e);
      });
    });
  } catch (error) {
    console.error('初始化地图失败:', error);
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-view {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.popup-content {
  padding: 12px;
}

.popup-content h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.popup-content p {
  margin: 4px 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.popup-content .description {
  font-style: italic;
  margin-top: 8px;
}

.popup-content .transport,
.popup-content .cost {
  color: var(--vp-c-text-3);
}

.custom-marker {
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
}

.marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: var(--vp-c-brand);
  border: 2px solid white;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.marker-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: var(--vp-c-brand);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.3;
  }
  70% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 