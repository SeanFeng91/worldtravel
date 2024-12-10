<template>
    <div class="route-planner">
      <div class="input-section">
        <input 
          v-model="newLocation" 
          placeholder="输入目的地" 
          @keyup.enter="addLocation"
          class="location-input"
        />
        <button 
          @click="addLocation"
          class="add-btn"
        >
          添加地点
        </button>
      </div>
  
      <!-- 地图容器 -->
      <div 
        ref="mapContainer" 
        class="map-container"
      ></div>
  
      <div class="locations-list">
        <div 
          v-for="(location, index) in locations" 
          :key="index" 
          class="location-item"
        >
          <span>{{ location.name }}</span>
          <button 
            @click="removeLocation(index)"
            class="remove-btn"
          >
            删除
          </button>
        </div>
      </div>
  
      <div v-if="routeInfo" class="route-info">
        <h3>路线信息</h3>
        <p>总距离: {{ routeInfo.distance }}km</p>
        <p>预计时间: {{ routeInfo.duration }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { calculateRoute, geocodeAddress } from '../utils/googleMaps'
  
  const mapContainer = ref(null)
  const locations = ref([])
  const newLocation = ref('')
  const routeInfo = ref(null)
  let map = null
  let directionsService = null
  let directionsRenderer = null
  
  onMounted(() => {
    initMap()
  })
  
  function initMap() {
    // 加载 Google Maps JavaScript API
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      map = new google.maps.Map(mapContainer.value, {
        center: { lat: 35.86166, lng: 104.195397 }, // 中国中心位置
        zoom: 4
      })
      
      directionsService = new google.maps.DirectionsService()
      directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(map)
    }
    
    document.head.appendChild(script)
  }
  
  async function addLocation() {
    if (!newLocation.value) return
    
    try {
      const location = await geocodeAddress(newLocation.value)
      locations.value.push({
        name: newLocation.value,
        position: location
      })
      newLocation.value = ''
      
      if (locations.value.length >= 2) {
        await updateRoute()
      }
    } catch (error) {
      console.error('添加地点失败:', error)
    }
  }
  
  function removeLocation(index) {
    locations.value.splice(index, 1)
    if (locations.value.length >= 2) {
      updateRoute()
    } else {
      routeInfo.value = null
      if (directionsRenderer) {
        directionsRenderer.setDirections({ routes: [] })
      }
    }
  }
  
  async function updateRoute() {
    if (locations.value.length < 2 || !directionsService) return
    
    const request = {
      origin: locations.value[0].position,
      destination: locations.value[locations.value.length - 1].position,
      waypoints: locations.value.slice(1, -1).map(loc => ({
        location: new google.maps.LatLng(loc.position.lat, loc.position.lng),
        stopover: true
      })),
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    }
  
    try {
      const result = await new Promise((resolve, reject) => {
        directionsService.route(request, (result, status) => {
          if (status === 'OK') resolve(result)
          else reject(status)
        })
      })
  
      directionsRenderer.setDirections(result)
      
      // 更新路线信息
      const route = result.routes[0]
      let totalDistance = 0
      let totalDuration = 0
      
      route.legs.forEach(leg => {
        totalDistance += leg.distance.value
        totalDuration += leg.duration.value
      })
  
      routeInfo.value = {
        distance: (totalDistance / 1000).toFixed(1),
        duration: formatDuration(totalDuration)
      }
    } catch (error) {
      console.error('路线更新失败:', error)
    }
  }
  
  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`
    }
    return `${minutes}分钟`
  }
  </script>
  
  <style scoped>
  .route-planner {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .input-section {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  
  .location-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .add-btn {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .map-container {
    width: 100%;
    height: 500px;
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .locations-list {
    margin-top: 20px;
  }
  
  .location-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    margin-bottom: 8px;
    border-radius: 4px;
  }
  
  .remove-btn {
    padding: 4px 8px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .route-info {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .route-info h3 {
    margin-top: 0;
    color: #333;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>