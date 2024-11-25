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
const WORKER_URL = 'https://cloudflare-ai.fengyx91.workers.dev/' // 替换为您的 Worker URL

const generateImage = async () => {
  if (!prompt.value.trim()) {
    error.value = '请输入提示词'
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    // 使用 GET 请求方式
    const encodedPrompt = encodeURIComponent(prompt.value.trim())
    const response = await fetch(`${WORKER_URL}?prompt=${encodedPrompt}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '生成图片失败')
    }

    const blob = await response.blob()
    // 如果之前有图片 URL，先释放它
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = URL.createObjectURL(blob)
  } catch (err) {
    error.value = err.message || '生成图片时发生错误'
    console.error('Error generating image:', err)
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