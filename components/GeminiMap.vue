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
        连接状态: {{ wsStatus }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 添加 Logger 类定义
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

// 状态变量
const mapRef = ref(null)
const map = ref(null)
const markers = ref([])
const aiPrompt = ref('')
const logger = ref(null)
const wsStatus = ref('CLOSED')
const wsReconnectAttempts = ref(0)

// 常量
const MAX_RECONNECT_ATTEMPTS = 3
const RECONNECT_DELAY = 2000
let google = null
let ws = null

// 修改地图函数声明
const mapFns = [
  {
    name: "draw_map",
    description: "Draw on the map with markers, paths and custom styles",
    parameters: {
      type: "object",
      properties: {
        center: {
          type: "string",
          description: "Location to center the map. Can be lat,lng or address"
        },
        zoom: {
          type: "number",
          description: "Zoom level (1-20). 11 shows ~15km radius, 9 shows ~30km radius"
        },
        path: {
          type: "string",
          description: "Path style and points: color:0xRRGGBBAA|weight:N|point1|point2|..."
        },
        markers: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Marker style and locations: size:mid|color:red|label:A|location1|location2|..."
        },
        locations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              lat: { type: "number" },
              lng: { type: "number" },
              title: { type: "string" }
            }
          }
        }
      },
      required: ["center", "zoom"]
    }
  }
]

// 修改地图函数实现
const mapFns_impl = {
  draw_map: async (args) => {
    try {
      logger.value?.debug('收到绘制参数:', args)
      
      // 清除现有标记和路径
      markers.value.forEach(marker => marker.setMap(null))
      markers.value = []
      if (window.currentPath) {
        window.currentPath.setMap(null)
      }

      // 设置中心点和缩放级别
      if (args.center) {
        const center = String(args.center).split(',')
        if (center.length === 2) {
          map.value.setCenter({
            lat: parseFloat(center[0]),
            lng: parseFloat(center[1])
          })
        } else {
          try {
            // 使用 Places 服务替代 Geocoder
            const service = new google.maps.places.PlacesService(map.value)
            const request = {
              query: args.center,
              fields: ['geometry']
            }
            
            await new Promise((resolve, reject) => {
              service.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
                  map.value.setCenter(results[0].geometry.location)
                  resolve()
                } else {
                  reject(new Error('Place search failed: ' + status))
                }
              })
            })
          } catch (error) {
            logger.value?.warn('地点搜索失败，使用默认中心点:', error)
            // 使用默认中心点
            map.value.setCenter({ lat: 30.0000, lng: 105.0000 })
          }
        }
      }

      if (args.zoom) {
        map.value.setZoom(Number(args.zoom))
      }

      // 处理路径
      if (args.path && typeof args.path === 'string') {
        const pathParts = args.path.split('|')
        const pathOptions = {
          map: map.value,
          path: [],
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 5,
          geodesic: false
        }

        // 解析路径样式
        for (const part of pathParts) {
          if (!part) continue
          
          if (part.startsWith('color:')) {
            const color = part.split(':')[1]
            if (color.startsWith('0x')) {
              pathOptions.strokeColor = '#' + color.substring(2, 8)
              if (color.length === 10) {
                pathOptions.strokeOpacity = parseInt(color.substring(8), 16) / 255
              }
            } else {
              pathOptions.strokeColor = color
            }
          } else if (part.startsWith('weight:')) {
            pathOptions.strokeWeight = parseInt(part.split(':')[1])
          } else if (part.startsWith('geodesic:')) {
            pathOptions.geodesic = part.split(':')[1] === 'true'
          } else {
            // 解析路径点
            const point = part.split(',')
            if (point.length === 2) {
              pathOptions.path.push({
                lat: parseFloat(point[0]),
                lng: parseFloat(point[1])
              })
            }
          }
        }

        if (pathOptions.path.length > 0) {
          window.currentPath = new google.maps.Polyline(pathOptions)
        }
      }

      // 处理标记
      if (Array.isArray(args.markers)) {
        for (const markerStr of args.markers) {
          if (typeof markerStr !== 'string') continue
          
          const markerOptions = {
            map: map.value,
            size: 'mid',
            color: 'red',
            label: ''
          }

          const markerParts = markerStr.split('|')
          
          for (const part of markerParts) {
            if (!part) continue
            
            if (part.startsWith('size:')) {
              markerOptions.size = part.split(':')[1]
            } else if (part.startsWith('color:')) {
              markerOptions.color = part.split(':')[1]
            } else if (part.startsWith('label:')) {
              markerOptions.label = part.split(':')[1]
            } else {
              // 处理位置
              const point = part.split(',')
              if (point.length === 2) {
                const marker = new google.maps.marker.AdvancedMarkerElement({
                  position: {
                    lat: parseFloat(point[0]),
                    lng: parseFloat(point[1])
                  },
                  map: map.value,
                  content: new google.maps.marker.PinElement({
                    scale: markerOptions.size === 'tiny' ? 0.5 : 
                           markerOptions.size === 'small' ? 0.75 : 1,
                    background: markerOptions.color,
                    glyph: markerOptions.label
                  })
                })
                markers.value.push(marker)
              }
            }
          }
        }
      }

      // 处理普通位置标记
      if (Array.isArray(args.locations) && args.locations.length > 0) {
        const bounds = new google.maps.LatLngBounds()
        
        args.locations.forEach(loc => {
          if (!loc || typeof loc.lat !== 'number' || typeof loc.lng !== 'number') return
          
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: loc.lat, lng: loc.lng },
            map: map.value,
            title: loc.title || ''
          })
          markers.value.push(marker)
          bounds.extend(marker.position)
        })

        map.value.fitBounds(bounds)
        if (args.locations.length === 1) {
          map.value.setZoom(8)
        }
      }

      return { string_value: 'ok' }
    } catch (error) {
      logger.value?.error('绘制地图错误:', error)
      return { string_value: 'error: ' + error.message }
    }
  }
}

// 设置函数
const setup = async (ws, modality = 'TEXT', tools = []) => {
  const setup = {
    setup: {
      model: "models/gemini-2.0-flash-exp",
      tools: tools,
      generation_config: {
        response_modalities: [modality]
      }
    }
  }
  
  logger.value?.debug('发送设置:', setup)
  ws.send(JSON.stringify(setup))
  
  // 等待设置响应
  return new Promise((resolve) => {
    const handleSetupResponse = async (event) => {
      try {
        let response
        if (event.data instanceof Blob) {
          const text = await event.data.text()
          response = JSON.parse(text)
        } else {
          response = JSON.parse(event.data)
        }
        logger.value?.debug('设置响应:', response)
        ws.removeEventListener('message', handleSetupResponse)
        resolve(response)
      } catch (error) {
        logger.value?.error('设置响应解析错误:', error)
      }
    }
    ws.addEventListener('message', handleSetupResponse)
  })
}

// 发送消息
const send = async (ws, prompt) => {
  const msg = {
    client_content: {
      turns: [{ role: "user", parts: [{ text: prompt }] }],
      turn_complete: true
    }
  }
  logger.value?.debug('发送消息:', msg)
  ws.send(JSON.stringify(msg))
}

// 处理服务器内容
const handleServerContent = (serverContent) => {
  let audio = false
  const modelTurn = serverContent.modelTurn
  if (modelTurn) {
    const text = modelTurn.parts?.[0]?.text
    if (text) {
      logger.value?.info('AI 说:', text)
    }

    const inlineData = modelTurn.parts?.[0]?.inlineData
    if (inlineData) {
      const b64data = inlineData.data
      // 这里可以处理音频数据
      audio = true
    }
  }

  return [serverContent.turnComplete, audio]
}

// 处理工具调用
const handleToolCall = async (ws, toolCall) => {
  logger.value?.debug('工具调用:', toolCall)
  for (const fc of toolCall.functionCalls) {
    let result
    if (fc.name === 'draw_map') {
      result = await mapFns_impl.draw_map(fc.args)
    } else {
      result = { string_value: 'ok' }
    }

    const msg = {
      tool_response: {
        function_responses: [{
          id: fc.id,
          name: fc.name,
          response: { result }
        }]
      }
    }
    logger.value?.debug('发送工具响应:', msg)
    ws.send(JSON.stringify(msg))
  }
}

// 运行对话
const run = async (prompt, modality = 'TEXT', tools = []) => {
  return new Promise((resolve, reject) => {
    const uri = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
    
    try {
      ws = new WebSocket(uri)
      ws.addEventListener('open', async () => {
        try {
          await setup(ws, modality, tools)
          await send(ws, prompt)
        } catch (error) {
          reject(error)
        }
      })

      ws.addEventListener('message', async (event) => {
        try {
          let response
          if (event.data instanceof Blob) {
            const text = await event.data.text()
            response = JSON.parse(text)
          } else {
            response = JSON.parse(event.data)
          }
          
          logger.value?.debug('收到消息:', response)

          const serverContent = response.serverContent
          if (serverContent) {
            const [turnComplete, audio] = handleServerContent(serverContent)
            if (turnComplete) {
              resolve()
              return
            }
          }

          const toolCall = response.toolCall
          if (toolCall) {
            await handleToolCall(ws, toolCall)
          }
        } catch (error) {
          logger.value?.error('消息处理错误:', error)
        }
      })

      ws.addEventListener('error', (error) => {
        logger.value?.error('WebSocket 错误:', error)
        reject(error)
      })

      ws.addEventListener('close', () => {
        logger.value?.debug('WebSocket 已关闭')
        resolve()
      })
    } catch (error) {
      reject(error)
    }
  })
}

// AI 绘制地图
const askAIToPlotMap = async () => {
  if (!aiPrompt.value) {
    aiPrompt.value = "Plot markers on every capital city in Australia"
  }

  try {
    await run(aiPrompt.value, 'TEXT', [{ functionDeclarations: mapFns }])
  } catch (error) {
    logger.value?.error('AI 绘制地图失败:', error)
    alert('绘制地图失败: ' + error.message)
  }
}

// 初始化
onMounted(async () => {
  logger.value = new Logger('AustraliaCapitalsMap', 'DEBUG')
  
  try {
    // 加载 Google Maps 和 marker 库
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=marker,places`
      script.async = true
      script.defer = true
      script.onload = () => {
        google = window.google
        resolve()
      }
      script.onerror = reject
      document.head.appendChild(script)
    })

    // 初始化地图
    map.value = new google.maps.Map(mapRef.value, {
      center: { lat: 30.0000, lng: 105.0000 },
      zoom: 4,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID
    })

    // 初始化 WebSocket 连接
    await connectWebSocket()
  } catch (error) {
    logger.value?.error('初始化失败:', error)
  }
})

// 修改 connectWebSocket 函数
const connectWebSocket = async () => {
  if (wsStatus.value === 'CONNECTING' || wsStatus.value === 'OPEN') {
    return
  }

  wsStatus.value = 'CONNECTING'
  const uri = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`

  try {
    ws = new WebSocket(uri)
    
    ws.onopen = () => {
      wsStatus.value = 'OPEN'
      wsReconnectAttempts.value = 0
      logger.value?.debug('WebSocket 已连接')
    }

    ws.onclose = () => {
      wsStatus.value = 'CLOSED'
      if (wsReconnectAttempts.value < MAX_RECONNECT_ATTEMPTS) {
        wsReconnectAttempts.value++
        setTimeout(connectWebSocket, RECONNECT_DELAY)
      }
    }

    ws.onerror = (error) => {
      wsStatus.value = 'ERROR'
      logger.value?.error('WebSocket 错误:', error)
    }
  } catch (error) {
    wsStatus.value = 'ERROR'
    logger.value?.error('WebSocket 连接失败:', error)
  }
}

// 清理
onUnmounted(() => {
  markers.value.forEach(marker => marker.setMap(null))
  if (ws) {
    ws.close()
  }
})
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
  padding: 8px 16px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.connection-status {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
</style>