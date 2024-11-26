<template>
  <div class="chat-dialog">
    <div class="messages" ref="messagesRef">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.role">
        <strong>{{ msg.role === 'user' ? '你：' : 'AI：' }}</strong>
        {{ msg.content }}
      </div>
    </div>
    
    <div class="input-area">
      <input 
        v-model="userInput" 
        @keyup.enter="sendMessage"
        placeholder="输入消息..."
        :disabled="isLoading"
      />
      <button @click="sendMessage" :disabled="isLoading">
        {{ isLoading ? '发送中...' : '发送' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const WORKER_URL = import.meta.env.VITE_WORKER_URL.replace(/\/$/, '')
const API_KEY = import.meta.env.VITE_API_KEY

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  isLoading.value = true
  
  try {
    // 先将用户消息添加到消息列表
    const userMessage = {
      role: 'user',
      content: userInput.value.trim()
    }
    messages.value.push(userMessage)

    // 准备发送的消息数组
    const messageHistory = [
      { role: 'system', content: 'You are a friendly assistant' },
      ...messages.value
    ]

    console.log('发送的消息:', messageHistory)

    const response = await fetch(`${WORKER_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({ messages: messageHistory })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '请求失败')
    }

    // 处理流式响应
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let assistantMessage = { role: 'assistant', content: '' }
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      // 解码并累加助手的回复
      const chunk = decoder.decode(value)
      assistantMessage.content += chunk
      
      // 更新或添加助手的回复
      if (messages.value[messages.value.length - 1].role === 'assistant') {
        messages.value[messages.value.length - 1] = { ...assistantMessage }
      } else {
        messages.value.push({ ...assistantMessage })
      }
    }

    // 清空输入
    userInput.value = ''
  } catch (error) {
    console.error('完整错误信息:', error)
    messages.value.push({
      role: 'system',
      content: '发生错误: ' + error.message
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.chat-dialog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 500px;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.user, .assistant, .system {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  max-width: 80%;
  white-space: pre-wrap;
}

.user {
  align-self: flex-end;
  background: #e3f2fd;
}

.assistant {
  align-self: flex-start;
  background: #f5f5f5;
}

.system {
  align-self: center;
  background: #fff3e0;
  font-size: 0.9em;
}

.input-area {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 