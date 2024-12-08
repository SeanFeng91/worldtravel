<template>
  <div class="travel-ai-container">
    <div class="chat-container">
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['message', message.role]">
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
      <div class="input-container">
        <textarea 
          v-model="userInput"
          @keydown.enter.prevent="sendMessage"
          placeholder="询问旅游路线规划、景点推荐等..."
          rows="3"
        ></textarea>
        <button @click="sendMessage" :disabled="isLoading">
          {{ isLoading ? '思考中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const messages = ref([
  { role: 'assistant', content: '你好！我是你的旅行规划助手。我可以帮你：\n1. 规划旅行路线\n2. 推荐景点美食\n3. 提供交通建议\n4. 估算旅行预算\n请告诉我你想去哪里？' }
])
const userInput = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)

// 调用 Cloudflare Worker AI
const askAI = async (prompt) => {
  try {
    const response = await fetch('你的Worker URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: '你是一个专业的旅行规划助手，可以帮助用户规划旅行路线、推荐景点和美食、提供交通建议等。请用中文回答。'
          },
          ...messages.value.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`AI 服务响应错误: ${response.status}`)
    }

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return data.response
  } catch (error) {
    console.error('AI 请求错误:', error)
    throw error
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userMessage = userInput.value.trim()
  messages.value.push({ role: 'user', content: userMessage })
  userInput.value = ''
  isLoading.value = true

  try {
    const aiResponse = await askAI(userMessage)
    messages.value.push({ role: 'assistant', content: aiResponse })
  } catch (error) {
    messages.value.push({ 
      role: 'assistant', 
      content: '抱歉，我现在遇到了一些问题。请稍后再试。' 
    })
  } finally {
    isLoading.value = false
  }
}

// 自动滚动到最新消息
watch(messages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}, { deep: true })
</script>

<style scoped>
.travel-ai-container {
  margin: 20px 0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
}

.message.user {
  margin-left: auto;
}

.message-content {
  padding: 10px 15px;
  border-radius: 8px;
  white-space: pre-wrap;
}

.user .message-content {
  background-color: #007AFF;
  color: white;
}

.assistant .message-content {
  background-color: #f0f0f0;
  color: #333;
}

.input-container {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
}

button {
  padding: 0 20px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 80px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style> 