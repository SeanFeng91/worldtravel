<template>
    <div class="route-planner">
      <div class="input-section">
        <div class="autocomplete-wrapper">
          <input 
            ref="autocompleteInput"
            type="text"
            v-model="newLocation" 
            placeholder="输入目的地" 
            class="location-input"
            @keyup.enter="addLocation"
          />
        </div>
        <button 
          @click="addLocation"
          class="add-btn"
        >
          添加地点
        </button>
      </div>
  
      <div ref="mapContainer" class="map-container"></div>
  
      <div class="locations-list">
        <div 
          v-for="(location, index) in locations" 
          :key="index"
          class="location-item"
          draggable="true"
          @dragstart="dragStart(index)"
          @dragover.prevent
          @drop="drop($event, index)"
        >
          <span class="drag-handle">⋮⋮</span>
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
  const autocompleteInput = ref(null)
  const locations = ref([])
  const newLocation = ref('')
  const routeInfo = ref(null)
  let map = null
  let directionsService = null
  let directionsRenderer = null
  let autocomplete = null
  let draggedItemIndex = null
  
  onMounted(() => {
    initMap()
  })
  
  function dragStart(index) {
    draggedItemIndex = index
  }
  
  function drop(event, index) {
    event.preventDefault()
    if (draggedItemIndex === index) return
    
    const items = [...locations.value]
    const draggedItem = items[draggedItemIndex]
    items.splice(draggedItemIndex, 1)
    items.splice(index, 0, draggedItem)
    locations.value = items
    
    updateRoute()
  }
  
  function initMap() {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&language=zh-CN`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      map = new google.maps.Map(mapContainer.value, {
        center: { lat: 35.86166, lng: 104.195397 },
        zoom: 4
      })
      
      directionsService = new google.maps.DirectionsService()
      directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(map)

      initAutocomplete()
    }
    
    document.head.appendChild(script)
  }
  
  function initAutocomplete() {
    if (!google || !autocompleteInput.value) return

    autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value, {
      types: ['geocode'],
    //   componentRestrictions: { country: 'cn' },
      fields: ['formatted_address', 'geometry', 'name']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry) {
        console.error('未找到该地点的详细信息')
        return
      }

      newLocation.value = place.formatted_address || place.name

      map.setCenter(place.geometry.location)
      map.setZoom(12)
    })
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
  
  .autocomplete-wrapper {
    flex: 1;
    position: relative;
  }
  
  .location-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
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
    cursor: move;
  }
  
  .drag-handle {
    cursor: move;
    padding: 0 10px;
    color: #666;
    user-select: none;
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
  
  .location-item:active {
    opacity: 0.7;
  }
  
  .location-item.dragging {
    opacity: 0.5;
    background-color: #e0e0e0;
  }
  
  .pac-container {
    border-radius: 4px;
    margin-top: 2px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .pac-item {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .pac-item:hover {
    background-color: #f5f5f5;
  }
  </style>