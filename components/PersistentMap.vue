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
      <button @click="toggleMapSize" class="control-btn">
        {{ isExpanded ? '收起地图' : '展开地图' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  mapEnabled: Boolean
})

const emit = defineEmits(['map-expand'])
const mapElement = ref(null)
const map = ref(null)
const markers = ref([])
const bounds = ref(null)
const currentInfoWindow = ref(null)
const isExpanded = ref(false)

// 计算是否有标记
const hasMarkers = computed(() => markers.value.length > 0)

// 修改 initMap 方法
const initMap = async () => {
  if (!mapElement.value || map.value) return

  try {
    // 确保 Google Maps API 已加载
    if (!window.google?.maps) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = resolve
        script.onerror = () => reject(new Error('Google Maps 加载失败'))
        document.head.appendChild(script)
      })
    }

    map.value = new window.google.maps.Map(mapElement.value, {
      center: { lat: 35.6762, lng: 139.6503 }, // 默认中心设在东京
      zoom: 12,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    })

    // 添加地图加载完成的事件监听
    google.maps.event.addListenerOnce(map.value, 'idle', () => {
      console.log('Map fully loaded')
      google.maps.event.trigger(map.value, 'resize')
    })

  } catch (error) {
    console.error('Map initialization error:', error)
  }
}

// 更新地图标记
const updateMarkers = async (newMarkers) => {
  if (!map.value) {
    await initMap() // 确保地图已初始化
  }

  console.log('Updating markers with:', newMarkers)

  try {
    const google = window.google
    
    // 只在必要时清除现有标记
    if (markers.value.length > 0) {
      markers.value.forEach(marker => marker.setMap(null))
      markers.value = []
    }

    bounds.value = new google.maps.LatLngBounds()

    // 处理新标记
    for (const markerData of newMarkers) {
      try {
        let position
        let title

        // 如果是地址字符串，直接进行地理编码
        if (typeof markerData === 'string') {
          try {
            const geocoder = new google.maps.Geocoder()
            const result = await new Promise((resolve, reject) => {
              geocoder.geocode(
                { address: markerData },
                (results, status) => {
                  if (status === 'OK' && results[0]) {
                    resolve({
                      position: results[0].geometry.location,
                      title: markerData
                    })
                  } else {
                    reject(new Error(`Geocode failed: ${status}`))
                  }
                }
              )
            })
            position = result.position
            title = result.title
          } catch (error) {
            console.error('Geocoding error:', error)
            continue
          }
        } else if (typeof markerData === 'object') {
          if (markerData.address) {
            try {
              const geocoder = new google.maps.Geocoder()
              const result = await new Promise((resolve, reject) => {
                geocoder.geocode(
                  { address: markerData.address },
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
              title = markerData.address
            } catch (error) {
              console.error('Geocoding error:', error)
              continue
            }
          }
        }

        if (!position) {
          console.warn('No valid position found for marker:', markerData)
          continue
        }

        console.log('Creating marker at position:', position)

        const marker = new google.maps.Marker({
          position,
          map: map.value,
          title,
          animation: google.maps.Animation.DROP
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
      } catch (error) {
        console.error('Marker creation error:', error)
      }
    }

    // 调整地图视野
    if (markers.value.length > 0) {
      console.log('Fitting bounds for markers:', markers.value.length)
      map.value.fitBounds(bounds.value)
      
      // 如果只有一个标记，设置适当的缩放级别
      if (markers.value.length === 1) {
        map.value.setZoom(15)
      }
      
      // 触发地图重绘
      google.maps.event.trigger(map.value, 'resize')
    }
  } catch (error) {
    console.error('Update markers error:', error)
  }
}

// 清除所有标记
const clearMarkers = () => {
  try {
    // 清除现有标记
    if (markers.value && markers.value.length > 0) {
      markers.value.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null)
        }
      })
      // 确保数组被清空
      markers.value.length = 0
    }
    
    // 清除信息窗口
    if (currentInfoWindow.value) {
      currentInfoWindow.value.close()
      currentInfoWindow.value = null
    }
    
    // 重置边界
    if (window.google?.maps && map.value) {
      bounds.value = new window.google.maps.LatLngBounds()
      
      // 重置地图中心和缩放级别
      map.value.setCenter({ lat: 30, lng: 115 })
      map.value.setZoom(4)
      
      // 触发地图重绘
      google.maps.event.trigger(map.value, 'resize')
    }

    console.log('Markers cleared, current markers:', markers.value)
  } catch (error) {
    console.error('Error clearing markers:', error)
  }
}

// 显示所有标记
const fitAllMarkers = () => {
  if (markers.value.length > 0 && map.value) {
    map.value.fitBounds(bounds.value)
  }
}

// 添加切换地图大小的方法
const toggleMapSize = () => {
  isExpanded.value = !isExpanded.value
  emit('map-expand', isExpanded.value)
  // 确保地图重新渲染以适应新的大小
  if (map.value) {
    google.maps.event.trigger(map.value, 'resize')
    if (hasMarkers.value) {
      fitAllMarkers()
    }
  }
}

// 暴露方法给父组件
defineExpose({
  initMap,
  updateMarkers,
  clearMarkers,
  fitAllMarkers,
  map
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
  position: sticky;
  top: 0;
  width: 100%;
  height: v-bind('isExpanded ? "800px" : "400px"');
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
  transition: height 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 10;
  background: white;
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
  z-index: 1;
}

.control-btn {
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.control-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 