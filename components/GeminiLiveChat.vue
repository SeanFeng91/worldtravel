<template>
  <div class="gemini-live-chat">
    <div class="video-container" v-if="showVideo">
      <video ref="videoRef" autoplay playsinline></video>
    </div>
    
    <div class="chat-container">
      <div class="chat-history" ref="chatHistory">
        <div v-for="(msg, index) in chatHistory" :key="index" 
             :class="['message', msg.role]">
          {{ msg.content }}
        </div>
      </div>
      
      <div class="input-container">
        <button @click="toggleAudio" :class="{ active: isListening }">
          {{ isListening ? '停止录音' : '开始录音' }}
        </button>
        <input v-model="userInput" 
               @keyup.enter="sendMessage"
               placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

// 首先定义 Queue 类
class Queue {
  constructor(maxSize = Infinity) {
    this.items = []
    this.maxSize = maxSize
  }
  
  async put(item) {
    while (this.items.length >= this.maxSize) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    this.items.push(item)
  }
  
  async get() {
    while (this.items.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return this.items.shift()
  }
  
  empty() {
    return this.items.length === 0
  }
}

// 常量定义
const MODEL = "models/gemini-2.0-flash-exp"
const CONFIG = {
  generation_config: { 
    response_modalities: ["AUDIO"] 
  }
}

const CHUNK_SIZE = 1024
const SEND_SAMPLE_RATE = 16000
const RECEIVE_SAMPLE_RATE = 24000

// 基础状态
const videoRef = ref(null)
const chatHistory = ref([])
const userInput = ref('')
const isListening = ref(false)
const showVideo = ref(true)

// 媒体相关
const mediaStream = ref(null)
const audioContext = ref(null)
const mediaRecorder = ref(null)
// 现在 Queue 已经定义，可以安全使用
const audioQueue = ref(new Queue())
const outQueue = ref(new Queue(5)) // maxsize: 5

// Gemini 客户端
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiVersion: 'v1alpha'
})

// 初始化视频
const initializeVideo = async () => {
  try {
    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream.value
      startVideoFrames()
    }
  } catch (error) {
    console.error('无法访问摄像头:', error)
    showVideo.value = false
  }
}

// 处理视频帧
const processVideoFrame = async () => {
  if (!videoRef.value) return null
  
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = videoRef.value.videoWidth
  canvas.height = videoRef.value.videoHeight
  
  context.drawImage(videoRef.value, 0, 0)
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve({
          mime_type: 'image/jpeg',
          data: reader.result.split(',')[1]
        })
      }
      reader.readAsDataURL(blob)
    }, 'image/jpeg')
  })
}

// 开始发送视频帧
const startVideoFrames = async () => {
  while (showVideo.value) {
    const frame = await processVideoFrame()
    if (frame) {
      await outQueue.value.put(frame)
    }
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒间隔
  }
}

// 音频处理
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)
    const processor = audioContext.createScriptProcessor(CHUNK_SIZE, 1, 1)
    
    processor.onaudioprocess = async (e) => {
      const audioData = e.inputBuffer.getChannelData(0)
      await outQueue.value.put({
        data: audioData,
        mime_type: 'audio/pcm'
      })
    }
    
    source.connect(processor)
    processor.connect(audioContext.destination)
    
    isListening.value = true
  } catch (error) {
    console.error('录音失败:', error)
  }
}

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    mediaRecorder.value.stream.getTracks().forEach(track => track.stop())
  }
  isListening.value = false
}

const toggleAudio = () => {
  if (isListening.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

// 发送消息
const sendMessage = async () => {
  if (!userInput.value) return
  
  try {
    const session = await genAI.live.connect({
      model: MODEL,
      config: CONFIG
    })
    
    // 发送文本消息
    await session.send(userInput.value, true)
    chatHistory.value.push({
      role: 'user',
      content: userInput.value
    })
    userInput.value = ''
    
    // 接收响应
    for await (const response of session.receive()) {
      if (response.text) {
        chatHistory.value.push({
          role: 'assistant',
          content: response.text
        })
      }
      if (response.data) {
        await audioQueue.value.put(response.data)
        playAudioResponse(response.data)
      }
    }
    
    session.close()
  } catch (error) {
    console.error('发送消息失败:', error)
  }
}

// 播放音频响应
const playAudioResponse = async (audioData) => {
  try {
    const audioContext = new AudioContext()
    const audioBuffer = await audioContext.decodeAudioData(audioData)
    const source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.destination)
    source.start(0)
  } catch (error) {
    console.error('播放音频失败:', error)
  }
}

// 生命周期钩子
onMounted(async () => {
  await initializeVideo()
})

onUnmounted(() => {
  showVideo.value = false
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop())
  }
  stopRecording()
})
</script>

<style scoped>
.gemini-live-chat {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.video-container {
  width: 320px;
  height: 240px;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.message {
  margin: 8px 0;
  padding: 8px;
  border-radius: 4px;
}

.message.user {
  background: #e3f2fd;
  margin-left: 20%;
}

.message.assistant {
  background: #f5f5f5;
  margin-right: 20%;
}

.input-container {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

button.active {
  background: #d32f2f;
}
</style> 