<template>
  <div class="travel-map-container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="route-panel">
      <div v-if="error" class="error-message">{{ error }}</div>
      <div class="waypoint-inputs">
        <div class="waypoint-input">
          <span class="point-icon start">起</span>
          <div class="input-with-search">
            <input 
              v-model="startPoint.name" 
              placeholder="输入地点名称或在地图上选择"
              @focus="focusPoint('start')"
              @input="searchLocation('start')"
            >
            <div v-if="searchResults.start.length > 0" class="search-results">
              <div 
                v-for="(result, index) in searchResults.start" 
                :key="index"
                class="search-result-item"
                @click="selectSearchResult('start', result)"
              >
                {{ result.display_name }}
              </div>
            </div>
          </div>
        </div>
        <div v-for="(point, index) in waypoints" :key="index" class="waypoint-input">
          <span class="point-icon way">经</span>
          <div class="input-with-search">
            <input 
              v-model="point.name" 
              placeholder="输入途经点"
              @focus="focusPoint('waypoint', index)"
              @input="searchLocation('waypoint', index)"
            >
            <div v-if="searchResults.waypoints[index]?.length > 0" class="search-results">
              <div 
                v-for="(result, rIndex) in searchResults.waypoints[index]" 
                :key="rIndex"
                class="search-result-item"
                @click="selectSearchResult('waypoint', result, index)"
              >
                {{ result.display_name }}
              </div>
            </div>
          </div>
          <button class="remove-btn" @click="removeWaypoint(index)">×</button>
        </div>
        <div class="waypoint-input">
          <span class="point-icon end">终</span>
          <div class="input-with-search">
            <input 
              v-model="endPoint.name" 
              placeholder="输入地点名称或在地图上选择"
              @focus="focusPoint('end')"
              @input="searchLocation('end')"
            >
            <div v-if="searchResults.end.length > 0" class="search-results">
              <div 
                v-for="(result, index) in searchResults.end" 
                :key="index"
                class="search-result-item"
                @click="selectSearchResult('end', result)"
              >
                {{ result.display_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="route-controls">
        <button @click="addWaypoint" class="add-waypoint-btn">
          添加途经点
        </button>
        <button @click="planRoute" class="plan-route-btn">
          规划路线
        </button>
        <button @click="clearMap" class="clear-btn">
          清除
        </button>
      </div>
    </div>
    <div :id="`travel-map-${mapId}`" style="height: 500px; width: 100%; margin: 20px 0;"></div>
    <div v-if="routeInfo" class="route-info">
      <h3>路线信息</h3>
      <p>总距离: {{ (routeInfo.distance / 1000).toFixed(1) }} 公里</p>
      <div class="waypoints-list">
        <div v-if="startPoint.name" class="waypoint-item">
          <span class="point-icon start">起</span>
          <span>{{ startPoint.name }}</span>
        </div>
        <div v-for="(point, index) in waypoints" :key="index" class="waypoint-item">
          <span class="point-icon way">经</span>
          <span>{{ point.name }}</span>
        </div>
        <div v-if="endPoint.name" class="waypoint-item">
          <span class="point-icon end">终</span>
          <span>{{ endPoint.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

// 添加 props 定义
const props = defineProps({
  mapId: {
    type: String,
    required: true
  }
})

const error = ref('')
const map = ref(null)
const markers = ref([])
const route = ref(null)
const routeInfo = ref(null)
let L = null

// 路线点位
const startPoint = ref({ name: '', marker: null })
const endPoint = ref({ name: '', marker: null })
const waypoints = ref([])

// 当前选中的输入类型
const currentFocus = ref(null)
const currentWaypointIndex = ref(null)

// 格式化坐标
const formatCoords = (latlng) => {
  return `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`
}

// 更新地点名称的函数
const updateLocationName = async (latlng, type, index) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?` + 
      new URLSearchParams({
        format: 'json',
        lat: latlng.lat,
        lon: latlng.lng,
        'accept-language': 'zh-CN,en',
        addressdetails: 1,
        namedetails: 1
      })
    )
    
    const data = await response.json()
    
    // 处理地点名称
    const displayName = data.namedetails?.name?.zh || 
                       data.namedetails?.name || 
                       data.display_name.split(',')[0]
    
    const country = data.address?.country || 
                   data.address?.country_code?.toUpperCase() ||
                   data.display_name.split(',').pop().trim()
    
    const newName = `${displayName} (${country})`
    
    // 更新对应的输入框
    if (type === 'start') {
      startPoint.value.name = newName
    } else if (type === 'end') {
      endPoint.value.name = newName
    } else if (type === 'waypoint' && index !== undefined) {
      if (waypoints.value[index]) {
        waypoints.value[index].name = newName
      }
    }
    
    return data.display_name // 返回完整地址用于弹出框
  } catch (e) {
    console.error('获取地点名称错误:', e)
    return `位置 (${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)})`
  }
}

// 修改创建标记点函数
const createMarker = (latlng, type, index) => {
  if (!L) return null
  
  const colors = {
    start: '#4CAF50',
    way: '#FF9800',
    end: '#F44336'
  }
  const labels = {
    start: '起',
    way: '经',
    end: '终'
  }
  
  const marker = L.marker(latlng, {
    icon: L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${colors[type]};" class="marker-pin">${labels[type]}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    }),
    draggable: true
  })
  
  // 存储标记点类型和索引
  marker.pointType = type
  marker.pointIndex = index
  
  // 添加拖动结束事件处理
  marker.on('dragend', async (event) => {
    const newPos = event.target.getLatLng()
    const markerType = event.target.pointType
    const markerIndex = event.target.pointIndex
    
    try {
      // 获取新位置的地址信息
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` + 
        new URLSearchParams({
          format: 'json',
          lat: newPos.lat,
          lon: newPos.lng,
          'accept-language': 'zh-CN,en',
          addressdetails: 1,
          namedetails: 1
        })
      )
      
      const data = await response.json()
      
      // 处理地点名称
      const displayName = data.namedetails?.name?.zh || 
                         data.namedetails?.name || 
                         data.display_name.split(',')[0]
      
      const country = data.address?.country || 
                     data.address?.country_code?.toUpperCase() ||
                     data.display_name.split(',').pop().trim()
      
      const newName = `${displayName} (${country})`
      
      // 更新对应的输入框和标记点信息
      if (markerType === 'start') {
        startPoint.value.name = newName
        startPoint.value.marker = event.target
      } else if (markerType === 'end') {
        endPoint.value.name = newName
        endPoint.value.marker = event.target
      } else if (markerType === 'way' && markerIndex !== undefined) {
        if (waypoints.value[markerIndex]) {
          waypoints.value[markerIndex].name = newName
          waypoints.value[markerIndex].marker = event.target
        }
      }
      
      // 更新弹出框内容
      event.target.bindPopup(data.display_name)
      
      // 更新路线
      updateRoute()
    } catch (e) {
      console.error('更新地点信息错误:', e)
      error.value = '更新地点信息失败，请重试'
    }
  })
  
  return marker
}

// 修改初始化地图函数
const initMap = async () => {
  try {
    if (typeof window === 'undefined') return

    const leaflet = await import('leaflet')
    L = leaflet.default
    await import('leaflet/dist/leaflet.css')

    console.log('初始化地图，mapId:', props.mapId)
    const mapElement = document.getElementById(`travel-map-${props.mapId}`)
    if (!mapElement) {
      error.value = '地图容器未找到'
      console.error('地图容器未找到:', `travel-map-${props.mapId}`)
      return
    }

    // 修复图标路径
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    })

    // 初始化地图 - 修改这里使用正确的 ID
    map.value = L.map(`travel-map-${props.mapId}`).setView([35.86166, 104.195397], 4)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      minZoom: 2
    }).addTo(map.value)

    // 添加比例尺
    L.control.scale({
      imperial: false,
      maxWidth: 200
    }).addTo(map.value)

    // 添加点击事件
    map.value.on('click', handleMapClick)

    console.log('地图初始化完成')
  } catch (e) {
    console.error('地图初始化错误:', e)
    error.value = `地图加载失败: ${e.message}`
  }
}

// 修改处理地图点击函数
const handleMapClick = (e) => {
  if (!currentFocus.value) {
    error.value = '请先点击输入框选择要设置的位置类型'
    return
  }

  try {
    if (currentFocus.value === 'start') {
      if (startPoint.value.marker) {
        map.value.removeLayer(startPoint.value.marker)
      }
      const marker = createMarker(e.latlng, 'start', null)  // 添加 null 作为 index
      if (marker) {
        marker.addTo(map.value)
        startPoint.value.marker = marker
        updateLocationName(e.latlng, 'start')  // 更新地点名称
      }
    } else if (currentFocus.value === 'end') {
      if (endPoint.value.marker) {
        map.value.removeLayer(endPoint.value.marker)
      }
      const marker = createMarker(e.latlng, 'end', null)  // 添加 null 作为 index
      if (marker) {
        marker.addTo(map.value)
        endPoint.value.marker = marker
        updateLocationName(e.latlng, 'end')  // 更新地点名称
      }
    } else if (currentFocus.value === 'waypoint') {
      const index = currentWaypointIndex.value
      if (waypoints.value[index].marker) {
        map.value.removeLayer(waypoints.value[index].marker)
      }
      const marker = createMarker(e.latlng, 'way', index)  // 正确传递 index
      if (marker) {
        marker.addTo(map.value)
        waypoints.value[index].marker = marker
        updateLocationName(e.latlng, 'waypoint', index)  // 更新地点名称
      }
    }

    // 清除当前焦点
    currentFocus.value = null
    updateRoute()
  } catch (e) {
    console.error('添加标记点错误:', e)
    error.value = '添加标记点失败，请重试: ' + e.message
  }
}

// 聚焦点位输入框
const focusPoint = (type, index) => {
  currentFocus.value = type
  currentWaypointIndex.value = index
  error.value = ''
  
  // 清除其他输入框的搜索结果
  Object.keys(searchResults.value).forEach(key => {
    if (key !== type) {
      if (key === 'waypoints') {
        searchResults.value.waypoints = {}
      } else {
        searchResults.value[key] = []
      }
    }
  })
}

// 添加途经点
const addWaypoint = () => {
  waypoints.value.push({ name: '', marker: null })
}

// 移除途经点
const removeWaypoint = (index) => {
  if (waypoints.value[index].marker) {
    map.value.removeLayer(waypoints.value[index].marker)
  }
  waypoints.value.splice(index, 1)
  updateRoute()
}

// 更新路线
const updateRoute = () => {
  if (route.value) {
    map.value.removeLayer(route.value)
    route.value = null
  }

  const points = []
  let totalDistance = 0

  if (startPoint.value.marker) points.push(startPoint.value.marker.getLatLng())
  waypoints.value.forEach(point => {
    if (point.marker) points.push(point.marker.getLatLng())
  })
  if (endPoint.value.marker) points.push(endPoint.value.marker.getLatLng())

  if (points.length >= 2) {
    route.value = L.polyline(points, {
      color: '#2196F3',
      weight: 4,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(map.value)

    // 计算总距离
    for (let i = 1; i < points.length; i++) {
      totalDistance += points[i-1].distanceTo(points[i])
    }

    routeInfo.value = {
      distance: totalDistance,
      points: points.length
    }

    // 调整视图以显示整个路线
    map.value.fitBounds(route.value.getBounds().pad(0.1))
  }
}

// 规划路线
const planRoute = () => {
  error.value = '' // 清除之前的错误信息
  
  if (!startPoint.value.marker) {
    error.value = '请设置起点'
    return
  }
  
  if (!endPoint.value.marker) {
    error.value = '请设置终点'
    return
  }
  
  updateRoute()
}

// 清除地图
const clearMap = () => {
  if (startPoint.value.marker) map.value.removeLayer(startPoint.value.marker)
  if (endPoint.value.marker) map.value.removeLayer(endPoint.value.marker)
  waypoints.value.forEach(point => {
    if (point.marker) map.value.removeLayer(point.marker)
  })
  if (route.value) map.value.removeLayer(route.value)

  startPoint.value = { name: '', marker: null }
  endPoint.value = { name: '', marker: null }
  waypoints.value = []
  route.value = null
  routeInfo.value = null
}

// 添加搜索结果状态
const searchResults = ref({
  start: [],
  end: [],
  waypoints: {}
})

// 搜索防抖定时器
let searchDebounceTimer = null

// 搜索地点
const searchLocation = async (type, index) => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
  
  searchDebounceTimer = setTimeout(async () => {
    let searchText = ''
    
    if (type === 'start') searchText = startPoint.value.name
    else if (type === 'end') searchText = endPoint.value.name
    else if (type === 'waypoint') searchText = waypoints.value[index].name
    
    // 清除当前类型的搜索结果
    clearSearchResults(type, index)
    
    // 检查搜索文本长度
    if (!searchText || searchText.length < 2) {
      return
    }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` + 
        new URLSearchParams({
          format: 'json',
          q: searchText,
          limit: 8,
          'accept-language': 'zh-CN,en',
          addressdetails: 1,
          namedetails: 1
        })
      )
      
      const data = await response.json()
      
      // 处理搜索结果，优化显示格式
      const processedData = data.map(item => {
        let displayName = item.namedetails?.name?.zh || 
                         item.namedetails?.name || 
                         item.display_name.split(',')[0]
        
        const country = item.address?.country || 
                       item.address?.country_code?.toUpperCase() ||
                       item.display_name.split(',').pop().trim()
        
        return {
          ...item,
          display_name: `${displayName} (${country})`,
          full_address: item.display_name,
          lat: item.lat,
          lon: item.lon
        }
      })

      // 确保只在当前输入框仍然有焦点时更新结果
      if (currentFocus.value === type && 
          (type !== 'waypoint' || currentWaypointIndex.value === index)) {
        if (type === 'start') searchResults.value.start = processedData
        else if (type === 'end') searchResults.value.end = processedData
        else if (type === 'waypoint') {
          searchResults.value.waypoints = {
            ...searchResults.value.waypoints,
            [index]: processedData
          }
        }
      }
    } catch (e) {
      console.error('搜索地点错误:', e)
      error.value = '搜索地点失败，请重试'
    }
  }, 300)
}

// 清除搜索结果
const clearSearchResults = (type, index) => {
  if (type === 'start') searchResults.value.start = []
  else if (type === 'end') searchResults.value.end = []
  else if (type === 'waypoint') {
    searchResults.value.waypoints[index] = []
  }
}

// 修改选择搜索结果函数
const selectSearchResult = (type, result, index) => {
  if (!map.value || !L) {
    error.value = '地图未初始化'
    return
  }

  try {
    const latlng = L.latLng(parseFloat(result.lat), parseFloat(result.lon))
    
    if (type === 'start') {
      startPoint.value.name = result.display_name
      if (startPoint.value.marker) {
        map.value.removeLayer(startPoint.value.marker)
      }
      const marker = createMarker(latlng, 'start', null)
      if (marker) {
        marker.addTo(map.value)
        marker.bindPopup(result.full_address)
        startPoint.value.marker = marker
      }
    } else if (type === 'end') {
      endPoint.value.name = result.display_name
      if (endPoint.value.marker) {
        map.value.removeLayer(endPoint.value.marker)
      }
      const marker = createMarker(latlng, 'end', null)
      if (marker) {
        marker.addTo(map.value)
        marker.bindPopup(result.full_address)
        endPoint.value.marker = marker
      }
    } else if (type === 'waypoint') {
      waypoints.value[index].name = result.display_name
      if (waypoints.value[index].marker) {
        map.value.removeLayer(waypoints.value[index].marker)
      }
      const marker = createMarker(latlng, 'way', index)
      if (marker) {
        marker.addTo(map.value)
        marker.bindPopup(result.full_address)
        waypoints.value[index].marker = marker
      }
    }
    
    // 清除搜索结果
    clearSearchResults(type, index)
    
    // 清除当前焦点
    currentFocus.value = null
    
    // 更新路线
    updateRoute()
    
    // 将地图视图移动到选中的位置
    map.value.setView(latlng, 12)
    
    // 清除错误信息
    error.value = ''
  } catch (e) {
    console.error('设置标记点错误:', e)
    error.value = '设置标记点失败，请重试: ' + e.message
  }
}

// 添加搜索并选择位置的公共方法
const searchAndSelectLocation = async (type, searchText, index = null) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` + 
      new URLSearchParams({
        format: 'json',
        q: searchText,
        limit: 1,  // 只取第一个结果
        'accept-language': 'zh-CN,en',
        addressdetails: 1,
        namedetails: 1
      })
    )
    
    const data = await response.json()
    if (data && data.length > 0) {
      const result = {
        ...data[0],
        display_name: searchText,
        full_address: data[0].display_name
      }
      selectSearchResult(type, result, index)
    }
  } catch (e) {
    console.error('搜索地点错误:', e)
  }
}

// 添加 setLocation 方法
const setLocation = async (type, name, geocodeData, index = null) => {
  try {
    if (!map.value || !L) {
      throw new Error('地图未初始化')
    }

    const latlng = L.latLng(
      parseFloat(geocodeData.lat), 
      parseFloat(geocodeData.lon)
    )
    
    if (type === 'start') {
      startPoint.value.name = name
      if (startPoint.value.marker) {
        map.value.removeLayer(startPoint.value.marker)
      }
      const marker = createMarker(latlng, 'start', null)
      if (marker) {
        marker.addTo(map.value)
        marker.bindPopup(geocodeData.display_name)
        startPoint.value.marker = marker
      }
    } else if (type === 'end') {
      endPoint.value.name = name
      if (endPoint.value.marker) {
        map.value.removeLayer(endPoint.value.marker)
      }
      const marker = createMarker(latlng, 'end', null)
      if (marker) {
        marker.addTo(map.value)
        marker.bindPopup(geocodeData.display_name)
        endPoint.value.marker = marker
      }
    } else if (type === 'waypoint' && index !== null) {
      if (!waypoints.value[index]) {
        waypoints.value[index] = { name: '', marker: null }
      }
      waypoints.value[index].name = name
      if (waypoints.value[index].marker) {
        map.value.removeLayer(waypoints.value[index].marker)
      }
      const marker = createMarker(latlng, 'way', index)
      if (marker) {
        marker.addTo(map.value)
        marker.bindPopup(geocodeData.display_name)
        waypoints.value[index].marker = marker
      }
    }

    // 更新路线
    updateRoute()
    return true
  } catch (e) {
    console.error('设置位置失败:', e)
    error.value = `设置位置失败: ${e.message}`
    return false
  }
}

// 修改 defineExpose，添加 setLocation 方法
defineExpose({
  searchAndSelectLocation,
  planRoute,
  addWaypoint,
  setLocation
})

onMounted(() => {
  initMap()
  
  // 添加全局点击事件监听
  document.addEventListener('click', (e) => {
    const searchResults = document.querySelectorAll('.search-results')
    const inputs = document.querySelectorAll('.input-with-search input')
    
    // 检查点击是否在搜索结果框或输入框内
    let clickedInside = false
    searchResults.forEach(result => {
      if (result.contains(e.target)) {
        clickedInside = true
      }
    })
    inputs.forEach(input => {
      if (input === e.target) {
        clickedInside = true
      }
    })
    
    // 如果点击在外部，清除所有搜索结果
    if (!clickedInside) {
      searchResults.value = {
        start: [],
        end: [],
        waypoints: {}
      }
    }
  })
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
</script>

<style scoped>
.travel-map-container {
  margin: 20px 0;
  position: relative;
}

.route-panel {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 15px;
}

.waypoint-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.waypoint-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.waypoint-input:focus-within {
  background-color: #e3f2fd;
}

.waypoint-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.point-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 12px;
}

.start { background-color: #4CAF50; }
.way { background-color: #FF9800; }
.end { background-color: #F44336; }

.remove-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  padding: 0 5px;
}

.route-controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.route-controls button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: white;
}

.add-waypoint-btn {
  background-color: #FF9800;
}

.plan-route-btn {
  background-color: #2196F3;
}

.clear-btn {
  background-color: #F44336;
}

.route-info {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.waypoints-list {
  margin-top: 10px;
}

.waypoint-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.error-message {
  color: red;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
}

:deep(.custom-div-icon) {
  background: none;
  border: none;
}

:deep(.marker-pin) {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
}

:deep(.marker-pin span) {
  transform: rotate(45deg);
}

.helper-text {
  color: #666;
  font-size: 12px;
  margin-left: 10px;
  font-style: italic;
}

.input-with-search {
  position: relative;
  flex: 1;
}

.input-with-search input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-result-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  line-height: 1.4;
}

/* 添加鼠标悬停提示样式 */
.search-result-item[title] {
  position: relative;
}

.search-result-item:hover::after {
  content: attr(title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: normal;
  max-width: 200px;
  z-index: 1001;
}
</style> 