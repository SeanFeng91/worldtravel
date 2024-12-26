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

        <label class="search-toggle">
          <input type="checkbox" v-model="searchEnabled">
          <span class="search-label">启用搜索</span>
          <span class="search-tooltip">启用后可以获取实时网络信息</span>
        </label>
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

      <div class="chat-history scroll-container" ref="chatContainer">
        <div v-if="currentChat.messages.length === 0" class="welcome-message">
          <h2>👋 欢迎使用 Gemini AI 助手</h2>
          <div class="suggestions">
            <p>您可以尝试以下问题：</p>
            <ul>
              <li @click="sendSuggestion('帮我写一段贪吃蛇的Python代码')">
                📝 帮我写一段Python代码
              </li>
              <li @click="sendSuggestion('帮我查一下今天北京到杭州的机票情况')">
                🔍 解释一下什么是人工智能
              </li>
              <li @click="sendSuggestion('帮我规划一段3天东京自由行行程')">
                💡 帮我规划一段3天东京自由行行程
              </li>
              <li @click="sendSuggestion('北京今天的天气情况如何')">
                📚 如何学习编程？
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
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

// 添加 renderMarkdown 函数
const renderMarkdown = (text) => {
  if (!text) return ''
  try {
    return md.render(text)
  } catch (error) {
    console.error('Markdown rendering error:', error)
    return text
  }
}

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
const chatContainer = ref(null)

// AI 参数设置
const showSettings = ref(false)
const aiSettings = ref({
  temperature: 0.3,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 8192
})

// 开始新对话
const startNewChat = () => {
  const newChat = {
    id: Date.now(),
    messages: []
  }
  chats.value.push(newChat)
  currentChat.value = newChat
  userInput.value = ''
}

// 发送消息
const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  isLoading.value = true
  const prompt = userInput.value
  userInput.value = ''

  try {
    // 添加用户消息到当前对话
    currentChat.value.messages.push({
      role: 'user',
      content: prompt
    })

    // 构建包含历史记录的请求
    const messages = currentChat.value.messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content }]
    }))

    const response = await fetch('https://gemini-worker.fengyx91.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'gemini-2.0-flash-exp',
        searchEnabled: searchEnabled.value,
        messages: messages,
        settings: aiSettings.value  // 添加参数设置
      })
    })

    const result = await response.json()
    console.log('API Response:', result)

    if (!result.success) {
      throw new Error(result.error || '请求失败')
    }

    const aiResponse = result.data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (aiResponse) {
      currentChat.value.messages.push({
        role: 'assistant',
        content: aiResponse
      })
    } else {
      throw new Error('返回数据格式不正确')
    }

  } catch (error) {
    console.error('生成回答失败:', error)
    currentChat.value.messages.push({
      role: 'error',
      content: '抱歉，生成回答时出现错误：' + error.message
    })
  } finally {
    isLoading.value = false
  }
}

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
</script>

<style scoped>
.enhanced-gemini {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 100px);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px 8px 0 0;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-chat-btn:hover {
  background: #45a049;
  transform: translateY(-1px);
}

.new-chat-btn .icon {
  font-size: 18px;
  font-weight: bold;
}

.search-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
}

.search-tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  background: #333;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.search-toggle:hover .search-tooltip {
  opacity: 1;
}

.welcome-message {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.suggestions {
  margin-top: 20px;
  text-align: left;
  max-width: 400px;
  margin: 20px auto;
}

.suggestions ul {
  list-style: none;
  padding: 0;
}

.suggestions li {
  margin: 10px 0;
  padding: 10px 15px;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.suggestions li:hover {
  background: #f0f0f0;
  transform: translateX(5px);
  border-color: #4CAF50;
  color: #4CAF50;
}

.message {
  margin: 10px 20px;
  padding: 15px;
  border-radius: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  background: #e3f2fd;
  margin-left: 60px;
  border: 1px solid #bbdefb;
}

.message.assistant {
  background: #fff;
  margin-right: 60px;
  border: 1px solid #e0e0e0;
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
  font-size: 14px;
  color: #666;
}

.role-icon {
  font-size: 18px;
}

.input-area {
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;
}

textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #4CAF50;
  outline: none;
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 滚动条样式 */
.scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 添加 Markdown 内容样式 */
.markdown-body :deep(p) {
  margin: 0.5em 0;
}

.markdown-body :deep(pre) {
  background: #f6f8fa;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.markdown-body :deep(code) {
  font-family: monospace;
  background: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.markdown-body :deep(ul), 
.markdown-body :deep(ol) {
  padding-left: 2em;
  margin: 0.5em 0;
}

.markdown-body :deep(blockquote) {
  margin: 0.5em 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  color: #666;
}

/* 添加新样式 */
.settings-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #666;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.settings-btn:hover {
  background: #555;
  transform: translateY(-1px);
}

.settings-panel {
  padding: 15px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  animation: slideDown 0.3s ease;
}

.setting-item {
  margin: 10px 0;
}

.setting-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-container input[type="range"] {
  flex: 1;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  outline: none;
}

.slider-container .value {
  min-width: 40px;
  text-align: right;
  color: #666;
}

.setting-desc {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 