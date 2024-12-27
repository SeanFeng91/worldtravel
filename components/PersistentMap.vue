<template>
  <div class="map-container" v-show="mapEnabled">
    <div ref="mapElement" class="map"></div>
    <div class="map-controls">
      <button @click="clearMarkers" class="control-btn">
        清除标记
      </button>
      <button @click="fitAllMarkers" class="control-btn" v-if="hasMarkers">
        显示所有标记
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  mapEnabled: Boolean
})

const mapElement = ref(null)
const map = ref(null)
const markers = ref([])
const bounds = ref(null)
const currentInfoWindow = ref(null)

// 计算是否有标记
const hasMarkers = computed(() => markers.value.length > 0)

// 修改 initMap 方法
const initMap = async () => {
  if (!mapElement.value || map.value) return

  try {
    // 确保 google maps API 已加载
    if (!window.google?.maps) {
      await loadGoogleMaps()
    }

    bounds.value = new google.maps.LatLngBounds()
    
    map.value = new google.maps.Map(mapElement.value, {
      center: { lat: 30, lng: 110 },
      zoom: 3,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    })

    map.value.addListener('click', () => {
      if (currentInfoWindow.value) {
        currentInfoWindow.value.close()
        currentInfoWindow.value = null
      }
    })
  } catch (error) {
    console.error('Map initialization error:', error)
  }
}

// 添加 Google Maps API 加载函数
const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps 加载失败'))
    
    document.head.appendChild(script)
  })
}

// 更新地图标记
const updateMarkers = async (newMarkers) => {
  if (!map.value) return

  try {
    const google = window.google
    bounds.value = new google.maps.LatLngBounds()

    // 处理新标记
    for (const markerData of newMarkers) {
      try {
        let position
        let title

        if (typeof markerData === 'object') {
          if (!markerData.coordinates.includes(',')) {
            const geocoder = new google.maps.Geocoder()
            const result = await new Promise((resolve, reject) => {
              geocoder.geocode(
                { address: markerData.address, region: 'jp' },
                (results, status) => {
                  if (status === 'OK' && results[0]) {
                    resolve(results[0].geometry.location)
                  } else {
                    reject(new Error(`Geocode failed: ${status}`))
                  }
                }
              )
            })
            position = result
          } else {
            const [lat, lng] = markerData.coordinates.split(',').map(Number)
            position = { lat, lng }
          }
          title = markerData.address
        }

        if (position) {
          const marker = new google.maps.Marker({
            position,
            map: map.value,
            title,
            animation: google.maps.Animation.DROP,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(32, 32),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(16, 32)
            }
          })

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 8px;">${title}</div>`
          })

          marker.addListener('click', () => {
            if (currentInfoWindow.value) {
              currentInfoWindow.value.close()
            }
            infoWindow.open(map.value, marker)
            currentInfoWindow.value = infoWindow
          })

          markers.value.push(marker)
          bounds.value.extend(position)
        }
      } catch (error) {
        console.error('Marker creation error:', error)
      }
    }

    // 调整地图视野
    if (markers.value.length > 0) {
      map.value.fitBounds(bounds.value)
      if (markers.value.length === 1) {
        map.value.setZoom(Math.min(15, map.value.getZoom()))
      }
    }
  } catch (error) {
    console.error('Update markers error:', error)
  }
}

// 清除所有标记
const clearMarkers = () => {
  markers.value.forEach(marker => marker.setMap(null))
  markers.value = []
  if (currentInfoWindow.value) {
    currentInfoWindow.value.close()
    currentInfoWindow.value = null
  }
}

// 显示所有标记
const fitAllMarkers = () => {
  if (markers.value.length > 0 && map.value) {
    map.value.fitBounds(bounds.value)
  }
}

// 暴露方法给父组件
defineExpose({
  initMap,
  updateMarkers,
  clearMarkers,
  fitAllMarkers
})

onMounted(() => {
  // 不再自动初始化地图
})

onUnmounted(() => {
  clearMarkers()
})
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.control-btn:hover {
  background: #f5f5f5;
}
</style> 