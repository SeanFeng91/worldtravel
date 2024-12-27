<template>
  <div class="enhanced-gemini">
    <div class="chat-container">
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
          :map-enabled="mapEnabled"
          ref="mapRef"
        />

        <div class="chat-history scroll-container" ref="chatContainer">
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
                <li @click="sendSuggestion('北京今天的天气情况如何')">
                  📚 北京今天的天气情况如何（需要开启搜索）
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

const md = new MarkdownIt()
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapRef = ref(null)

// 添加 renderMarkdown 函数
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
  userInput.value = '';

  try {
    // 添加用户消息
    currentChat.value.messages.push({
      role: 'user',
      content: prompt
    });
 
    const response = await fetch(import.meta.env.VITE_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'gemini-pro',
        searchEnabled: searchEnabled.value,
        mapEnabled: mapEnabled.value,
        messages: currentChat.value.messages,
        settings: aiSettings.value
      })
    });

    const result = await response.json();
    console.log('Full API Response:', result);

    if (!result.success) {
      throw new Error(result.error || '请求失败');
    }

    // 提取 AI 响应文本
    const aiResponse = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // 添加响应到消息列表
    currentChat.value.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // 处理地图数据
    if (result.toolResults?.length) {
      const mapData = result.toolResults[0];
      console.log('Map data received:', mapData);
      
      // 初始化地图（如果还没有初始化）
      if (!mapRef.value?.map) {
        await mapRef.value?.initMap();
      }

      // 如果有中心点，使用地理编码设置地图中心
      if (mapData.center) {
        try {
          const geocoder = new google.maps.Geocoder();
          const response = await new Promise((resolve, reject) => {
            geocoder.geocode({ address: mapData.center }, (results, status) => {
              if (status === 'OK' && results[0]) {
                resolve(results[0].geometry.location);
              } else {
                reject(new Error(`Geocoding failed: ${status}`));
              }
            });
          });
          
          mapRef.value?.map?.setCenter(response);
          mapRef.value?.map?.setZoom(mapData.zoom || 12);
        } catch (error) {
          console.error('Error geocoding center:', error);
        }
      }

      // 处理标记点
      if (Array.isArray(mapData.markers)) {
        try {
          const geocoder = new google.maps.Geocoder();
          const geocodePromises = mapData.markers.map(location => 
            new Promise((resolve) => {
              geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK' && results[0]) {
                  const pos = results[0].geometry.location;
                  resolve(`${pos.lat()},${pos.lng()}`);
                } else {
                  resolve(null);
                }
              });
            })
          );

          const coordinates = (await Promise.all(geocodePromises))
            .filter(coord => coord !== null);

          console.log('Geocoded coordinates:', coordinates);
          if (coordinates.length > 0) {
            await mapRef.value?.updateMarkers(coordinates);
          }
        } catch (error) {
          console.error('Error processing markers:', error);
        }
      }
    }

  } catch (error) {
    console.error('Error in handleSend:', error)
    currentChat.value.messages.push({
      role: 'error',
      content: '发生错误：' + error.message
    })
    // 发生错误时也清除地图数据
    clearMapData()
  } finally {
    isLoading.value = false
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
    // 确保地图组件已经挂载
    await nextTick()
    // 初始化地图
    mapRef.value?.initMap()
  }
})
</script>

<style scoped>
.enhanced-gemini {
  height: 100%;
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
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 20px;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  min-height: 200px;
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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  padding: 20px;
}

textarea {
  width: 100%;
  min-height: 80px;
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: rgba(0,0,0,0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.toggle-item:hover .toggle-tooltip {
  opacity: 1;
  visibility: visible;
}
</style> 