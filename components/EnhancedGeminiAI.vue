<template>
  <div class="enhanced-gemini">
    <!-- 添加初始化状态提示 -->
    <div v-if="!genAI" class="loading-state">
      正在初始化 Gemini...
    </div>
    
    <!-- 主要聊天区域 -->
    <div class="chat-container">
      <div class="chat-history" ref="chatContainer">
        <div v-for="(msg, index) in chatHistory" :key="index" 
             :class="['message', msg.role]">
          <div class="message-content" v-html="renderMarkdown(msg.content)"></div>
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
          <label class="search-toggle">
            <input type="checkbox" v-model="searchEnabled">
            启用搜索
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

// 基础状态
const genAI = ref(true)
const chatHistory = ref([])
const isLoading = ref(false)
const userInput = ref('')
const searchEnabled = ref(false)

// Markdown 渲染
const renderMarkdown = (text) => {
  if (!text) return ''
  return md.render(text)
}

// 发送消息
const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  isLoading.value = true
  const prompt = userInput.value
  userInput.value = ''

  try {
    chatHistory.value.push({
      role: 'user',
      content: prompt
    })

    const response = await fetch('https://gemini-worker.fengyx91.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'gemini-2.0-flash-exp',
        searchEnabled: searchEnabled.value
      })
    })

    const result = await response.json()
    console.log('API Response:', result)

    if (!result.success) {
      throw new Error(result.error || '请求失败')
    }

    // 提取 AI 的回复内容
    const aiResponse = result.data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (aiResponse) {
      chatHistory.value.push({
        role: 'assistant',
        content: aiResponse
      })
    } else {
      console.warn('Unexpected response format:', result)
      throw new Error('返回数据格式不正确')
    }

  } catch (error) {
    console.error('生成回答失败:', error)
    chatHistory.value.push({
      role: 'error',
      content: '抱歉，生成回答时出现错误：' + error.message
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.enhanced-gemini {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-history {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.input-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
</style> 