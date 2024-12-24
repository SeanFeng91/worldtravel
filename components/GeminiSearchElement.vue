<template>
  <div class="gemini-search">
    <input
      type="text"
      v-model="query"
      placeholder="输入你的旅游相关问题..."
      class="search-input"
    />
    <button 
      @click="handleSearch"
      :disabled="loading"
      class="search-button"
    >
      {{ loading ? '搜索中...' : '使用 Gemini 搜索' }}
    </button>
    
    <div v-if="result" class="search-result">
      {{ result }}
    </div>

    <div v-if="chatHistory.length > 0" class="chat-history">
      <div v-for="(message, index) in chatHistory" :key="index" class="message">
        <div :class="['message-content', message.role]">
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { GoogleGenerativeAI } from "@google/generative-ai"

const MODEL = "models/gemini-2.0-flash-exp"
const CONFIG = {
  generation_config: { 
    response_modalities: ["TEXT"] 
  }
}

const chatHistory = ref([])
const query = ref('')
const result = ref('')
const loading = ref(false)
const session = ref(null)

const connectWebSocket = async () => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    session.value = await genAI.live.connect({
      model: MODEL,
      config: CONFIG
    })
  } catch (error) {
    console.error('WebSocket 连接错误:', error)
  }
}

const handleSearch = async () => {
  if (!query.value.trim()) return
  
  try {
    loading.value = true
    
    if (!session.value) {
      await connectWebSocket()
    }
    
    await session.value.send(query.value, true)
    
    for await (const response of session.value.receive()) {
      chatHistory.value.push({
        role: 'user',
        content: query.value
      })
      
      const responseText = response.text
      chatHistory.value.push({
        role: 'assistant',
        content: responseText
      })
      
      result.value = responseText
    }
    
    query.value = ''
  } catch (error) {
    console.error('Gemini API 错误:', error)
    result.value = '搜索时发生错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (session.value) {
    session.value.close()
  }
})
</script>

<style scoped>
.gemini-search {
  margin: 20px 0;
}

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:disabled {
  background-color: #cccccc;
}

.search-result {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chat-history {
  margin-top: 20px;
}

.message {
  margin-bottom: 10px;
}

.message-content {
  padding: 10px;
  border-radius: 4px;
  max-width: 80%;
}

.user {
  background-color: #e3f2fd;
  margin-left: auto;
}

.assistant {
  background-color: #f5f5f5;
  margin-right: auto;
}
</style> 