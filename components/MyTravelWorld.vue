<template>
  <div class="travel-container">
    <!-- 地图容器组件 -->
    <div class="travel-map-container">
      <div ref="mapContainer" class="map-container"></div>
    </div>
    
    <!-- 国家标签容器 -->
    <div class="countries-wrapper">
      <!-- 已访问的国家 -->
      <div class="tag-section">
        <h3 class="section-title">已去过的国家</h3>
        <div class="countries-container">
          <div v-for="code in visitedCountries" :key="code" class="country-tag visited">
            {{ getCountryName(code) }}
          </div>
        </div>
      </div>
      
      <!-- 近期计划 -->
      <div class="tag-section">
        <h3 class="section-title">近期计划 (一年内)</h3>
        <div class="countries-container">
          <div v-for="code in nearFutureCountries" :key="code" class="country-tag near-future">
            {{ getCountryName(code) }}
          </div>
        </div>
      </div>
      
      <!-- 远期计划 -->
      <div class="tag-section">
        <h3 class="section-title">未来想去的地方</h3>
        <div class="countries-container">
          <div v-for="code in farFutureCountries" :key="code" class="country-tag far-future">
            {{ getCountryName(code) }}
          </div>
        </div>
      </div>
      
      <!-- 添加战乱国家部分 -->
      <div class="tag-section">
        <h3 class="section-title">暂不考虑的地区</h3>
        <div class="countries-container">
          <div v-for="code in conflictCountries" :key="code" class="country-tag conflict">
            {{ getCountryName(code) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入 Vue 组合式 API
import { ref, onMounted } from 'vue'

// 地图容器的引用
const mapContainer = ref(null)
// 地图是否加载完成的状态
const isMapLoaded = ref(false)

// 定义不同类型的国家列表
const visitedCountries = [
'CN',  // 中国
  'JP',  // 日本
  'TH',  // 泰国
  'US',  // 美国
  'MY',  // 马来西亚
  'VN',  // 越南
  'ID',  // 印度尼西亚
  'NZ',  // 新西兰
  'KH',  // 柬埔寨
]

const nearFutureCountries = [
  'AM',  // 亚美尼亚
  'GE',  // 格鲁吉亚 
  'AZ',  // 阿塞拜疆
  'ZA',  // 南非
  'MA',  // 摩洛哥

]

const farFutureCountries = [
  'FR',  // 法国
  'IT',  // 意大利
  'GB',  // 英国
  'ES',  // 西班牙
]

// 添加战乱国家列表
const conflictCountries = [
  'SY',  // 叙利亚
  'SD',  // 苏丹
  'MM',  // 缅甸
  'IQ',  // 伊拉克
  'PS',  // 巴勒斯坦
  'ET',  // 埃塞俄比亚
  'ML',  // 马里
  'NE',  // 尼日尔
  'CD',  // 刚果民主共和国
  'CF',  // 中非共和国
  'NG',  // 尼日利亚(博科圣地)
  'YE',  // 也门
  'AF',  // 阿富汗
  'SS',  // 南苏丹
  'SO',  // 索马里
  'LY',  // 利比亚
//   'RU',  // 俄罗斯
  'UA',  // 乌克兰
  'IL',  // 以色列
  'LB',  // 黎巴嫩
  
]

// 定义危险国家的详细信息
const conflictCountryDetails = {
  'SY': {
    name: '叙利亚',
    risk: '极高',
    reason: '内战持续，恐怖组织活动',
    warning: '⚠️ 不建议前往，存在严重安全隐患',
    lastUpdate: '2023-12'
  },
  'MM': {
    name: '缅甸',
    risk: '高',
    reason: '军事政变，武装冲突',
    warning: '⚠️ 政局不稳定，边境地区危险',
    lastUpdate: '2023-12'
  },
  'SD': {
    name: '苏丹',
    risk: '极高',
    reason: '军事冲突，内战',
    warning: '⚠️ 严重暴力冲突，不建议前往',
    lastUpdate: '2023-12'
  },
  'IQ': {
    name: '伊拉克',
    risk: '高',
    reason: '恐怖组织活动，政局不稳',
    warning: '⚠️ 安全形势严峻，不建议前往',
    lastUpdate: '2023-12'
  },
  'PS': {
    name: '巴勒斯坦',
    risk: '极高',
    reason: '武装冲突，战争',
    warning: '⚠️ 处于战争状态，严禁前往',
    lastUpdate: '2023-12'
  },
  'IL': {
    name: '以色列',
    risk: '极高',
    reason: '武装冲突，战争',
    warning: '⚠️ 处于战争状态，不建议前往',
    lastUpdate: '2023-12'
  },
  'LB': {
    name: '黎巴嫩',
    risk: '高',
    reason: '地区局势紧张，暴力事件',
    warning: '⚠️ 局势动荡，不建议前往',
    lastUpdate: '2023-12'
  },
  'UA': {
    name: '乌克兰',
    risk: '极高',
    reason: '战争状态',
    warning: '⚠️ 处于战争状态，严禁前往',
    lastUpdate: '2023-12'
  },
  'AF': {
    name: '阿富汗',
    risk: '极高',
    reason: '恐怖组织活动，政局动荡',
    warning: '⚠️ 安全形势极其严峻，严禁前往',
    lastUpdate: '2023-12'
  },
  'YE': {
    name: '也门',
    risk: '极高',
    reason: '内战，人道主义危机',
    warning: '⚠️ 武装冲突持续，严禁前往',
    lastUpdate: '2023-12'
  },
  'SO': {
    name: '索马里',
    risk: '极高',
    reason: '恐怖组织活动，海盗威胁',
    warning: '⚠️ 安全环境恶劣，严禁前往',
    lastUpdate: '2023-12'
  },
  'ET': {
    name: '埃塞俄比亚',
    risk: '高',
    reason: '地区冲突，政治动荡',
    warning: '⚠️ 部分地区存在安全风险，谨慎前往',
    lastUpdate: '2023-12'
  },
  'ML': {
    name: '马里',
    risk: '高',
    reason: '恐怖组织活动，政变风险',
    warning: '⚠️ 安全局势不稳，不建议前往',
    lastUpdate: '2023-12'
  },
  'NE': {
    name: '尼日尔',
    risk: '高',
    reason: '政变风险，恐怖主义威胁',
    warning: '⚠️ 政局动荡，不建议前往',
    lastUpdate: '2023-12'
  },
  'CD': {
    name: '刚果民主共和国',
    risk: '高',
    reason: '武装冲突，疾病风险',
    warning: '⚠️ 安全风险高，不建议前往',
    lastUpdate: '2023-12'
  },
  'CF': {
    name: '中非共和国',
    risk: '高',
    reason: '内战，武装团体活动',
    warning: '⚠️ 局势动荡，不建议前往',
    lastUpdate: '2023-12'
  },
  'NG': {
    name: '尼日利亚',
    risk: '高',
    reason: '博科圣地等恐怖组织活动',
    warning: '⚠️ 部分地区极其危险，谨慎前往',
    lastUpdate: '2023-12'
  },
  'SS': {
    name: '南苏丹',
    risk: '极高',
    reason: '内战，人道主义危机',
    warning: '⚠️ 暴力冲突频发，严禁前往',
    lastUpdate: '2023-12'
  },
  'LY': {
    name: '利比亚',
    risk: '极高',
    reason: '内战，武装组织控制',
    warning: '⚠️ 安全形势严峻，严禁前往',
    lastUpdate: '2023-12'
  }
}

// 加载 Google Maps API
const loadGoogleMapsApi = () => {
  return new Promise((resolve, reject) => {
    // 如果 API 已加载,直接返回
    if (window.google && window.google.maps) {
      resolve(window.google.maps)
      return
    }

    window.initMap = () => {
      isMapLoaded.value = true
      if (window.google && window.google.maps) {
        resolve(window.google.maps)
      } else {
        reject(new Error('Google Maps API 加载失败'))
      }
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=marker`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  })
}

// 初始化地图
const initMap = async () => {
  try {
    // 加载 Google Maps API
    const maps = await loadGoogleMapsApi()
    
    // 创建地图实例
    const map = new maps.Map(mapContainer.value, {
      center: { lat: 35.8617, lng: 104.1954 }, // 中国中心点
      zoom: 3,
      mapTypeControl: false,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
      // 自定义地图样式
      styles: [
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#808080" }, { weight: 1.5 }]
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.fill",
          stylers: [{ 
            color: "#CCCCCC",
            visibility: "on"
          }]
        }
      ]
    })

    // 创建数据图层
    const dataLayer = new maps.Data({
      map: map
    })

    // 修改数据图层样式设置
    dataLayer.setStyle(feature => {
      let countryCode = feature.getProperty('ISO_A2') || 
                       feature.getProperty('iso_a2') ||
                       feature.getProperty('ISO2') ||
                       feature.getProperty('ADMIN')
      
      // 首先检查是否是战乱国家
      if (conflictCountries.includes(countryCode)) {
        return {
          fillColor: '#000000',  // 黑色
          fillOpacity: 0.6,
          strokeWeight: 1,
          strokeColor: '#808080'
        }
      } else if (visitedCountries.includes(countryCode)) {
        return {
          fillColor: '#4CAF50',  // 绿色
          fillOpacity: 0.6,
          strokeWeight: 1,
          strokeColor: '#808080'
        }
      } else if (nearFutureCountries.includes(countryCode)) {
        return {
          fillColor: '#FF5722',  // 深橘红
          fillOpacity: 0.6,
          strokeWeight: 1,
          strokeColor: '#808080'
        }
      } else if (farFutureCountries.includes(countryCode)) {
        return {
          fillColor: '#FFB74D',  // 浅黄色
          fillOpacity: 0.6,
          strokeWeight: 1,
          strokeColor: '#808080'
        }
      } else {
        return {
          fillColor: '#CCCCCC',  // 浅灰色
          fillOpacity: 0.2,
          strokeWeight: 1,
          strokeColor: '#808080'
        }
      }
    })

    // 加载 GeoJSON 数据
    await dataLayer.loadGeoJson(
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
    )

    // 数据加载完成后的处理
    dataLayer.forEach(feature => {
      if (feature.getProperty) {
        const countryCode = feature.getProperty('ISO_A2') || 
                           feature.getProperty('iso_a2') ||
                           feature.getProperty('ISO2')
        console.log('Loaded country:', countryCode, 
                   'Is visited:', visitedCountries.includes(countryCode))
      }
    })

    // 为危险国家添加标记和信息窗口
    conflictCountries.forEach(countryCode => {
      const countryInfo = conflictCountryDetails[countryCode]
      if (!countryInfo) return

      // 获取国家的中心点位置（需要另外添加坐标数据）
      const countryCenter = getCountryCenter(countryCode)
      
      // 创建自定义标记元素
      const markerElement = document.createElement('div')
      markerElement.innerHTML = `
        <div style="
          background: #d32f2f;
          border-radius: 50%;
          padding: 4px;
          color: white;
          box-shadow: 0 2px 2px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          font-size: 12px;
        ">⚠️</div>
      `

      // 使用新的 AdvancedMarkerElement
      const marker = new maps.marker.AdvancedMarkerElement({
        map,
        position: countryCenter,
        content: markerElement,
        title: countryInfo.name,
      })

      // 创建信息窗口
      const infoWindow = new maps.InfoWindow({
        content: `
          <div class="info-window">
            <div class="country-header">
              <h3>${countryInfo.name}</h3>
              <div class="risk-badge ${countryInfo.risk === '极高' ? 'extreme' : 'high'}">
                风险等级：${countryInfo.risk}
              </div>
            </div>
            
            <div class="info-section">
              <div class="reason-box">
                <strong>原因：</strong>${countryInfo.reason}
              </div>
              <div class="warning-box">
                ${countryInfo.warning}
              </div>
            </div>

            <div class="news-section">
              <div class="news-header">
                <span class="news-icon">🔔</span>
                <h4>${countryInfo.name}安全动态</h4>
              </div>
              <div id="news-${countryCode}" class="news-content">
                <div class="loading-spinner">加载中...</div>
              </div>
            </div>
          </div>
        `,
        maxWidth: 400
      })

      // 添加点击事件
      marker.addListener('click', () => {
        infoWindow.open(map, marker)
        // 确保在信息窗口打开后立即加载新闻
        setTimeout(() => {
          loadLatestNews(countryCode)
        }, 100)
      })
    })
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
}

// 加载最新新闻的函数
const loadLatestNews = async (countryCode) => {
  try {
    console.log('开始加载新闻:', countryCode) // 调试日志
    const countryName = countryCodeMap[countryCode]
    const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY
    
    if (!API_KEY) {
      console.error('未找到 API Key') // 调试日志
      return
    }

    // 搜索该国家的安全相关新闻（中英文）
    const searchQuery = `"${countryName}" AND (security OR safety OR conflict OR "national security" OR 安全 OR 冲突)`
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(searchQuery)}&language=zh,en`
    
    const newsElement = document.getElementById(`news-${countryCode}`)
    if (!newsElement) {
      console.error('未找到新闻元素:', `news-${countryCode}`)
      return
    }

    newsElement.innerHTML = '<div class="loading-news">正在加载最新动态...</div>'

    const response = await fetch(url)
    const data = await response.json()
    console.log('获取到的新闻数据:', data)

    if (data.results && data.results.length > 0) {
      const newsHtml = data.results.slice(0, 5).map(news => `
        <div class="news-item">
          <div class="news-content">
            <a href="${news.link}" target="_blank" rel="noopener noreferrer" class="news-title">
              ${news.title}
            </a>
            <div class="news-meta">
              <span class="news-source">${news.source_id || '未知来源'}</span>
              <span class="news-date">${new Date(news.pubDate).toLocaleDateString('zh-CN')}</span>
              <span class="news-language">${news.language === 'zh' ? '中文' : '英文'}</span>
            </div>
          </div>
        </div>
      `).join('')
      
      newsElement.innerHTML = `
        <div class="news-container">
          <div class="news-header">
            <h4>🔔 ${countryName}安全动态</h4>
            <span class="news-update-time">更新于 ${new Date().toLocaleTimeString('zh-CN')}</span>
          </div>
          <div class="news-list">
            ${newsHtml}
          </div>
        </div>
      `
    } else {
      newsElement.innerHTML = '<div class="no-news">暂无相关安全动态</div>'
    }
  } catch (error) {
    console.error('加载新闻失败:', error)
    const newsElement = document.getElementById(`news-${countryCode}`)
    if (newsElement) {
      newsElement.innerHTML = '<div class="news-error">新闻加载失败</div>'
    }
  }
}

// 组件挂载后初始化地图
onMounted(() => {
  initMap()
})

// 添加国家代码到国家名称的映射
const countryCodeMap = {
  'CN': '中国',
  'JP': '日本', 
  'TH': '泰国',
  'US': '美国',
  'MY': '马来西亚',
  'VN': '越南',
  'ID': '印度尼西亚',
  'NZ': '新西兰',
  'KH': '柬埔寨',
  'AM': '亚美尼亚',
  'GE': '格鲁吉亚',
  'AZ': '阿塞拜疆', 
  'ZA': '南非',
  'MA': '摩洛哥',
  'FR': '法国',
  'IT': '意大利',
  'GB': '英国', 
  'ES': '西班牙',
  'SY': '叙利亚',
  'SD': '苏丹',
  'MM': '缅甸',
  'IQ': '伊拉克',
  'PS': '巴勒斯坦',
  'ET': '埃塞俄比亚',
  'ML': '马里',
  'NE': '尼日尔',
  'CD': '刚果民主共和国',
  'CF': '中非共和国',
  'NG': '尼日利亚',
  'YE': '也门',
  'AF': '阿富汗',
  'SS': '南苏丹',
  'SO': '索马里',
  'LY': '利比亚',
  'UA': '乌克兰',
  'IL': '以色列',
  'LB': '黎巴嫩'
}

// 获取国家名称的方法
const getCountryName = (code) => {
  return countryCodeMap[code] || code
}

// 添加国家坐标数据
const countryCoordinates = {
  'SY': { lat: 35.0, lng: 38.0 },      // 叙利亚
  'SD': { lat: 15.5, lng: 30.5 },      // 苏丹
  'MM': { lat: 21.9162, lng: 95.9560 }, // 缅甸
  'IQ': { lat: 33.3, lng: 44.4 },      // 伊拉克
  'PS': { lat: 31.9, lng: 35.2 },      // 巴勒斯坦
  'ET': { lat: 9.145, lng: 40.489 },   // 埃塞俄比亚
  'ML': { lat: 17.57, lng: -4.0 },     // 马里
  'NE': { lat: 17.607789, lng: 8.081666 }, // 尼日尔
  'CD': { lat: -4.038333, lng: 21.758664 }, // 刚果民主共和国
  'CF': { lat: 6.6111, lng: 20.9394 }, // 中非共和国
  'NG': { lat: 9.082, lng: 8.675277 }, // 尼日利亚
  'YE': { lat: 15.552727, lng: 48.516388 }, // 也门
  'AF': { lat: 33.93911, lng: 67.709953 }, // 阿富汗
  'SS': { lat: 6.877, lng: 31.307 },   // 南苏丹
  'SO': { lat: 5.152149, lng: 46.199616 }, // 索马里
  'LY': { lat: 26.3351, lng: 17.228331 }, // 利比亚
  'UA': { lat: 48.379433, lng: 31.16558 }, // 乌克兰
  'IL': { lat: 31.046051, lng: 34.851612 }, // 以色列
  'LB': { lat: 33.854721, lng: 35.862285 }  // 黎巴嫩
}

// 获取国家中心点坐标的函数
const getCountryCenter = (countryCode) => {
  return countryCoordinates[countryCode] || { lat: 0, lng: 0 }
}
</script>

<style scoped>
/* 容器样式 */
.travel-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 原有的地图样式 */
.travel-map-container {
  position: relative;
  height: 80vh;
  width: 100%;
}

.map-container {
  height: 100%;
  width: 100%;
}

.countries-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.tag-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  font-size: 16px;
  color: #333;
  margin: 0;
  padding: 0 0 5px 0;
}

.countries-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 国家标签样式 */
.country-tag {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.country-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.visited {
  background-color: #4CAF50;  /* 绿色 */
}

.near-future {
  background-color: #FF5722;  /* 深橘红 */
}

.far-future {
  background-color: #FFB74D;  /* 浅黄色 */
}

.conflict {
  background-color: #000000;  /* 黑色 */
}

/* 信息窗口样式 */
.info-window {
  padding: 16px;
  max-width: 380px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.country-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.country-header h3 {
  margin: 0;
  font-size: 20px;
  color: #202124;
  font-weight: 600;
}

.risk-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.risk-badge.extreme {
  background-color: #d32f2f;
}

.risk-badge.high {
  background-color: #f44336;
}

.info-section {
  margin-bottom: 16px;
}

.reason-box {
  margin-bottom: 12px;
  line-height: 1.5;
  color: #3c4043;
}

.warning-box {
  background-color: #fef2f2;
  border-left: 4px solid #dc2626;
  padding: 12px;
  margin: 12px 0;
  color: #991b1b;
  font-size: 13px;
  line-height: 1.5;
}

.news-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.news-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.news-icon {
  font-size: 16px;
}

.news-header h4 {
  margin: 0;
  font-size: 14px;
  color: #1a73e8;
  flex-grow: 1;
}

.news-refresh {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #5f6368;
}

.news-content {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
}

.news-item {
  padding: 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.news-title {
  color: #202124;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 8px;
  display: block;
  text-decoration: none;
}

.news-title:hover {
  color: #1a73e8;
}

.news-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #5f6368;
}

.news-source {
  color: #1a73e8;
}

.loading-spinner {
  text-align: center;
  padding: 20px;
  color: #5f6368;
}

/* 自定义滚动条 */
.news-content::-webkit-scrollbar {
  width: 6px;
}

.news-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.news-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.news-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>