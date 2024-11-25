<template>
  <div class="image-generator">
    <input 
      v-model="prompt" 
      placeholder="输入你想要的图片描述"
      class="prompt-input"
      :disabled="loading"
      @keyup.enter="generateImage"
    />
    <button 
      @click="generateImage" 
      :disabled="loading"
      class="generate-button"
    >
      {{ loading ? '生成中...' : '生成图片' }}
    </button>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="loading" class="loading-message">
      图片生成中，请稍候...
    </div>
    <img 
      v-if="imageUrl" 
      :src="imageUrl" 
      alt="Generated Image" 
      class="generated-image"
      @load="loading = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('')
const prompt = ref('')
const loading = ref(false)
const error = ref('')
const API_KEY = import.meta.env.VITE_API_KEY
const WORKER_URL = import.meta.env.VITE_WORKER_URL

const generateImage = async () => {
  if (!prompt.value.trim()) {
    error.value = '请输入提示词'
    return
  } 

  loading.value = true
  error.value = ''
  
  try {
    const encodedPrompt = encodeURIComponent(prompt.value.trim())
    const url = `${WORKER_URL}?prompt=${encodedPrompt}`
    
    console.log('请求 URL:', url)
    console.log('API Key:', API_KEY)

    const response = await fetch(url, {
      headers: {
        'X-API-Key': API_KEY,
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '请求失败')
    }

    const blob = await response.blob()
    // 如果之前有图片 URL，先释放它
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = URL.createObjectURL(blob)
  } catch (err) {
    console.error('完整错误信息:', err)
    error.value = err.message || '生成图片时发生错误'
    loading.value = false
  }
}
</script>

<style scoped>
.image-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.prompt-input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.generate-button {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.generate-button:hover:not(:disabled) {
  background-color: #45a049;
}

.generate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin: 10px 0;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.loading-message {
  color: #666;
  margin: 10px 0;
}

.generated-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 480px) {
  .prompt-input {
    max-width: 100%;
  }
}
</style> 