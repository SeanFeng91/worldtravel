<template>
  <div class="map-widget" :class="{ 'map-expanded': isExpanded }">
    <button class="toggle-btn" @click="toggleMap">
      <span v-if="!isExpanded">🗺️</span>
      <span v-else>✕</span>
    </button>

    <div class="map-container" v-show="isExpanded">
      <!-- 搜索和结果面板 -->
      <div class="panel-container">
        <!-- 天气信息 -->
        <div class="weather-info" v-if="weatherInfo">
          <div class="weather-brief">
            <span class="city">{{ weatherInfo.city }}</span>
            <span class="temp">{{ weatherInfo.temperature }}℃</span>
            <span class="weather">{{ weatherInfo.weather }}</span>
          </div>
          <div class="weather-detail">
            <span>{{ weatherInfo.windDirection }}风 {{ weatherInfo.windPower }}级</span>
            <span>湿度 {{ weatherInfo.humidity }}%</span>
          </div>
          <div class="report-time">{{ weatherInfo.reportTime }}</div>
        </div>

        <div class="search-box">
          <input 
            type="text" 
            id="keyword" 
            v-model="keyword"
            placeholder="输入关键字搜索"
            @keyup.enter="handleSearch"
          />
        </div>
        <div class="result-panel scrollbar1">
          <!-- 分页器 -->
          <ul class="pagination-sm">
            <li v-if="currentPage > 1" @click="goPage(1)">首页</li>
            <li v-if="currentPage < totalPages" @click="goPage(currentPage + 1)">下一页</li>
          </ul>
          <!-- 结果列表 -->
          <ul class="poi-list">
            <li v-for="(item, index) in searchResults" 
                :key="item.id"
                class="poibox"
                :class="{ selected: selectedId === item.id }"
                @click="jumpToMarker(index)"
                @mouseenter="handlePoiHover(item, index, true)"
                @mouseleave="handlePoiHover(item, index, false)">
              <div v-if="item.photos && item.photos[0]" class="poi-imgbox">
                <span class="poi-img" :style="{ backgroundImage: `url(${item.photos[0].url})` }"></span>
              </div>
              <div class="poi-info-left">
                <h3 class="poi-title">{{ index + 1 }}. {{ item.name }}</h3>
                <div class="poi-info">
                  <p class="poi-addr">地址：{{ item.address }}</p>
                  <p v-if="item.tel" class="poi-addr">电话：{{ item.tel }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 地图容器 -->
      <div id="mapContainer" class="map"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const keyword = ref('');
const weatherInfo = ref(null);
let map = null;
let autocomplete = null;
let placeSearch = null;
let weather = null;
const isExpanded = ref(false);
const searchResults = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const selectedId = ref(null);
const markers = ref([]);

// 加载安全配置脚本
const loadSecurityScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '//g.alicdn.com/AWSC/AWSC/awsc.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 加载高德地图脚本
const loadAMapScript = () => {
  return new Promise((resolve, reject) => {
    // 删除可能存在的旧实例
    delete window.AMap;
    
    // 设置安全配置
    window._AMapSecurityConfig = {
      securityJsCode: import.meta.env.VITE_AMAP_SECRET, // 使用环境变量中的安全密钥
      serviceHost: '/_AMapService', // 代理服务路由
    }

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${import.meta.env.VITE_AMAP_KEY}`;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 查询天气
const queryWeather = async (city) => {
  return new Promise((resolve, reject) => {
    if (!weather) {
      reject(new Error('天气插件未初始化'));
      return;
    }
    
    weather.getLive(city, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

// 初始化地图和搜索
const initMap = () => {
  if (!document.getElementById('mapContainer')) {
    console.error('地图容器未找到');
    return;
  }

  // 创建地图实例
  map = new window.AMap.Map('mapContainer', {
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    center: [116.397428, 39.90923],
    zoom: 10,
    pitch: 0,
    rotation: 0,
    viewMode: '3D',
    buildingAnimation: true,
    expandZoomRange: true,
    zooms: [3, 20],
    keyboardEnable: false
  });

  console.log('地图实例创建成功:', map);

  // 加载插件
  window.AMap.plugin([
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Weather',
    'AMap.ControlBar'
  ], () => {
    // 添加 3D 控制控件
    map.addControl(new window.AMap.ControlBar({
      showZoomBar: false,
      showControlButton: true,
      position: {
        right: '10px',
        top: '80px'  // 避免与搜索框重叠
      }
    }));

    // 初始化自动完成
    const autoOptions = {
      city: '全国',
      input: 'keyword'
    };
    autocomplete = new window.AMap.Autocomplete(autoOptions);

    // 初始化地点搜索
    placeSearch = new window.AMap.PlaceSearch({
      city: '全国',
      map: map,
      pageSize: 10,
      autoFitView: true
    });

    // 初始化天气查询
    weather = new window.AMap.Weather();

    // 注册选择事件
    window.AMap.event.addListener(autocomplete, 'select', async (e) => {
      console.log('选中POI:', e.poi);
      const cityName = e.poi.adcode ? e.poi.adcode : e.poi.name;
      
      // 搜索位置
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name);

      // 查询天气
      try {
        const weatherData = await queryWeather(cityName);
        weatherInfo.value = weatherData;
        console.log('天气信息:', weatherData);
      } catch (error) {
        console.error('获取天气信息失败:', error);
      }
    });
  });
};

const toggleMap = async () => {
  isExpanded.value = !isExpanded.value;
  
  if (isExpanded.value) {
    // 等待 DOM 更新完成
    await nextTick();
    
    // 如果地图未初始化，则初始化
    if (!map) {
      try {
        initMap();
        console.log('地图初始化完成');
      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    } else {
      // 如果地图已经初始化，刷新一下大小
      map.resize();
    }
  }
};

onMounted(async () => {
  try {
    // 先加载脚本，但不初始化地图
    await loadSecurityScript();
    await loadAMapScript();
    console.log('地图脚本加载完成');
  } catch (error) {
    console.error('加载地图脚本失败:', error);
  }
});

// 处理搜索
const handleSearch = () => {
  if (!keyword.value) return;
  currentPage.value = 1;
  goPage(1);
};

// 跳转到指定页
const goPage = (page) => {
  if (!placeSearch) return;
  
  placeSearch.setPageIndex(page);
  placeSearch.search(keyword.value, async (status, result) => {
    if (status === 'complete') {
      searchResults.value = result.poiList.pois;
      totalPages.value = Math.ceil(result.poiList.count / result.poiList.pageSize);
      currentPage.value = page;
      
      // 更新地图标记
      updateMarkers(result.poiList.pois);

      // 查询第一个地点的天气
      if (result.poiList.pois.length > 0) {
        const firstPoi = result.poiList.pois[0];
        try {
          const weatherData = await queryWeather(firstPoi.cityname || firstPoi.adname);
          weatherInfo.value = weatherData;
        } catch (error) {
          console.error('获取天气信息失败:', error);
        }
      }
    }
  });
};

// 更新地图标记
const updateMarkers = (pois) => {
  // 清除旧标记
  markers.value.forEach(marker => marker.remove());
  markers.value = [];
  
  // 添加新标记
  pois.forEach((poi, index) => {
    const marker = new window.AMap.SimpleMarker({
      map: map,
      position: poi.location,
      iconTheme: 'numv1',
      iconStyle: `red-${index + 1}`,
      containerClassNames: 'my-marker'
    });
    
    markers.value.push(marker);
  });
  
  // 调整视野
  map.setFitView(markers.value);
};

// 选择 POI
const selectPoi = (poi, index) => {
  selectedId.value = poi.id;
  
  // 更新标记样式
  markers.value[index].setIconStyle(`blue-${index + 1}`);
  
  // 获取标记位置
  const position = poi.location;
  
  // 平滑移动到标记位置
  map.value.setZoomAndCenter(15, position, true, {
    duration: 800,
    easing: 'easeInOutCubic'
  });
  
  // 打开信息窗体
  const infoWindow = new window.AMap.SimpleInfoWindow({
    offset: new window.AMap.Pixel(0, -32),
    infoTitle: poi.name,
    infoBody: poi.address
  });
  
  infoWindow.open(map.value, position);
};

// 处理悬停效果
const handlePoiHover = (poi, index, isEnter) => {
  if (selectedId.value === poi.id) return;
  
  const marker = markers.value[index];
  if (marker) {
    marker.setIconStyle(isEnter ? `blue-${index + 1}` : `red-${index + 1}`);
    
    // 悬停时也显示信息窗体
    if (isEnter) {
      const infoWindow = new window.AMap.SimpleInfoWindow({
        offset: new window.AMap.Pixel(0, -32),
        infoTitle: poi.name,
        infoBody: poi.address
      });
      infoWindow.open(map.value, poi.location);
    }
  }
};

// 添加跳转到指定标记的方法
const jumpToMarker = async (index) => {
  if (!map.value || !markers.value[index]) return;
  
  const marker = markers.value[index];
  const position = marker.getPosition();
  const poi = searchResults.value[index];
  
  // 平滑移动到标记位置
  map.value.setZoomAndCenter(15, position, true, {
    duration: 800,
    easing: 'easeInOutCubic'
  });
  
  // 触发标记的点击事件
  marker.emit('click');

  // 查询天气
  try {
    const weatherData = await queryWeather(poi.cityname || poi.adname);
    weatherInfo.value = weatherData;
  } catch (error) {
    console.error('获取天气信息失败:', error);
  }
};
</script>

<style scoped>
.map-widget {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.map-expanded {
  right: 20px;
  bottom: 80px;
  width: 80vw;
  height: 80vh;
  max-width: 1000px;
  max-height: 800px;
}

.toggle-btn {
  position: absolute;
  right: 0;
  bottom: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  transition: all 0.3s ease;
  opacity: 1;
}

.toggle-btn:hover {
  transform: scale(1.1);
  background: #1a4b8c;
  opacity: 1;
}

.map-container {
  position: absolute;
  right: 0;
  bottom: 50px;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;  /* 改为纵向布局 */
}

.search-container {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
  width: 300px;
}

.search-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-box input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.search-box input:focus {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.1);
}

.weather-container {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 100;
}

.weather-panel {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 12px;
  border-radius: 4px;
  min-width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.weather-brief {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.weather-detail {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.map {
  flex: 1;
  width: 100%;
  min-height: 0;  /* 防止溢出 */
}

/* 暗色主题适配 */
:deep(.dark) .search-box,
:deep(.dark) .weather-panel {
  background: rgba(30, 30, 30, 0.9);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-container {
    top: 12px;
    right: 12px;
    left: 12px;
    width: auto;
  }

  .weather-container {
    top: auto;
    bottom: 12px;
    left: 12px;
    right: 12px;
  }

  .weather-panel {
    width: 100%;
  }

  .weather-brief {
    justify-content: space-between;
  }
}

.panel-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

.search-box {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.search-box input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.result-panel {
  flex: 1;
  overflow-y: auto;
}

.pagination-sm {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  list-style: none;
  margin: 0;
}

.pagination-sm li {
  padding: 4px 12px;
  margin: 0 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-sm li:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.poi-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.poibox {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
}

.poibox:hover,
.poibox.selected {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.poi-imgbox {
  float: left;
  margin-right: 10px;
}

.poi-img {
  display: block;
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}

.poi-info-left {
  overflow: hidden;
}

.poi-title {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.poi-addr {
  margin: 4px 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

/* 暗色主题适配 */
:deep(.dark) .panel-container {
  background: rgba(30, 30, 30, 0.95);
}

:deep(.dark) .search-box,
:deep(.dark) .pagination-sm,
:deep(.dark) .poibox {
  border-color: var(--vp-c-divider);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .panel-container {
    width: 100%;
    height: 50%;
    bottom: 0;
    top: auto;
  }
}

/* 添加标记动画样式 */
.amap-marker-bounce {
  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 添加平滑过渡效果 */
.poibox {
  /* ... 其他样式保持不变 ... */
  transition: all 0.3s ease;
}

.poibox.selected {
  /* ... 其他样式保持不变 ... */
  transform: translateX(5px);
  border-left: 3px solid var(--vp-c-brand);
}

.weather-info {
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.weather-brief {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.city {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.temp {
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-brand);
}

.weather {
  color: var(--vp-c-text-2);
}

.weather-detail {
  display: flex;
  gap: 16px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.report-time {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* 暗色主题适配 */
:deep(.dark) .weather-info {
  background: rgba(30, 30, 30, 0.9);
  border-color: var(--vp-c-divider);
}
</style> 