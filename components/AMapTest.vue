<template>
  <div class="amap-container">
    <div id="mapContainer" class="map"></div>
    <div class="control-panel">
      <div class="search-box">
        <input 
          type="text" 
          id="keyword" 
          v-model="keyword"
          placeholder="请输入关键字：(选定后搜索)"
          @focus="keyword = ''"
        />
      </div>
      <div class="view-controls">
        <button @click="toggleViewMode">
          {{ is3D ? '2D' : '3D' }}视图
        </button>
        <button @click="resetView">
          重置视角
        </button>
      </div>
    </div>
    <div class="weather-panel" v-if="weatherInfo">
      <h3>{{ weatherInfo.city }}天气</h3>
      <div class="weather-info">
        <p>天气：{{ weatherInfo.weather }}</p>
        <p>温度：{{ weatherInfo.temperature }}℃</p>
        <p>湿度：{{ weatherInfo.humidity }}%</p>
        <p>风向：{{ weatherInfo.windDirection }}</p>
        <p>风力：{{ weatherInfo.windPower }}级</p>
        <p class="report-time">发布时间：{{ weatherInfo.reportTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const keyword = ref('');
const weatherInfo = ref(null);
let map = null;
let autocomplete = null;
let placeSearch = null;
let weather = null;
const is3D = ref(true);

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
  // 创建地图实例
  map = new window.AMap.Map('mapContainer', {
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    center: [116.397428, 39.90923],
    zoom: 17,
    pitch: 45,  // 初始俯仰角度调整为45度
    rotation: -15,
    viewMode: '3D',
    buildingAnimation: true,
    expandZoomRange: true,
    zooms: [3, 20],
    keyboardEnable: false
  });

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

// 切换 2D/3D 视图
const toggleViewMode = () => {
  if (!map) return;
  is3D.value = !is3D.value;
  
  if (is3D.value) {
    // 切换到3D视图
    map.setViewMode('3D');
    map.setPitch(45);  // 调整俯仰角度为45度
    map.setRotation(-15);  // 添加一点旋转
    map.setZoom(17);  // 调整缩放级别
  } else {
    // 切换到2D视图
    map.setViewMode('2D');
    map.setPitch(0);  // 俯仰角度设为0
    map.setRotation(0);  // 取消旋转
    map.setZoom(13);  // 调整缩放级别
  }
};

// 重置视角
const resetView = () => {
  if (!map) return;
  
  // 根据当前模式重置视角
  if (is3D.value) {
    map.setViewMode('3D');
    map.setPitch(45);
    map.setRotation(-15);
    map.setZoom(17);
  } else {
    map.setViewMode('2D');
    map.setPitch(0);
    map.setRotation(0);
    map.setZoom(13);
  }

  // 如果有当前搜索的位置，则居中到该位置
  if (placeSearch && placeSearch.getResults()) {
    const results = placeSearch.getResults();
    if (results.poiList && results.poiList.pois && results.poiList.pois.length > 0) {
      const firstPoi = results.poiList.pois[0];
      map.setCenter([firstPoi.location.lng, firstPoi.location.lat]);
    }
  } else {
    // 否则重置到默认中心点
    map.setCenter([116.397428, 39.90923]);
  }
};

onMounted(async () => {
  try {
    // 先加载安全脚本
    await loadSecurityScript();
    // 再加载地图脚本
    await loadAMapScript();
    // 最后初始化地图
    initMap();
  } catch (error) {
    console.error('初始化高德地图失败:', error);
  }
});
</script>

<style scoped>
.amap-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.control-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}

.search-box {
  background-color: #ddf;
  color: #333;
  border: 1px solid silver;
  box-shadow: 3px 4px 3px 0px silver;
  border-radius: 5px;
  overflow: hidden;
  line-height: 20px;
  padding: 5px;
}

.search-box input {
  height: 25px;
  border: 0;
  padding-left: 5px;
  width: 280px;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
}

/* 搜索结果样式 */
:deep(.amap-sug-result) {
  z-index: 9999;
}

.weather-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  max-width: 300px;
  z-index: 90;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

/* 添加响应式布局 */
@media (max-width: 768px) {
  .weather-panel {
    top: auto;
    bottom: 10px;
    left: 10px;
    right: 10px;
    max-width: none;
  }
  
  .search-box input {
    width: 200px;
  }
  
  .weather-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 5px;
  }
}

/* 优化天气面板样式 */
.weather-panel h3 {
  margin: 0 0 10px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weather-info p {
  margin: 5px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-time {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 10px !important;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 5px;
}

/* 暗色主题优化 */
:deep(.dark) .weather-panel {
  background-color: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(12px);
}

.view-controls {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.view-controls button {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
}

.view-controls button:hover {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* 暗色主题适配 */
:deep(.dark) .view-controls button {
  background-color: rgba(30, 30, 30, 0.9);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

:deep(.dark) .view-controls button:hover {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* 调整控件位置 */
:deep(.amap-controlbar) {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style> 