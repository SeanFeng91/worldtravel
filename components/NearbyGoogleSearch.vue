<template>
  <div class="neighborhood-discovery">
    <!-- 左侧面板,添加收回按钮 -->
    <div :class="['places-panel', { 'collapsed': isCollapsed }]">
      <header class="navbar">
        <div class="search-input">
          <input 
            ref="globalSearchInput"
            v-model="searchText" 
            placeholder="搜索地点" 
            class="place-search-input"
            @keyup.enter="searchNearby"
          />
          <button @click="searchNearby" class="place-search-button">
            <img src="https://fonts.gstatic.com/s/i/googlematerialicons/search/v11/24px.svg" alt="search"/>
          </button>
        </div>
        <button @click="togglePanel" class="toggle-button">
          {{ isCollapsed ? '展开' : '收回' }}
        </button>
      </header>

      <!-- 搜索结果列表 -->
      <div class="results" v-if="searchResults.length && !isCollapsed">
        <ul class="place-results-list">
          <li v-for="(place, index) in searchResults" 
              :key="index" 
              class="place-result" 
              @click="selectPlace(place)">
            <div class="text">
              <button class="name">{{ place.name }}</button>
              <div class="info" v-if="place.rating">
                <span>{{ place.rating }}</span>
                <img src="https://fonts.gstatic.com/s/i/googlematerialicons/star/v15/24px.svg" alt="rating" class="star-icon"/>
                <span>&nbsp;({{ place.user_ratings_total }})</span>
              </div>
              <div class="info">{{ formatPlaceType(place.types[0]) }}</div>
            </div>
            <div class="photo" v-if="place.photos && place.photos.length">
              <img :src="place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })" alt="Place photo">
            </div>
          </li>
        </ul>
        <button v-if="hasMoreResults" class="show-more-button" @click="loadMore">
          Show More
        </button>
      </div>
    </div>

    <!-- 地图容器 -->
    <div ref="mapContainer" class="map">
      <div class="map-type-control">
        <button :class="{ active: mapType === 'roadmap' }" @click="setMapType('roadmap')">地图</button>
        <button :class="{ active: mapType === 'satellite' }" @click="setMapType('satellite')">卫星图像</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mapContainer = ref(null)
const globalSearchInput = ref(null)
const searchText = ref('')
const searchResults = ref([])
const mapType = ref('roadmap')
const hasMoreResults = ref(false)
const isCollapsed = ref(false)

let map = null
let placesService = null
let markers = []

onMounted(() => {
  initMap()
})

function initMap() {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
  script.async = true
  
  script.onload = () => {
    map = new google.maps.Map(mapContainer.value, {
      center: { lat: 39.9042, lng: 116.4074 }, // 北京坐标
      zoom: 13,
      mapTypeControl: false
    })

    placesService = new google.maps.places.PlacesService(map)
    
    // 初始化搜索自动完成
    const autocomplete = new google.maps.places.Autocomplete(globalSearchInput.value, {
      fields: ['place_id', 'geometry', 'name']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry) {
        map.setCenter(place.geometry.location)
        map.setZoom(15)
        searchNearby()
      }
    })
  }

  document.head.appendChild(script)
}

function searchNearby() {
  if (!searchText.value) return
  
  // 清除之前的标记
  clearMarkers()
  
  const request = {
    location: map.getCenter(),
    radius: '5000',
    query: searchText.value
  }

  placesService.textSearch(request, (results, status, pagination) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      searchResults.value = results
      hasMoreResults.value = pagination.hasNextPage
      
      // 添加新的标记
      results.forEach(place => {
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name
        })
        markers.push(marker)
      })
      
      // 调整地图视野以显示所有标记
      const bounds = new google.maps.LatLngBounds()
      markers.forEach(marker => bounds.extend(marker.getPosition()))
      map.fitBounds(bounds)
    }
  })
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null))
  markers = []
}

function selectPlace(place) {
  map.setCenter(place.geometry.location)
  map.setZoom(16)
}

function setMapType(type) {
  mapType.value = type
  map.setMapTypeId(type)
}

function formatPlaceType(type) {
  return type.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function loadMore() {
  // 实现加载更多结果的逻辑
}

function togglePanel() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.neighborhood-discovery {
  display: flex;
  height: 100vh;
}

.places-panel {
  width: 400px;
  min-width: 300px;
  max-width: 400px;
  background: white;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: width 0.3s ease;
}

.places-panel.collapsed {
  width: 50px;
}

.navbar {
  padding: 12px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  position: relative;
  flex: 1;
}

.place-search-input {
  width: 100%;
  padding: 8px 40px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.place-search-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
}

.map {
  flex: 1;
  position: relative;
}

.map-type-control {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 1;
}

.map-type-control button {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
}

.map-type-control button.active {
  background: #e8e8e8;
}

.results {
  padding: 10px;
}

.place-results-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.place-result {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.text {
  flex: 1;
}

.name {
  font-size: 1em;
  font-weight: 500;
  text-align: left;
}

.info {
  color: #555;
  font-size: 0.9em;
}

.photo img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.show-more-button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  background: white;
  border: none;
  cursor: pointer;
}
</style>