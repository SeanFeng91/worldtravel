<template>
  <div class="container">
    <div class="map-container">
      <div ref="mapRef" class="map"></div>
    </div>
    <div class="control-panel">
      <div class="chat-history" ref="chatHistoryRef">
        <div v-for="(message, index) in chatHistory" :key="index" 
             :class="['message', message.role]">
          <div v-if="message.role === 'assistant'" 
               v-html="marked.parse(message.content)">
          </div>
          <div v-else>
            {{ message.content }}
          </div>
        </div>
      </div>
      <div class="input-group">
        <textarea 
          v-model="aiPrompt" 
          placeholder="输入你的地图绘制需求"
          class="prompt-input"
          @keydown.enter.prevent="handleEnterKey"
        ></textarea>
        <div class="buttons">
          <button 
            @click="askAIToPlotMap"
            :disabled="wsStatus !== 'OPEN'"
            class="submit-button"
          >
            {{ wsStatus === 'OPEN' ? '发送' : '正在连接...' }}
          </button>
          <button 
            @click="startNewMap"
            class="new-map-button"
          >
            新地图
          </button>
        </div>
      </div>
      <div class="connection-status">
        连接状态: {{ wsStatus }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { marked } from 'marked'

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

// 添加聊天历史记录状态
const chatHistory = ref([])

// 添加聊天历史的引用
const chatHistoryRef = ref(null)

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
        logger.value?.debug('开始处理标记数组:', args.markers)
        for (const markerStr of args.markers) {
          if (typeof markerStr !== 'string') continue
          
          const markerOptions = {
            map: map.value,
            size: 'mid',
            color: 'red',
            label: ''
          }

          const markerParts = markerStr.split('|')
          let position = null
          
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
                position = {
                  lat: parseFloat(point[0]),
                  lng: parseFloat(point[1])
                }
              }
            }
          }

          if (position) {
            try {
              const marker = new google.maps.Marker({
                position: position,
                map: map.value,
                title: markerOptions.label,
                label: {
                  text: markerOptions.label,
                  color: '#000000',  // 黑色文字
                  fontSize: '14px',
                  fontWeight: 'bold'
                },
                // 使用 Symbol 配置来添加描边效果
                icon: {
                  url: `http://maps.google.com/mapfiles/ms/icons/${markerOptions.color}-dot.png`,
                  labelOrigin: new google.maps.Point(16, -10),
                  scaledSize: new google.maps.Size(
                    markerOptions.size === 'tiny' ? 24 :
                    markerOptions.size === 'small' ? 32 :
                    markerOptions.size === 'large' ? 48 : 
                    40,
                    markerOptions.size === 'tiny' ? 24 :
                    markerOptions.size === 'small' ? 32 :
                    markerOptions.size === 'large' ? 48 : 
                    40
                  )
                }
              });
              markers.value.push(marker);
            } catch (error) {
              logger.value?.error('创建标记失败:', error);
            }
          }
        }
      }

      // 处理普通位置标记
      if (Array.isArray(args.locations) && args.locations.length > 0) {
        logger.value?.debug('开始处理位置数组:', args.locations)
        const bounds = new google.maps.LatLngBounds()
        
        for (const loc of args.locations) {
          if (!loc || typeof loc.lat !== 'number' || typeof loc.lng !== 'number') continue
          
          try {
            const marker = new google.maps.Marker({
              position: { lat: loc.lat, lng: loc.lng },
              map: map.value,
              title: loc.title || '',
              label: {
                text: loc.title || '',
                color: '#000000',  // 黑色文字
                fontSize: '14px',
                fontWeight: 'bold'
              },
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',  // 使用蓝色图标
                scaledSize: new google.maps.Size(40, 40),  // 固定大小
                labelOrigin: new google.maps.Point(16, -10)  // 调整标签位置
              }
            });

            markers.value.push(marker);
            bounds.extend(marker.position);
          } catch (error) {
            logger.value?.error('创建位置标记失败:', error);
          }
        }

        if (markers.value.length > 0) {
          map.value.fitBounds(bounds);
          if (args.locations.length === 1) {
            map.value.setZoom(8);
          }
        }
      }

      // 在返回之前添加最终状态日志
      logger.value?.debug('标记数组最终状态:', markers.value)
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
  // 构建完整的对话历史
  const turns = chatHistory.value.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }))
  
  // 添加当前用户的新消息
  turns.push({
    role: 'user',
    parts: [{ text: prompt }]
  })

  const msg = {
    client_content: {
      turns: turns,  // 发送完整的对话历史
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
    let text = modelTurn.parts?.[0]?.text
    if (text) {
      // 处理文本格式
      text = text
        // 移除句子开头的逗号和空格
        .replace(/^[,，]\s*/g, '')
        // 合并多余的空行
        .replace(/\n\s*\n/g, '\n')
        // 合并被截断的句子（不是在标点符号后的换行）
        .replace(/([^。！？：、，\n])\n/g, '$1')
        // 确保列表项保持换行
        .replace(/^[•\-*]\s*/gm, '\n• ')
        // 移除末尾多余的换行
        .trim()

      // 如果已经有助手的消息，就更新最后一条；否则创建新的
      if (chatHistory.value.length > 0 && 
          chatHistory.value[chatHistory.value.length - 1].role === 'assistant') {
        chatHistory.value[chatHistory.value.length - 1].content += text
      } else {
        chatHistory.value.push({
          role: 'assistant',
          content: text
        })
      }
      
      logger.value?.debug('当前AI回复:', chatHistory.value[chatHistory.value.length - 1].content)
      
      // 在更新消息后滚动
      scrollToBottom()
    }

    const inlineData = modelTurn.parts?.[0]?.inlineData
    if (inlineData) {
      const b64data = inlineData.data
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

// 添加自动滚动函数
const scrollToBottom = () => {
  if (chatHistoryRef.value) {
    nextTick(() => {
      chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
    })
  }
}

// 添加回车键处理函数
const handleEnterKey = (e) => {
  // 如果按下 Shift + Enter，则插入换行
  if (e.shiftKey) {
    return
  }
  // 如果内容为空，不提交
  if (!aiPrompt.value.trim()) {
    return
  }
  // 提交内容
  askAIToPlotMap()
}

// AI 绘制地图
const askAIToPlotMap = async () => {
  if (!aiPrompt.value) return
  
  chatHistory.value.push({
    role: 'user',
    content: aiPrompt.value
  })
  
  // 添加滚动
  scrollToBottom()

  try {
    await run(aiPrompt.value, 'TEXT', [{ functionDeclarations: mapFns }])
    aiPrompt.value = ''
  } catch (error) {
    logger.value?.error('AI 绘制地图失败:', error)
    chatHistory.value.push({
      role: 'error',
      content: '绘制地图失败: ' + error.message
    })
    // 错误消息也需要滚动
    scrollToBottom()
  }
}

// 添加开始新地图的函数
const startNewMap = () => {
  // 清除所有标记
  markers.value.forEach(marker => {
    marker.setMap(null)  // 从地图上移除标记
  })
  markers.value = []     // 清空标记数组
  
  // 清除所有路径
  if (window.currentPath) {
    window.currentPath.setMap(null)
    window.currentPath = null
  }
  
  // 清除所有多边形（如果有的话）
  if (window.currentPolygon) {
    window.currentPolygon.setMap(null)
    window.currentPolygon = null
  }
  
  // 重置地图视图到中国中心
  if (map.value) {
    map.value.setCenter({ lat: 35.8617, lng: 104.1954 })  // 中国中心位置
    map.value.setZoom(4)  // 适合查看整个中国的缩放级别
  }
  
  // 清空聊天历史
  chatHistory.value = []
  
  // 清空输入框
  aiPrompt.value = ''
  
  // 重置其他可能的状态
  if (window.google && window.google.maps) {
    window.google.maps.event.trigger(map.value, 'resize')
  }
}

// 初始化
onMounted(async () => {
  logger.value = new Logger('GeminiMap', 'DEBUG')
  
  try {
    // 加载 Google Maps
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
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

// 配置 marked 选项
marked.setOptions({
  breaks: true,  // 将换行符转换为 <br>
  gfm: true      // 启用 GitHub 风格的 Markdown
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.map-container {
  width: 100%;
  height: 600px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.map {
  width: 100%;
  height: 100%;
}

.control-panel {
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.prompt-input {
  flex: 1;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  font-size: 14px;
  line-height: 1.5;
}

.prompt-input:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
}

.submit-button {
  padding: 12px 24px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background: #3367d6;
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.connection-status {
  font-size: 12px;
  color: #666;
}

.chat-history {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8f9fa;
}

.message {
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 80%;
}

.message.user {
  background: #e3f2fd;
  margin-left: auto;
}

.message.assistant {
  background: #f5f5f5;
  margin-right: auto;
}

.message.error {
  background: #ffebee;
  color: #c62828;
  margin-right: auto;
}

.buttons {
  display: flex;
  gap: 8px;
}

.new-map-button {
  padding: 12px 24px;
  background: #34a853;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.new-map-button:hover {
  background: #2d8e47;
}

.control-panel {
  max-height: 500px;
  overflow-y: auto;
}

/* 添加 Markdown 样式 */
.message.assistant :deep(p) {
  margin: 0.5em 0;
  line-height: 1.6;
}

.message.assistant :deep(code) {
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.message.assistant :deep(pre) {
  background-color: #f6f8fa;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
}

.message.assistant :deep(ul), 
.message.assistant :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.message.assistant :deep(li) {
  margin: 0.3em 0;
}

.message.assistant :deep(br) {
  content: "";
  display: block;
  margin: 0.3em 0;
}

.message.assistant :deep(table) {
  border-collapse: collapse;
  margin: 0.5em 0;
}

.message.assistant :deep(th),
.message.assistant :deep(td) {
  border: 1px solid #ddd;
  padding: 0.5em;
}

.message.assistant :deep(blockquote) {
  border-left: 4px solid #ddd;
  margin: 0.5em 0;
  padding-left: 1em;
  color: #666;
}
</style>