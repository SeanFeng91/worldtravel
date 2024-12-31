<template>
  <div class="enhanced-gemini">
    <div class="chat-container" ref="chatContainer">
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

      <div v-if="showSettings" class="settings-panel">
        <div class="setting-item">
          <label>创造性 (Temperature)</label>
          <div class="slider-container">
            <input type="range" v-model="aiSettings.temperature" min="0" max="1" step="0.1">
            <span class="value">{{ aiSettings.temperature }}</span>
          </div>
          <div class="setting-desc">控制回答的创造性和随机性 (0.0-1.0)</div>
        </div>

        <div class="setting-item">
          <label>词汇多样性 (Top K)</label>
          <div class="slider-container">
            <input type="range" v-model="aiSettings.topK" min="1" max="100" step="1">
            <span class="value">{{ aiSettings.topK }}</span>
          </div>
          <div class="setting-desc">控制词汇选择范围 (1-100)</div>
        </div>

        <div class="setting-item">
          <label>输出概率阈值 (Top P)</label>
          <div class="slider-container">
            <input type="range" v-model="aiSettings.topP" min="0" max="1" step="0.05">
            <span class="value">{{ aiSettings.topP }}</span>
          </div>
          <div class="setting-desc">控制输出的确定性 (0.0-1.0)</div>
        </div>

        <div class="setting-item">
          <label>最大输出长度</label>
          <div class="slider-container">
            <input type="range" v-model="aiSettings.maxOutputTokens" 
                   min="1000" max="8192" step="1000">
            <span class="value">{{ aiSettings.maxOutputTokens }}</span>
          </div>
          <div class="setting-desc">控制回答的最大长度 (1000-8192)</div>
        </div>
      </div>

      <div class="content-wrapper">
        <PersistentMap 
          v-if="mapEnabled" 
          ref="mapRef"
          @map-expand="handleMapExpand"
          :mapEnabled="mapEnabled"
          class="map-component"
        />

        <div class="chat-history" :class="{ 'map-active': mapEnabled, 'map-expanded': isMapExpanded }" ref="chatContainer">
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

// 发送消息
const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  isLoading.value = true;
  const prompt = userInput.value;
  
  // 先添加用户消息到对话历史
  currentChat.value.messages.push({
    role: 'user',
    content: prompt
  });
  
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

    // 添加 AI 响应到消息列表
    currentChat.value.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // 处理工具结果
    if (result.toolResults?.length) {
      console.log('Processing tool results:', result.toolResults);
      for (const toolResult of result.toolResults) {
        switch (toolResult.type) {
          case 'map':
            if (mapRef.value) {
              await mapRef.value.updateMarkers(toolResult.markers);
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
  } finally {
    isLoading.value = false;
  }
};

// 自动滚动到底部
watch(() => currentChat.value.messages.length, async () => {
  await nextTick()
  const container = chatContainer.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
})

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
</script>

<style scoped>
.enhanced-gemini {
  height: 100vh;
  max-height: 900px;
  display: flex;
  flex-direction: column;
  background: #f5f7f9;
  border-radius: 12px;
  border: 1px solid #e0e3e7;
  overflow: hidden;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.chat-history {
  height: 500px; /* 固定高度 */
  min-height: 300px;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.map-component {
  width: 100%;
  height: 400px; /* 固定高度 */
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.message {
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  max-width: 100%;
  box-sizing: border-box;
}

.message.user {
  background: #e3f2fd;
  margin-left: 0;
}

.message.assistant {
  background: #f5f5f5;
  margin-right: 0;
}

.message.error {
  background: #ffebee;
  color: #c62828;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.message-content {
  line-height: 1.5;
  word-break: break-word;
}

.input-area {
  position: sticky;
  bottom: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: auto;
}

textarea {
  width: 100%;
  min-height: 60px;
  max-height: 150px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  resize: vertical;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
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

/* 添加滚动条样式 */
.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 欢迎消息样式 */
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

/* 设置面板样式 */
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

/* 按钮样式 */
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

/* Feature toggles 样式 */
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
</style> 