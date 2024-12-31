<template>
  <div class="enhanced-gemini">
    <!-- 工具栏 -->
    <div class="toolbar">
      <button @click="startNewChat" class="new-chat-btn">
        <span class="icon">+</span> 新话题
      </button>
      
      <button @click="showSettings = !showSettings" class="settings-btn">
        <span class="icon">⚙️</span> 参数设置
      </button>

      <div class="feature-toggles">
        <label class="toggle-item">
          <input type="checkbox" v-model="searchEnabled">
          <span class="toggle-label">搜索</span>
          <span class="toggle-tooltip">启用后可以获取实时网络信息</span>
        </label>

        <label class="toggle-item">
          <input type="checkbox" v-model="mapEnabled">
          <span class="toggle-label">地图</span>
          <span class="toggle-tooltip">启用后可以在地图上显示位置</span>
        </label>

        <label class="toggle-item">
          <input type="checkbox" v-model="youtubeEnabled">
          <span class="toggle-label">视频</span>
          <span class="toggle-tooltip">启用后可以搜索相关视频</span>
        </label>
      </div>
    </div>

    <div class="main-content">
      <!-- 固定地图区域 -->
      <div class="map-section" v-if="mapEnabled">
        <PersistentMap ref="mapRef" :mapEnabled="mapEnabled" />
      </div>

      <!-- 可滚动的聊天区域 -->
      <div class="chat-section">
        <div class="chat-history" ref="chatContainer">
          <div v-if="currentChat.messages.length === 0" class="welcome-message">
            <h2>👋 欢迎使用 Gemini AI 助手</h2>
            <div class="suggestions">
              <p>您可以尝试以下问题：</p>
              <ul>
                <li @click="sendSuggestion('帮我写一段贪吃蛇的Python代码')">
                  📝 帮我写一段贪吃蛇的Python代码
                </li>
                <li @click="sendSuggestion('帮我查一下今天北京到杭州的机票情况')">
                  🔍 帮我查一下今天北京到杭州的机票情况（需要开启搜索）
                </li>
                <li @click="sendSuggestion('帮我规划一段3天东京自由行行程，在地图上标记去的地方')">
                  💡 帮我规划一段3天东京自由行行程，在地图上标记去的地方（需要勾选地图选项）
                </li>
                <li @click="sendSuggestion('找一些关于京都旅游的视频介绍')">
                  🎥 找一些关于京都旅游的视频介绍（需要开启视频功能）
                </li>
              </ul>
            </div>
          </div>

          <div v-for="(msg, index) in currentChat.messages" :key="index" 
               :class="['message', msg.role]">
            <div class="message-header">
              <span class="role-icon">{{ msg.role === 'user' ? '👤' : '🤖' }}</span>
              <span class="role-name">{{ msg.role === 'user' ? '您' : 'AI 助手' }}</span>
            </div>
            <div class="message-content" 
                 v-html="renderMarkdown(msg.content)"
                 :class="{ 'markdown-body': msg.role === 'assistant' }">
            </div>
          </div>
        </div>
        <div class="input-area">
          <textarea 
            v-model="userInput"
            placeholder="输入您的问题... (Ctrl + Enter 快速发送)"
            @keyup.enter.ctrl="handleSend"
          ></textarea>
          <div class="controls">
            <button @click="handleSend" :disabled="isLoading" class="send-btn">
              <span class="btn-icon">{{ isLoading ? '⏳' : '📤' }}</span>
              <span class="btn-text">{{ isLoading ? '发送中...' : '发送' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="debugMode" class="debug-info">
      <div class="debug-title">调试信息:</div>
      <div>搜索功能: {{ searchEnabled ? '开启' : '关闭' }}</div>
      <div>地图功能: {{ mapEnabled ? '开启' : '关闭' }}</div>
      <div>最后一次工具调用: {{ lastToolCall }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import MarkdownIt from 'markdown-it'
import PersistentMap from './PersistentMap.vue'

const md = new MarkdownIt({
  html: true,  // 允许 HTML 标签
  breaks: true,  // 允许换行
  linkify: true  // 自动转换链接
})
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapRef = ref(null)

// 修改 renderMarkdown 函数
const renderMarkdown = (text) => {
  if (!text) return '';
  try {
    // 移除包含 coordinates 和 address 的行
    const cleanedText = text.replace(/\n[^]*?coordinates[^]*?address[^}]*}/g, '');
    return md.render(cleanedText);
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return text;
  }
};

// 对话历史结构
const chats = ref([{
  id: Date.now(),
  messages: []
}])

// 当前对话
const currentChat = ref(chats.value[0])

// 其他状态
const isLoading = ref(false)
const userInput = ref('')
const searchEnabled = ref(false)
const mapEnabled = ref(false)
const youtubeEnabled = ref(false)  // 添加 YouTube 功能开关
const chatContainer = ref(null)

// AI 参数设置
const showSettings = ref(false)
const aiSettings = ref({
  temperature: 0.3,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 8192
})

const debugMode = ref(false)  // 可以添加一个按钮来切换
const lastToolCall = ref('无')

// 存储地图实例
const mapInstances = ref(new Map())

// 添加地图展开状态的响应式变量
const isMapExpanded = ref(false)

// 监听地图展开状态变化
const handleMapExpand = (expanded) => {
  isMapExpanded.value = expanded
}

// 替换 loader 相关代码
const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => resolve(window.google);
    script.onerror = (err) => reject(err);
    
    document.head.appendChild(script);
  });
};

// 初始化地图的方法
const initMap = async (element, mapData, mapIndex) => {
  if (!element || mapInstances.value.has(mapIndex)) return;

  try {
    const google = await loadGoogleMapsScript();
    
    // 预先进行所有地理编码操作
    const geocodePromises = mapData.markers?.map(async (markerData) => {
      try {
        if (typeof markerData === 'object' && !markerData.coordinates.includes(',')) {
          const geocoder = new google.maps.Geocoder();
          const result = await new Promise((resolve, reject) => {
            geocoder.geocode(
              { address: markerData.address, region: 'jp' },
              (results, status) => {
                if (status === 'OK' && results[0]) {
                  resolve({
                    position: results[0].geometry.location,
                    title: markerData.address
                  });
                } else {
                  reject(new Error(`Geocode failed: ${status}`));
                }
              }
            );
          });
          return result;
        } else {
          const [lat, lng] = (markerData.coordinates || markerData).split(',').map(Number);
          return {
            position: { lat, lng },
            title: markerData.address || markerData
          };
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        return null;
      }
    }) || [];

    // 等待所有地理编码完成
    const geocodedMarkers = (await Promise.all(geocodePromises)).filter(Boolean);

    // 创建地图
    const map = new google.maps.Map(element, {
      center: { lat: 35.6762, lng: 139.6503 }, // 默认中心点
      zoom: 12,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // 存储当前打开的信息窗口
    let currentInfoWindow = null;

    const bounds = new google.maps.LatLngBounds();

    // 一次性添加所有标记
    geocodedMarkers.forEach(({ position, title }) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(16, 32)
        }
      });

      // 添加信息窗口
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;">${title}</div>`
      });

      marker.addListener('click', () => {
        // 关闭之前打开的信息窗口
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });

      bounds.extend(position);
    });

    // 调整地图视野以显示所有标记
    if (geocodedMarkers.length > 0) {
      map.fitBounds(bounds);
      if (geocodedMarkers.length === 1) {
        map.setZoom(Math.min(15, map.getZoom()));
      }
    }

    // 点击地图时关闭信息窗口
    map.addListener('click', () => {
      if (currentInfoWindow) {
        currentInfoWindow.close();
        currentInfoWindow = null;
      }
    });

    mapInstances.value.set(mapIndex, map);

  } catch (error) {
    console.error('Map initialization error:', error);
  }
};

// 在组件卸载时清理地图实例
onUnmounted(() => {
  mapInstances.value.clear();
});

// 开始新对话
const startNewChat = () => {
  const newChat = {
    id: Date.now(),
    messages: []
  }
  chats.value.push(newChat)
  currentChat.value = newChat
  userInput.value = ''
  
  // 清除地图标记
  mapRef.value?.clearMarkers()
}

// 添加清除地图数据的方法
const clearMapData = () => {
  if (mapRef.value) {
    mapRef.value.clearMarkers()
    // 如果有其他地图相关的状态，也在这里清除
  }
}

// 修改滚动函数，增加平滑滚动效果
const scrollToBottom = async () => {
  // 等待下一个 tick，确保消息内容已经渲染
  await nextTick()
  // 再等待一个短暂延时，确保 DOM 完全更新
  await new Promise(resolve => setTimeout(resolve, 50))
  
  const container = chatContainer.value
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
  }
}

// 发送消息
const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  isLoading.value = true;
  const prompt = userInput.value;
  
  // 添加用户消息并滚动
  currentChat.value.messages.push({
    role: 'user',
    content: prompt
  });
  await scrollToBottom();
  
  userInput.value = '';

  try {
    const response = await fetch(import.meta.env.VITE_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        messages: currentChat.value.messages,
        settings: aiSettings.value,
        searchEnabled: searchEnabled.value,
        mapEnabled: mapEnabled.value,
        youtubeEnabled: youtubeEnabled.value
      })
    });

    // 检查响应状态
    if (!response.ok) {
      let errorMessage = '请求失败';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = await response.text() || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // 添加 JSON 解析错误处理
    let result;
    try {
      result = await response.json();
    } catch (e) {
      console.error('JSON 解析错误:', e);
      throw new Error('响应格式错误');
    }

    if (!result.success) {
      throw new Error(result.error || '请求失败');
    }

    // 提取 AI 响应文本
    const aiResponse = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // 添加 AI 响应并滚动
    currentChat.value.messages.push({
      role: 'assistant',
      content: aiResponse
    });
    await scrollToBottom();

    // 处理工具结果
    if (result.toolResults?.length) {
      console.log('Processing tool results:', result.toolResults);
      for (const toolResult of result.toolResults) {
        switch (toolResult.type) {
          case 'map':
            if (mapRef.value && toolResult.markers) {
              console.log('Updating map markers:', toolResult.markers)
              await mapRef.value.initMap() // 确保地图已初始化
              await mapRef.value.updateMarkers(toolResult.markers)
            }
            break;
          case 'youtube':
            if (toolResult.data?.videos?.length) {
              console.log('Processing YouTube results:', toolResult.data);
              
              // 将所有视频结果合并到一条消息中
              const videoList = toolResult.data.videos
                .map(video => `
<div class="video-card">
  <a href="${video.url}" target="_blank" class="video-thumbnail">
    <img src="${video.thumbnailUrl}" alt="${video.title}"/>
  </a>
  <div class="video-info">
    <h3><a href="${video.url}" target="_blank">${video.title}</a></h3>
    <div class="video-meta">
      <span>📺 ${video.channelTitle}</span>
      <span>🕒 ${new Date(video.publishedAt).toLocaleDateString('zh-CN')}</span>
    </div>
    <p>${video.description.slice(0, 100)}...</p>
  </div>
</div>`
                ).join('\n');
              
              // 添加单条包含所有视频的消息
              currentChat.value.messages.push({
                role: 'assistant',
                content: `找到以下相关视频：\n${videoList}`
              });
              await scrollToBottom();
            }
            break;
        }
      }
    }

  } catch (error) {
    console.error('Error in handleSend:', error);
    currentChat.value.messages.push({
      role: 'error',
      content: `发生错误：${error.message}`
    });
    await scrollToBottom();
  } finally {
    isLoading.value = false;
    await scrollToBottom();  // 最后再确保滚动到底部
  }
};

// 添加发送建议问题的方法
const sendSuggestion = (question) => {
  userInput.value = question;
  handleSend();
};

// 添加地图错误处理
const handleMapError = (e) => {
  console.error('Map image failed to load:', e)
  e.target.classList.add('error')
  const errorMessage = document.createElement('div')
  errorMessage.className = 'error-message'
  errorMessage.textContent = '地图加载失败，请检查 API Key 是否有效'
  e.target.parentNode.insertBefore(errorMessage, e.target.nextSibling)
}

// 监听 mapEnabled 的变化
watch(mapEnabled, async (newValue) => {
  if (newValue) {
    await nextTick()
    if (mapRef.value) {
      mapRef.value.initMap()
    }
  }
}, { immediate: true })

// 监听消息变化
watch(() => currentChat.value.messages, () => {
  scrollToBottom()
}, { deep: true })

// 在组件挂载时也滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.enhanced-gemini {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: v-bind('mapEnabled ? "100vh" : "calc(100vh - 200px)"');
  overflow-y: auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
}

.map-section {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  flex: none;
  background: white;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: v-bind('mapEnabled ? "400px" : "600px"');
  max-height: v-bind('mapEnabled ? "calc(100vh - 400px)" : "calc(100vh - 200px)"');
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.chat-history {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.chat-history::-webkit-scrollbar {
  width: 8px;
}

.chat-history::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.chat-history::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.chat-history::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.input-area {
  flex: none;
  padding: 20px;
  background: white;
  border-top: 1px solid #eee;
  z-index: 1;
}

textarea {
  width: 100%;
  min-height: 60px;
  max-height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  transition: border-color 0.2s;
}

textarea:focus {
  border-color: #1a73e8;
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  gap: 12px;
}

.send-btn {
  padding: 12px 24px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}

.send-btn:hover {
  background: #1557b0;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-weight: 500;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.feature-toggles {
  display: flex;
  gap: 16px;
}

.toggle-item {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-tooltip {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  display: none;
  white-space: nowrap;
  z-index: 1000;
}

.toggle-item:hover .toggle-tooltip {
  display: block;
}

:deep(.video-item) {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

:deep(.video-item img) {
  max-width: 320px;
  height: auto;
  border-radius: 4px;
  margin: 10px 0;
}

:deep(.video-item h3) {
  margin: 10px 0;
}

:deep(.video-item a) {
  color: #1a73e8;
  text-decoration: none;
}

:deep(.video-item a:hover) {
  text-decoration: underline;
}

:deep(.video-card) {
  display: flex;
  gap: 16px;
  padding: 16px;
  margin: 16px 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

:deep(.video-thumbnail) {
  flex-shrink: 0;
}

:deep(.video-thumbnail img) {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

:deep(.video-info) {
  flex: 1;
  min-width: 0;
}

:deep(.video-info h3) {
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.4;
}

:deep(.video-info a) {
  color: #1a73e8;
  text-decoration: none;
}

:deep(.video-info a:hover) {
  text-decoration: underline;
}

:deep(.video-meta) {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

:deep(.description) {
  margin: 8px 0 0;
  color: #444;
  font-size: 14px;
  line-height: 1.5;
}

:deep(.channel), :deep(.date) {
  display: flex;
  align-items: center;
  gap: 4px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-message {
  text-align: center;
  padding: 40px 20px;
}

.welcome-message h2 {
  margin-bottom: 20px;
  color: #333;
}

.suggestions {
  max-width: 600px;
  margin: 0 auto;
}

.suggestions ul {
  list-style: none;
  padding: 0;
}

.suggestions li {
  padding: 12px 16px;
  margin: 8px 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggestions li:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.settings-panel {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.setting-item {
  margin-bottom: 20px;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
}

.setting-desc {
  font-size: 12px;
  color: #666;
}

.send-btn, .new-chat-btn, .settings-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.send-btn {
  background: #4CAF50;
  color: white;
}

.send-btn:hover {
  background: #45a049;
}

.send-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

/* 消息样式 */
.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;
  width: 100%; /* 确保容器占满宽度 */
}

.message.user {
  align-items: flex-end; /* 将用户消息内容靠右对齐 */
}

.message.assistant {
  align-items: flex-start; /* 将助手消息内容靠左对齐 */
}

.message-header {
  width: 85%; /* 与消息内容等宽 */
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
}

.message.user .message-header {
  justify-content: flex-end; /* 用户消息头部靠右 */
}

.message-content {
  width: 85%; /* 限制消息内容宽度 */
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  font-size: 14px;
  word-wrap: break-word;
}

.message.assistant .message-content {
  width: 95%; /* 助手消息内容宽度更大 */
  background: #f5f5f5;
  border-top-left-radius: 4px;
  color: #333;
}

.message.user .message-content {
  background: #e3f2fd;
  border-top-right-radius: 4px;
  color: #1565c0;
}

.message.error .message-content {
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
}

/* Markdown 内容样式 */
.message.assistant .markdown-body {
  font-size: 14px;
  line-height: 1.6;
}

.message.assistant .markdown-body pre {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
}

.message.assistant .markdown-body code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  padding: 2px 4px;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
}

/* 消息出现动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 