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
    // 添加用户消息
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

    // 创建 AI 回复消息
    const assistantMessage = {
      role: 'assistant',
      content: ''
    }
    messages.value.push(assistantMessage)

    // 处理流式响应
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        // 解码数据
        const chunk = decoder.decode(value)
        // 处理多行数据
        const lines = chunk.split('\n').filter(line => line.trim() !== '')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5) // 移除 'data: ' 前缀
            if (data === '[DONE]') continue
            
            try {
              const jsonData = JSON.parse(data)
              if (jsonData.response !== undefined) {
                // 更新最后一条消息的内容
                const lastMessage = messages.value[messages.value.length - 1]
                if (lastMessage && lastMessage.role === 'assistant') {
                  lastMessage.content += jsonData.response
                }
              }
            } catch (e) {
              console.error('解析 JSON 失败:', e)
            }
          }
        }
      }
    } catch (readError) {
      console.error('读取流时出错:', readError)
      throw new Error('读取 AI 响应时出错')
    }

    // 清空输入
    userInput.value = ''
  } catch (error) {
    console.error('完整错误信息:', error)
    messages.value.push({
      role: 'system',
      content: '发生错误: ' + (error.message || '未知错误')
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
  height: 100%;
  padding: 10px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
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