<template>
  <div class="enhanced-gemini">
    <div class="chat-container">
      <div class="toolbar">
        <button @click="startNewChat" class="new-chat-btn">
          <span class="icon">+</span> 新话题
        </button>
        <label class="search-toggle">
          <input type="checkbox" v-model="searchEnabled">
          启用搜索
        </label>
      </div>

      <div class="chat-history scroll-container" ref="chatContainer">
        <div v-for="(msg, index) in currentChat.messages" :key="index" 
             :class="['message', msg.role]">
          <div class="message-content" 
               v-html="renderMarkdown(msg.content)"
               :class="{ 'markdown-body': msg.role === 'assistant' }">
          </div>
        </div>
      </div>
      
      <div class="input-area">
        <textarea 
          v-model="userInput"
          placeholder="输入您的问题..."
          @keyup.enter.ctrl="handleSend"
        ></textarea>
        <div class="controls">
          <button @click="handleSend" :disabled="isLoading">
            {{ isLoading ? '发送中...' : '发送' }}
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
        messages: messages // 添加历史消息
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
</script>

<style scoped>
.enhanced-gemini {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 100px);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.new-chat-btn:hover {
  background: #45a049;
}

.new-chat-btn .icon {
  font-size: 18px;
  font-weight: bold;
}

.scroll-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 20px;
  max-height: calc(100vh - 280px);
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

.input-area {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
}

.message.user {
  background: #e3f2fd;
  margin-left: 20%;
}

.message.assistant {
  background: #f5f5f5;
  margin-right: 20%;
}

.message.error {
  background: #ffebee;
  color: #c62828;
}

textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #007AFF;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

.search-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
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
</style> 