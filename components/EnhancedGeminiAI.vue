<template>
  <div class="enhanced-gemini">
    <!-- 模式选择器 -->
    <div class="mode-selector">
      <button 
        v-for="mode in modes" 
        :key="mode.value"
        :class="['mode-btn', { active: currentMode === mode.value }]"
        @click="currentMode = mode.value"
      >
        {{ mode.label }}
      </button>
    </div>

    <!-- 主要交互区域 -->
    <div class="interaction-area">
      <!-- 文本聊天模式 -->
      <div v-if="currentMode === 'chat'" class="chat-mode">
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
            <button @click="startVoiceInput" :disabled="isLoading">
              语音输入
            </button>
          </div>
        </div>
      </div>

      <!-- 图片生成模式 -->
      <div v-if="currentMode === 'image'" class="image-mode">
        <textarea 
          v-model="imagePrompt"
          placeholder="描述您想要生成的图片..."
        ></textarea>
        <div class="image-controls">
          <button @click="generateImage" :disabled="isGeneratingImage">
            {{ isGeneratingImage ? '生成中...' : '生成图片' }}
          </button>
          <div class="image-options">
            <label>
              <input type="checkbox" v-model="includeNegativePrompt">
              添加反向提示词
            </label>
            <input 
              v-if="includeNegativePrompt"
              v-model="negativePrompt"
              placeholder="输入不想要的元素..."
            >
          </div>
        </div>
        <div class="generated-images">
          <div v-for="(img, index) in generatedImages" :key="index" class="image-item">
            <img :src="img.url" :alt="img.prompt">
            <div class="image-actions">
              <button @click="upscaleImage(img)">放大</button>
              <button @click="editImage(img)">编辑</button>
              <button @click="downloadImage(img)">下载</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 文件处理模式 -->
      <div v-if="currentMode === 'file'" class="file-mode">
        <div class="file-upload">
          <input 
            type="file" 
            @change="handleFileUpload"
            accept=".pdf,.txt,.doc,.docx"
          >
          <div class="uploaded-files">
            <div v-for="file in uploadedFiles" :key="file.name" class="file-item">
              {{ file.name }}
              <button @click="analyzeFile(file)">分析</button>
              <button @click="deleteFile(file)">删除</button>
            </div>
          </div>
        </div>
        <div class="file-analysis" v-if="fileAnalysis">
          <h3>文件分析结果</h3>
          <div v-html="renderMarkdown(fileAnalysis)"></div>
        </div>
      </div>
    </div>

    <!-- 高级设置面板 -->
    <div class="settings-panel" v-if="showSettings">
      <h3>高级设置</h3>
      <div class="setting-item">
        <label>温度</label>
        <input type="range" v-model="settings.temperature" min="0" max="1" step="0.1">
        <span>{{ settings.temperature }}</span>
      </div>
      <div class="setting-item">
        <label>最大输出长度</label>
        <input type="number" v-model="settings.maxOutputTokens">
      </div>
      <div class="setting-item">
        <label>安全设置</label>
        <select v-model="settings.safetyLevel">
          <option value="BLOCK_NONE">无限制</option>
          <option value="BLOCK_MEDIUM">中等</option>
          <option value="BLOCK_HIGH">严格</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// 状态变量
const currentMode = ref('chat')
const userInput = ref('')
const imagePrompt = ref('')
const negativePrompt = ref('')
const includeNegativePrompt = ref(false)
const chatHistory = ref([])
const generatedImages = ref([])
const uploadedFiles = ref([])
const isLoading = ref(false)
const isGeneratingImage = ref(false)
const fileAnalysis = ref('')
const showSettings = ref(false)

// 模式选项
const modes = [
  { label: '智能对话', value: 'chat' },
  { label: '图片生成', value: 'image' },
  { label: '文件分析', value: 'file' }
]

// 设置选项
const settings = ref({
  temperature: 0.7,
  maxOutputTokens: 2048
})

// 安全设置选项
const safetyLevels = [
  { label: '无限制', value: 'BLOCK_NONE' },
  { label: '中等', value: 'BLOCK_MEDIUM' },
  { label: '严格', value: 'BLOCK_HIGH' }
]

// 处理文本对话
const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  isLoading.value = true
  const prompt = userInput.value
  userInput.value = ''

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: settings.value.temperature,
        maxOutputTokens: settings.value.maxOutputTokens,
      }
    })

    chatHistory.value.push({
      role: 'user',
      content: prompt
    })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    chatHistory.value.push({
      role: 'assistant',
      content: text
    })
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

// 生成图片
const generateImage = async () => {
  if (!imagePrompt.value.trim() || isGeneratingImage.value) return
  
  isGeneratingImage.value = true
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })
    const prompt = {
      text: imagePrompt.value,
      ...(includeNegativePrompt.value && negativePrompt.value 
          ? { negative_prompt: negativePrompt.value } 
          : {})
    }

    const result = await model.generateContent(prompt)
    const response = await result.response
    
    generatedImages.value.push({
      url: response.text(),
      prompt: imagePrompt.value
    })
  } catch (error) {
    console.error('生成图片失败:', error)
  } finally {
    isGeneratingImage.value = false
  }
}

// 图片相关的辅助函数
const upscaleImage = async (img) => {
  // 实现图片放大功能
  console.log('放大图片:', img)
}

const editImage = async (img) => {
  // 实现图片编辑功能
  console.log('编辑图片:', img)
}

const downloadImage = (img) => {
  // 实现图片下载功能
  const a = document.createElement('a')
  a.href = img.url
  a.download = `generated-image-${Date.now()}.png`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 文件处理相关函数
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    uploadedFiles.value.push({
      name: file.name,
      size: file.size,
      type: file.type
    })
  } catch (error) {
    console.error('上传文件失败:', error)
  }
}

const analyzeFile = async (file) => {
  // 实现文件分析功能
  console.log('分析文件:', file)
}

const deleteFile = (file) => {
  const index = uploadedFiles.value.findIndex(f => f.name === file.name)
  if (index > -1) {
    uploadedFiles.value.splice(index, 1)
  }
}

// 工具函数
const renderMarkdown = (text) => {
  try {
    return md.render(text)
  } catch (e) {
    return text
  }
}
</script>

<style scoped>
.enhanced-gemini {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.mode-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.mode-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #f0f0f0;
}

.mode-btn.active {
  background: #007AFF;
  color: white;
}

.interaction-area {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  min-height: 400px;
}

.chat-history {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
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

.generated-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.image-item img {
  width: 100%;
  border-radius: 4px;
}

.settings-panel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.setting-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style> 