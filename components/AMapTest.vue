<template>
  <div class="map-widget" :class="{ 'map-expanded': isExpanded }">
    <button class="toggle-btn" @click="toggleMap">
      <span v-if="!isExpanded">🗺️</span>
      <span v-else>✕</span>
    </button>

    <div class="map-container" v-show="isExpanded">
      <div class="search-container">
        <div class="search-box">
          <input 
            type="text" 
            id="keyword" 
            v-model="keyword"
            placeholder="请输入关键字：(选定后搜索)"
            @focus="keyword = ''"
          />
        </div>
      </div>

      <div class="weather-container" v-if="weatherInfo">
        <div class="weather-panel">
          <div class="weather-brief">
            <span>{{ weatherInfo.city }}</span>
            <span>{{ weatherInfo.weather }} {{ weatherInfo.temperature }}℃</span>
            <span>{{ weatherInfo.windDirection }}风 {{ weatherInfo.windPower }}级</span>
          </div>
          <div class="weather-detail">
            <p>湿度：{{ weatherInfo.humidity }}%</p>
            <p class="report-time">{{ weatherInfo.reportTime }}</p>
          </div>
        </div>
      </div>

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
</style> 