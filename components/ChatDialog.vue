<template>
  <div class="chat-dialog">
    <div class="messages" ref="messagesRef">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.role">
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

const API_KEY = import.meta.env.VITE_API_KEY
const WORKER_URL = import.meta.env.VITE_WORKER_URL

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  isLoading.value = true
  
  try {
    // 添加调试日志
    console.log('发送请求到:', `${WORKER_URL}/ai/chat`);
    console.log('发送的消息:', {
      messages: [
        { role: 'system', content: 'You are a friendly assistant' },
        ...messages.value,
        { role: 'user', content: userInput.value }
      ]
    });

    const response = await fetch(`${WORKER_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a friendly assistant' },
          ...messages.value,
          { role: 'user', content: userInput.value }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '请求失败');
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
      
      // 更新最后一条消息
      if (messages.value[messages.value.length - 1].role === 'assistant') {
        messages.value[messages.value.length - 1] = assistantMessage
      } else {
        messages.value.push(assistantMessage)
      }
    }

    userInput.value = ''
  } catch (error) {
    console.error('完整错误信息:', error);
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
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.user {
  align-self: flex-end;
  background: #e3f2fd;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
}

.assistant {
  align-self: flex-start;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
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
}

button {
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 