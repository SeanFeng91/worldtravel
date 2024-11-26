<template>
  <div class="chat-dialog">
    <div class="messages" ref="messagesRef">
      <template v-for="(msg, index) in messages" :key="index">
        <div v-if="msg && msg.role" :class="msg.role">
          <strong>{{ msg.role === 'user' ? '你：' : msg.role === 'assistant' ? 'AI：' : '系统：' }}</strong>
          <div class="message-content" v-if="msg.content" v-html="renderMarkdown(msg.content)"></div>
          <span v-else>...</span>
        </div>
      </template>
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
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

const renderMarkdown = (content) => {
  try {
    return md.render(content)
  } catch (e) {
    console.error('Markdown 渲染错误:', e)
    return content
  }
}

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
            const data = line.slice(5).trim() // 移除 'data: ' 前缀并清理空白
            
            // 跳过 [DONE] 标记
            if (data === '[DONE]') {
              console.log('收到完成标记')
              continue
            }
            
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
              console.log('跳过非 JSON 数据:', data)
              continue
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
  height: calc(100% - 20px);
  max-height: 450px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-content {
  display: inline-block;
  margin-left: 4px;
}

.user, .assistant, .system {
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 85%;
  word-break: break-word;
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

/* Markdown 样式调整 */
:deep(p) {
  margin: 0;
  display: inline;
}

:deep(p + p) {
  margin-top: 0.5em;
  display: block;
}

:deep(ul), :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

:deep(li + li) {
  margin-top: 0.25em;
}

/* 滚动条样式 */
.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 输入区域样式 */
.input-area {
  padding: 10px;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 