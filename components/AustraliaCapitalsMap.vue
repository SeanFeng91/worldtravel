<template>
  <div class="map-container">
    <div ref="mapRef" class="map"></div>
    <div class="controls">
      <button 
        @click="askAIToPlotMap"
        :disabled="wsStatus !== 'OPEN'"
      >
        {{ wsStatus === 'OPEN' ? '让 AI 绘制地图' : '正在连接...' }}
      </button>
      <textarea v-model="aiPrompt" placeholder="输入你的地图绘制需求"></textarea>
      <div class="connection-status">
        <div>连接状态: {{ wsStatus }}</div>
        <div>重连次数: {{ wsReconnectAttempts }}/{{ MAX_RECONNECT_ATTEMPTS }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const mapRef = ref(null)
const map = ref(null)
const markers = ref([])
const aiPrompt = ref('')
const logger = ref(null)
const wsStatus = ref('CLOSED')
const wsReconnectAttempts = ref(0)
const MAX_RECONNECT_ATTEMPTS = 3
const RECONNECT_DELAY = 2000

let google = null
let ws = null

// 日志工具
class Logger {
  constructor(name, level = 'INFO') {
    this.name = name
    this.level = level
    this.levels = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3
    }
  }

  setLevel(level) {
    this.level = level
  }

  debug(...args) {
    if (this.levels[this.level] <= this.levels.DEBUG) {
      console.debug(`[${this.name}] DEBUG:`, ...args)
    }
  }

  info(...args) {
    if (this.levels[this.level] <= this.levels.INFO) {
      console.info(`[${this.name}] INFO:`, ...args)
    }
  }

  warn(...args) {
    if (this.levels[this.level] <= this.levels.WARN) {
      console.warn(`[${this.name}] WARN:`, ...args)
    }
  }

  error(...args) {
    if (this.levels[this.level] <= this.levels.ERROR) {
      console.error(`[${this.name}] ERROR:`, ...args)
    }
  }
}

// 地图函数声明
const mapFns = [{
  name: 'draw_map',
  description: 'Render a Google Maps static map using the specified parameters.',
  parameters: {
    type: 'object',
    properties: {
      center: {
        type: 'string',
        description: 'Location to center the map.'
      },
      zoom: {
        type: 'number',
        description: 'Google Maps zoom level (1-20).'
      },
      path: {
        type: 'string',
        description: 'Path overlay on the map.'
      },
      markers: {
        type: 'array',
        items: { type: 'string' },
        description: 'Markers to place on the map.'
      }
    },
    required: ['center', 'zoom']
  }
}]

// 地图函数实现
const mapFns_impl = {
  draw_map: async ({ center, zoom, path = "", markers: markerList = [] }) => {
    try {
      // 清除现有标记
      markers.value.forEach(marker => marker.setMap(null))
      markers.value = []

      // 设置地图中心和缩放级别
      if (center) {
        const geocoder = new google.maps.Geocoder()
        try {
          const result = await geocoder.geocode({ address: center })
          if (result.results[0]) {
            map.value.setCenter(result.results[0].geometry.location)
          }
        } catch (error) {
          logger.value.debug('地理编码失败:', error)
          if (center.includes(',')) {
            const [lat, lng] = center.split(',').map(Number)
            if (!isNaN(lat) && !isNaN(lng)) {
              map.value.setCenter({ lat, lng })
            }
          }
        }
      }
      
      if (zoom) {
        map.value.setZoom(Number(zoom))
      }

      // 处理标记
      if (Array.isArray(markerList)) {
        for (const markerStr of markerList) {
          const parts = markerStr.split('|')
          const style = parts[0]
          const locations = parts.slice(1)

          for (const location of locations) {
            const geocoder = new google.maps.Geocoder()
            try {
              const result = await geocoder.geocode({ address: location })
              if (result.results[0]) {
                const marker = new google.maps.Marker({
                  position: result.results[0].geometry.location,
                  map: map.value,
                  title: location,
                  ...parseMarkerStyle(style)
                })
                markers.value.push(marker)
              }
            } catch (error) {
              logger.value.debug(`无法解析位置 ${location}:`, error)
            }
          }
        }
      }

      return { string_value: 'ok' }
    } catch (error) {
      logger.value.debug('绘制地图失败:', error)
      return { string_value: 'error' }
    }
  }
}

// WebSocket 连接管理
const connectWebSocket = async () => {
  if (wsStatus.value === 'CONNECTING' || wsStatus.value === 'OPEN') {
    logger.value.debug('WebSocket 已经在连接中或已连接')
    return
  }

  // 使用正确的 URI 和模型
  const uri = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
  const model = "models/gemini-2.0-flash-exp"
  
  logger.value.debug('尝试连接到:', uri)

  try {
    wsStatus.value = 'CONNECTING'
    ws = new WebSocket(uri)
    
    ws.onopen = async () => {
      wsStatus.value = 'OPEN'
      wsReconnectAttempts.value = 0
      logger.value.debug('WebSocket 已连接')
      
      // 发送正确的设置消息
      const setup = {
        setup: {
          model: model,
          tools: [{ functionDeclarations: mapFns }],
          generation_config: {
            response_modalities: ["TEXT"]
          }
        }
      }

      logger.value.debug('发送设置消息:', setup)
      ws.send(JSON.stringify(setup))
    }

    ws.onmessage = async (event) => {
      try {
        // 检查消息是否是 Blob 类型
        if (event.data instanceof Blob) {
          const text = await event.data.text()
          const response = JSON.parse(text)
          logger.value.debug('收到 Blob 消息:', response)
        } else {
          const response = JSON.parse(event.data)
          logger.value.debug('收到消息:', response)
        }

        const serverContent = response.serverContent
        const toolCall = response.toolCall

        if (serverContent) {
          const modelTurn = serverContent.modelTurn
          if (modelTurn?.parts?.[0]?.text) {
            logger.value.info('AI 说:', modelTurn.parts[0].text)
          }
        }

        if (toolCall) {
          await handleToolCall(toolCall)
        }
      } catch (error) {
        logger.value.error('消息处理错误:', error)
      }
    }

    ws.onerror = (error) => {
      logger.value.error('WebSocket 错误:', error)
      wsStatus.value = 'ERROR'
    }

    ws.onclose = (event) => {
      logger.value.debug('WebSocket 已关闭:', event.code, event.reason)
      wsStatus.value = 'CLOSED'
      
      if (wsReconnectAttempts.value < MAX_RECONNECT_ATTEMPTS) {
        wsReconnectAttempts.value++
        logger.value.info(`尝试重连 (${wsReconnectAttempts.value}/${MAX_RECONNECT_ATTEMPTS})...`)
        setTimeout(connectWebSocket, RECONNECT_DELAY)
      }
    }
  } catch (error) {
    logger.value.error('WebSocket 连接失败:', error)
    wsStatus.value = 'ERROR'
  }
}

// 处理工具调用
const handleToolCall = async (toolCall) => {
  for (const fc of toolCall.functionCalls) {
    if (fc.name === 'draw_map') {
      const result = await mapFns_impl.draw_map(fc.args)
      const response = {
        tool_response: {
          function_responses: [{
            id: fc.id,
            name: fc.name,
            response: { result }
          }]
        }
      }
      ws.send(JSON.stringify(response))
    }
  }
}

// 发送消息
const sendMessage = async (prompt) => {
  if (!ws || wsStatus.value !== 'OPEN') {
    logger.value.debug('WebSocket 未连接，尝试重新连接...')
    await connectWebSocket()
    
    // 等待连接建立，最多等待 5 秒
    let attempts = 0
    while (wsStatus.value !== 'OPEN' && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    if (wsStatus.value !== 'OPEN') {
      throw new Error('无法建立 WebSocket 连接')
    }
  }

  const message = {
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }]
  }

  logger.value.debug('发送消息:', message)
  ws.send(JSON.stringify(message))
}

// 让 AI 绘制���图
const askAIToPlotMap = async () => {
  if (!aiPrompt.value) {
    aiPrompt.value = "Plot markers on every capital city in Australia"
  }

  logger.value.info('发送提示:', aiPrompt.value)
  await sendMessage(aiPrompt.value)
}

// 初始化
onMounted(async () => {
  logger.value = new Logger('AustraliaCapitalsMap', 'DEBUG')
  
  // 初始化地图
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly'
  })

  try {
    google = await loader.load()
    map.value = new google.maps.Map(mapRef.value, {
      center: { lat: -25.2744, lng: 133.7751 },
      zoom: 4
    })
  } catch (error) {
    logger.value.debug('地图加载失败:', error)
  }

  // 建立 WebSocket 连接
  await connectWebSocket()
})

onUnmounted(() => {
  markers.value.forEach(marker => marker.setMap(null))
  if (ws && wsStatus.value === 'OPEN') {
    ws.close()
  }
  wsStatus.value = 'CLOSED'
})

// 解析标记样式
const parseMarkerStyle = (style) => {
  const options = {
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: '#FF6B00',
      fillOpacity: 1,
      strokeWeight: 0
    }
  }
  
  if (style) {
    const parts = style.split(':')
    if (parts[0] === 'color') {
      options.icon.fillColor = `#${parts[1].replace('0x', '')}`
    }
    if (parts[0] === 'label') {
      delete options.icon
      options.label = parts[1] || 'A'
    }
  }
  
  return options
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

textarea {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #357abd;
}
</style>