<template>
  <div class="travel-map">
    <div id="map" class="map-content"></div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export default {
  name: 'TravelMap',
  props: {
    travelPlan: {
      type: Object,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      map: null,
      markers: []
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      const checkMapbox = () => {
        if (typeof mapboxgl !== 'undefined') {
          this.initializeMap();
        } else {
          console.log('等待 Mapbox GL JS 加载...');
          setTimeout(checkMapbox, 100);
        }
      };
      
      checkMapbox();
    }
  },
  methods: {
    initializeMap() {
      try {
        console.log('开始初始化地图');
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [45, 40], // 默认中心点（亚美尼亚附近）
          zoom: 5,
          projection: 'globe'
        });

        console.log('地图实例创建成功');

        this.map.addControl(new mapboxgl.NavigationControl());

        this.map.on('style.load', () => {
          console.log('地图样式加载完成');
          this.map.setFog({});
          
          // 如果已经有旅行计划数据，立即更新地图
          if (this.travelPlan) {
            this.updateMapFeatures(this.travelPlan);
          }
        });
      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    },
    updateMapFeatures(plan) {
      if (!plan?.days || !this.map) {
        console.log('跳过地图更新 - 地图未就绪或无计划数据');
        return;
      }
      
      try {
        // 清除现有标记
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
        
        // 收集所有坐标点
        const coordinates = [];
        const bounds = new mapboxgl.LngLatBounds();
        
        plan.days.forEach(day => {
          day.locations.forEach(location => {
            const [lng, lat] = location.coordinates;
            
            // 创建标记
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.innerHTML = `<span>${day.day}</span>`;
            
            const marker = new mapboxgl.Marker(el)
              .setLngLat([lng, lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(
                    `<h3>第${day.day}天: ${location.name}</h3>
                     <p>${location.description}</p>
                     <p>到达时间: ${location.arrival_time}</p>
                     <p>交通方式: ${location.transportation}</p>`
                  )
              )
              .addTo(this.map);
            
            this.markers.push(marker);
            coordinates.push([lng, lat]);
            bounds.extend([lng, lat]);
          });
        });
        
        // 如果有坐标点，添加路线和调整视图
        if (coordinates.length > 0) {
          this.updateRouteLine(coordinates);
          this.map.fitBounds(bounds, {
            padding: 50,
            duration: 1000
          });
        }
      } catch (error) {
        console.error('更新地图特征时出错:', error);
      }
    },
    updateRouteLine(coordinates) {
      if (this.map.getSource('route')) {
        this.map.removeLayer('route');
        this.map.removeSource('route');
      }
      
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        }
      });
      
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FF0000',
          'line-width': 3,
          'line-opacity': 0.7
        }
      });
    }
  },
  watch: {
    travelPlan: {
      handler(newPlan) {
        if (newPlan && this.map) {
          this.updateMapFeatures(newPlan);
        }
      },
      deep: true
    }
  },
  beforeUnmount() {
    if (this.map) {
      this.markers.forEach(marker => marker.remove());
      this.map.remove();
    }
  }
}
</script>

<style scoped>
.travel-map {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.map-content {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--vp-c-brand);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.custom-marker {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style> 