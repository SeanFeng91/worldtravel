<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TravelMap from './TravelMap.vue'

const props = defineProps({
  routes: {
    type: Array,
    default: () => []
  },
  mapId: {
    type: String,
    default: () => `map-${Math.random().toString(36).substr(2, 9)}`
  }
})

const mapRef = ref(null)
const error = ref('')
const initialized = ref(false)
const loading = ref(true)
let initializeTimer = null
let maxRetries = 20
let currentRetry = 0

// 等待地图组件初始化
const waitForMapComponent = () => {
  return new Promise((resolve, reject) => {
    const checkComponent = () => {
      if (mapRef.value && mapRef.value.setLocation) {
        console.log('地图组件已就绪')
        resolve()
        return
      }

      currentRetry++
      if (currentRetry >= maxRetries) {
        reject(new Error('地图组件加载超时'))
        return
      }

      console.log(`等待地图组件... (${currentRetry}/${maxRetries})`)
      setTimeout(checkComponent, 500)
    }

    checkComponent()
  })
}

// 预加载所有地点的地理编码信息
const preloadLocations = async () => {
  try {
    console.log('开始预加载地点信息...')
    const results = await Promise.all(props.routes.map(async point => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` + 
        new URLSearchParams({
          format: 'json',
          q: point.name,
          limit: 1,
          'accept-language': 'zh-CN,en',
          addressdetails: 1,
          namedetails: 1
        })
      )
      const data = await response.json()
      if (!data || data.length === 0) {
        console.warn(`未找到地点信息: ${point.name}`)
        return { ...point, geocodeData: null }
      }
      return { ...point, geocodeData: data[0] }
    }))
    console.log('地点信息预加载完成')
    return results
  } catch (e) {
    console.error('预加载地点信息失败:', e)
    throw e
  }
}

const initializeRoute = async () => {
  loading.value = true
  error.value = ''
  currentRetry = 0
  
  try {
    console.log('等待地图组件初始化...')
    await waitForMapComponent()
    
    console.log('开始初始化路线...')
    const geocodedLocations = await preloadLocations()
    
    // 初始化途经点数组
    const waypoints = geocodedLocations.filter(r => r.type === 'waypoint')
    if (waypoints.length > 0) {
      console.log('初始化途经点...')
      for (let i = 0; i < waypoints.length; i++) {
        await mapRef.value.addWaypoint()
      }
    }

    // 设置所有点位
    console.log('设置点位...')
    for (const point of geocodedLocations) {
      if (!point.geocodeData) {
        console.warn(`跳过无效地点: ${point.name}`)
        continue
      }

      const index = point.type === 'waypoint' 
        ? geocodedLocations.filter(r => r.type === 'waypoint').indexOf(point)
        : null

      console.log(`设置${point.type}点: ${point.name}`)
      await mapRef.value.setLocation(
        point.type,
        point.name,
        point.geocodeData,
        index
      )
    }

    console.log('规划路线...')
    await mapRef.value.planRoute()
    initialized.value = true
    
  } catch (e) {
    console.error('初始化路线错误:', e)
    error.value = e.message || '初始化路线失败，请刷新页面重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  console.log('PresetRouteMap 组件已挂载')
  if (props.routes.length > 0) {
    // 延迟初始化，确保 DOM 已完全渲染
    initializeTimer = setTimeout(() => {
      initializeRoute()
    }, 1000)
  }
})

onBeforeUnmount(() => {
  if (initializeTimer) {
    clearTimeout(initializeTimer)
  }
})
</script>

<template>
  <div class="preset-route-container" :id="`preset-route-${mapId}`">
    <div v-if="loading" class="loading-message">
      <div class="loading-spinner"></div>
      <div>正在加载地图和路线，请稍候...</div>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="initializeRoute" class="retry-btn">重试</button>
    </div>
    <div v-if="!initialized && !loading" class="loading-message">
      正在初始化地图...
    </div>
    <ClientOnly>
      <TravelMap ref="mapRef" :map-id="mapId" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.preset-route-container {
  position: relative;
}

.error-message {
  color: red;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-message {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background-color: #d32f2f;
}
</style> 