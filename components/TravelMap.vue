<template>
  <div class="map-container">
    <div id="map" :class="{ loading: isLoading }"></div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import mapboxgl from 'mapbox-gl';

const props = defineProps({
  travelPlan: {
    type: Object,
    default: () => null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const map = ref(null);
const markers = ref([]);

// 初始化地图
onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [116.4074, 39.9042], // 默认中心点（北京）
    zoom: 3
  });
});

// 清除所有标记
const clearMarkers = () => {
  markers.value.forEach(marker => marker.remove());
  markers.value = [];
};

// 监听行程数据变化
watch(() => props.travelPlan, async (newPlan) => {
  if (!newPlan || !map.value) return;

  clearMarkers();

  // 为每个地点添加标记
  for (const location of newPlan.locations) {
    try {
      const coordinates = await getCoordinates(location.location);
      if (coordinates) {
        const marker = addMarker(coordinates, {
          title: location.location,
          description: `第${location.day}天 ${location.period} ${location.startTime}-${location.endTime}`,
        });
        markers.value.push(marker);
      }
    } catch (error) {
      console.error('添加标记失败:', error);
    }
  }

  // 调整地图视角
  fitBounds();
}, { deep: true });

// 获取地理坐标
const getCoordinates = async (locationName) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${mapboxgl.accessToken}&language=zh-Hans`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].center;
    }
  } catch (error) {
    console.error('获取坐标失败:', error);
  }
  return null;
};

// 添加标记
const addMarker = (coordinates, { title, description }) => {
  const el = document.createElement('div');
  el.className = 'marker';
  
  const marker = new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${title}</h3><p>${description}</p>`)
    )
    .addTo(map.value);

  return marker;
};

// 调整地图视角以显示所有标记
const fitBounds = () => {
  if (markers.value.length === 0) return;

  const bounds = new mapboxgl.LngLatBounds();
  markers.value.forEach(marker => {
    bounds.extend(marker.getLngLat());
  });

  map.value.fitBounds(bounds, {
    padding: 50,
    duration: 1000
  });
};

// 暴露方法给父组件
defineExpose({
  updateMarkers: async (locations) => {
    if (!map.value) return;
    clearMarkers();
    // ... 更新标记的逻辑
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.marker {
  width: 20px;
  height: 20px;
  background-color: var(--vp-c-brand);
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(0,0,0,0.3);
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