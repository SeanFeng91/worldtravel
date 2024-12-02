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
    // 构建搜索查询
    let searchQuery = locationName;
    if (cityName && !locationName.includes(cityName)) {
      searchQuery = `${cityName}${locationName}`;
    }

    console.log('搜索地点:', searchQuery);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` + 
      `q=${encodeURIComponent(searchQuery)}&` +
      `format=json&` +
      `limit=1&` +
      `countrycodes=cn&` + // 限制在中国范围内搜索
      `accept-language=zh-CN`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OSM地点查询结果:', {
      query: searchQuery,
      result: data
    });

    if (data && data.length > 0) {
      const coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
      console.log(`找到坐标 [${coordinates}] for ${searchQuery}`);
      return coordinates;
    }

    // 如果没找到，尝试直接搜索地点名
    if (searchQuery !== locationName) {
      console.log('尝试直接搜索地点名:', locationName);
      const fallbackResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?` + 
        `q=${encodeURIComponent(locationName)}&` +
        `format=json&` +
        `limit=1&` +
        `countrycodes=cn&` +
        `accept-language=zh-CN`
      );

      if (!fallbackResponse.ok) {
        throw new Error(`Fallback geocoding API error: ${fallbackResponse.status}`);
      }

      const fallbackData = await fallbackResponse.json();
      console.log('OSM备用查询结果:', {
        query: locationName,
        result: fallbackData
      });

      if (fallbackData && fallbackData.length > 0) {
        const coordinates = [parseFloat(fallbackData[0].lon), parseFloat(fallbackData[0].lat)];
        console.log(`找到备用坐标 [${coordinates}] for ${locationName}`);
        return coordinates;
      }
    }

    console.warn(`未找到地点坐标: ${searchQuery}`);
    return null;
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
      console.error('地图实例未找到');
    }

    return marker;
  } catch (error) {
    console.error('创建标记失败:', error);
    return null;
  }
};

// 清除所有标记
const clearMarkers = () => {
  markers.value.forEach(marker => marker.remove());
  markers.value = [];
};

// 监听行程数据变化
watch(() => props.travelPlan, async (newPlan) => {
  if (!newPlan || !map.value) return;
  console.log('更新地图标记:', newPlan);

  clearMarkers();
  const bounds = new mapboxgl.LngLatBounds();
  let hasValidLocation = false;

  // 提取城市名
  const cityName = extractCityName(newPlan);
  console.log('提取的城市名:', cityName);

  // 处理每天的地点
  for (const day of newPlan.days) {
    for (const location of day.locations) {
      try {
        const coordinates = await getCoordinates(location.name, cityName);
        if (coordinates) {
          hasValidLocation = true;
          console.log(`添加标记: ${location.name}`, coordinates);
          
          const marker = addMarker(coordinates, {
            title: location.name,
            description: `第${day.day}天 ${location.period} ${location.arrival_time}-${location.departure_time}`
          });
          
          if (marker) {
            markers.value.push(marker);
            bounds.extend(coordinates);
          }
        }
      } catch (error) {
        console.error(`处理地点失败: ${location.name}`, error);
      }
    }
  }

  // 调整地图视角
  if (hasValidLocation && markers.value.length > 0) {
    console.log('调整地图视角到标记范围');
    map.value.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      duration: 1000,
      maxZoom: 15
    });
  }
});

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

.custom-marker {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
}

.marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background-color: var(--vp-c-brand);
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.custom-marker::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: var(--vp-c-brand);
  border-radius: 50%;
  opacity: 0.2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.5;
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

/* 弹窗样式 */
:deep(.mapboxgl-popup-content) {
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: none;
}

:deep(.mapboxgl-popup-tip) {
  display: none;
}

.popup-content h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.popup-content p {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

/* 暗色主题适配 */
:deep(.dark) .popup-content {
  background: var(--vp-c-bg);
}

:deep(.dark) .marker-dot {
  border-color: var(--vp-c-bg);
}

.coordinates {
  font-size: 12px;
  color: var(--vp-c-text-3);
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 8px;
  margin-top: 8px;
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