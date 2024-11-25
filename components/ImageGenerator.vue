<template>
  <div class="image-generator">
    <input 
      v-model="prompt" 
      placeholder="输入你想要的图片描述"
      class="prompt-input"
      :disabled="loading"
    />
    <button 
      @click="generateImage" 
      :disabled="loading"
    >
      {{ loading ? '生成中...' : '生成图片' }}
    </button>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <img v-if="imageUrl" :src="imageUrl" alt="Generated Image" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('')
const prompt = ref('cyberpunk cat')
const loading = ref(false)
const error = ref('')
const WORKER_URL = 'https://cloudflare-ai.fengyx91.workers.dev'

const generateImage = async () => {
  if (!prompt.value.trim()) {
    error.value = '请输入提示词'
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value.trim(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '生成图片失败')
    }

    const blob = await response.blob()
    imageUrl.value = URL.createObjectURL(blob)
  } catch (err) {
    error.value = err.message || '生成图片时发生错误'
    console.error('Error generating image:', err)
  } finally {
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
}

.prompt-input {
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

img {
  max-width: 100%;
  height: auto;
}
</style> 