<template>
    <div class="travel-map-container">
      <!-- 控制面板 -->
      <div class="control-panel" :class="{ 'collapsed': isCollapsed }">
        <button class="toggle-button" @click="togglePanel">
          {{ isCollapsed ? '展开' : '收起' }}
        </button>
        
        <div v-if="!isCollapsed" class="panel-content">
          <h3>我的旅行足迹</h3>
          <!-- 地区选择器 -->
          <div class="region-selector">
            <div class="tabs">
              <button 
                :class="{ active: activeTab === 'china' }"
                @click="activeTab = 'china'"
              >中国省份</button>
              <button 
                :class="{ active: activeTab === 'world' }"
                @click="activeTab = 'world'"
              >国际国家</button>
            </div>
            
            <!-- 省份列表 -->
            <div v-if="activeTab === 'china'" class="region-list">
              <div v-for="province in provinces" 
                   :key="province.code" 
                   class="region-item"
                   :class="{ visited: visitedProvinces.includes(province.code) }"
                   @click="toggleRegion(province, 'province')">
                {{ province.name }}
              </div>
            </div>
            
            <!-- 国际国家列表 -->
            <div v-else-if="activeTab === 'world'" class="region-list">
              <div v-for="country in countries" 
                   :key="country.code" 
                   class="region-item"
                   :class="{ visited: visitedCountries.includes(country.code) }"
                   @click="toggleRegion(country, 'country')">
                {{ country.name }}
              </div>
            </div>
          </div>
          
          <!-- 统计信息 -->
          <div class="statistics">
            <p v-if="activeTab === 'china'">
              已去过 {{ visitedProvinces.length }}/{{ provinces.length }} 个省份
            </p>
            <p v-else>
              已去过 {{ visitedCountries.length }}/{{ countries.length }} 个国家
            </p>
          </div>
        </div>
      </div>
  
      <!-- 地图容器 -->
      <div ref="mapContainer" class="map-container"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { provinces, countries } from '../utils/regionData'
  
  const mapContainer = ref(null)
  const isCollapsed = ref(false)
  const activeTab = ref('china')
  const visitedProvinces = ref([])
  const visitedCountries = ref([])
  const isMapLoaded = ref(false)
  
  let map = null
  let dataLayer = null
  
  // 加载 Google Maps API
  const loadGoogleMapsApi = () => {
    return new Promise((resolve, reject) => {
      // 如果已经加载过，直接返回
      if (window.google && window.google.maps) {
        resolve(window.google.maps)
        return
      }

      // 创建回调函数
      window.initMap = () => {
        isMapLoaded.value = true
        if (window.google && window.google.maps) {
          resolve(window.google.maps)
        } else {
          reject(new Error('Google Maps API 加载失败'))
        }
      }

      // 检查是否已存在脚本
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        return
      }

      // 加载脚本
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&language=zh-CN&callback=initMap`
      script.async = true
      script.defer = true
      script.onerror = () => reject(new Error('Google Maps API 加载失败'))
      document.head.appendChild(script)
    })
  }
  
  // 初始化地图
  const initMap = async () => {
    try {
      const maps = await loadGoogleMapsApi()
      
      map = new maps.Map(mapContainer.value, {
        center: { lat: 35.8617, lng: 104.1954 }, // 中国中心点
        zoom: 4,
        mapTypeControl: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }]
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }]
          }
        ]
      })
  
      // 初始化数据图层
      await initDataLayer()
    } catch (error) {
      console.error('地图初始化失败:', error)
    }
  }
  
  // 初始化数据图层
  const initDataLayer = async () => {
    dataLayer = new google.maps.Data({
      map: map,
      style: feature => {
        const regionType = feature.getProperty('type')
        const regionCode = feature.getProperty('code')
        const isVisited = isRegionVisited(regionCode)
        
        return {
          fillColor: isVisited ? '#4CAF50' : '#CCCCCC',
          fillOpacity: isVisited ? 0.6 : 0.2,
          strokeWeight: 1,
          strokeColor: '#808080',
          visible: true
        }
      }
    })
  
    // 加载行政区划边界
    map.data.loadGeoJson(
      'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
      { idPropertyName: 'name' },
      features => {
        features.forEach(feature => {
          const countryName = feature.getProperty('name')
          const country = countries.find(c => c.name === countryName)
          if (country) {
            feature.setProperty('type', 'country')
            feature.setProperty('code', country.code)
          }
        })
      }
    )
  
    // 加载中国省份边界
    const chinaLayer = new google.maps.Data({
      map: map,
      style: feature => {
        const regionCode = feature.getProperty('code')
        const isVisited = isRegionVisited(regionCode)
        
        return {
          fillColor: isVisited ? '#4CAF50' : '#CCCCCC',
          fillOpacity: isVisited ? 0.6 : 0.2,
          strokeWeight: 1,
          strokeColor: '#808080',
          visible: true
        }
      }
    })
  
    // 加载中国省份数据
    // chinaLayer.loadGeoJson(
    //   'https://raw.githubusercontent.com/apache/echarts/master/map/json/china.json',
    //   { idPropertyName: 'name' },
    //   features => {
    //     features.forEach(feature => {
    //       const provinceName = feature.getProperty('name')
    //       const province = provinces.find(p => p.name === provinceName)
    //       if (province) {
    //         feature.setProperty('type', 'province')
    //         feature.setProperty('code', province.code)
    //       }
    //     })
    //   }
    // )
  
    // 添加点击事件
    map.data.addListener('click', (event) => {
      const feature = event.feature
      const regionType = feature.getProperty('type')
      const regionCode = feature.getProperty('code')
      const regionName = feature.getProperty('name')
      
      if (regionCode) {
        toggleRegion({
          code: regionCode,
          name: regionName
        }, regionType)
      }
    })
  
    chinaLayer.addListener('click', (event) => {
      const feature = event.feature
      const regionType = feature.getProperty('type')
      const regionCode = feature.getProperty('code')
      const regionName = feature.getProperty('name')
      
      if (regionCode) {
        toggleRegion({
          code: regionCode,
          name: regionName
        }, regionType)
      }
    })
  }
  
  // 判断地区是否已访问
  const isRegionVisited = (code) => {
    return visitedProvinces.value.includes(code) || 
           visitedCountries.value.includes(code)
  }
  
  // 切换地区访问状态
  const toggleRegion = (region, type = 'auto') => {
    const isProvince = type === 'province' || 
      (type === 'auto' && provinces.some(p => p.code === region.code))
    
    const targetArray = isProvince ? visitedProvinces : visitedCountries
    const index = targetArray.value.indexOf(region.code)
    
    if (index === -1) {
      targetArray.value.push(region.code)
    } else {
      targetArray.value.splice(index, 1)
    }
    
    // 更新地图样式
    if (dataLayer) {
      dataLayer.revertStyle()
      dataLayer.setStyle(feature => {
        const regionCode = feature.getProperty('code')
        const isVisited = isRegionVisited(regionCode)
        
        return {
          fillColor: isVisited ? '#4CAF50' : '#CCCCCC',
          fillOpacity: 0.7,
          strokeWeight: 1,
          strokeColor: '#808080'
        }
      })
    }
  }
  
  onMounted(() => {
    initMap()
  })
  </script>
  
  <style scoped>
  .travel-map-container {
    position: relative;
    height: 100vh;
    width: 100%;
  }
  
  .control-panel {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    z-index: 1;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .panel-content {
    padding: 15px;
    width: 300px;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 15px;
  }
  
  .tabs button {
    flex: 1;
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .tabs button.active {
    border-bottom: 2px solid #4CAF50;
  }
  
  .region-list {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .region-item {
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  
  .region-item.visited {
    background: #E8F5E9;
    color: #4CAF50;
  }
  
  .map-container {
    height: 100%;
    width: 100%;
  }
  
  .statistics {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  </style>