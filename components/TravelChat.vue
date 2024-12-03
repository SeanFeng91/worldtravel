<template>
  <div class="chat-section">
    <div class="chat-messages" ref="chatContainer">
      <div v-for="(msg, index) in messages" 
           :key="index" 
           :class="['message', msg.role]">
        <div class="message-content" v-html="formattedContent(msg.content)">
        </div>
      </div>
    </div>
    
    <div class="input-area">
      <textarea
        v-model="userInput"
        @keyup.enter.exact="sendMessage"
        placeholder="描述您的旅行计划，例如：帮我规划一个亚美尼亚7天的旅行计划..."
        :disabled="isLoading"
      ></textarea>
      <button @click="sendMessage" :disabled="isLoading">
        {{ isLoading ? '生成中...' : '发送' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { marked } from 'marked'

const API_BASE = import.meta.env.VITE_WORKER_URL
const API_KEY = import.meta.env.VITE_API_KEY

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const chatContainer = ref(null)

// 定义 emit
const emit = defineEmits(['planUpdated'])

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  const userMessage = {
    role: 'user',
    content: userInput.value.trim()
  };
  
  messages.value.push(userMessage);
  const originalInput = userInput.value;
  userInput.value = '';
  isLoading.value = true;

  try {
    const response = await fetch(`${API_BASE}/ai/travel-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({ messages: messages.value })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const assistantMessage = {
      role: 'assistant',
      content: ''
    };
    messages.value.push(assistantMessage);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.trim()) continue; // 跳过空行
        
        if (line.startsWith('data: ')) {
          const data = line.slice(5).trim();
          
          // 如果是结束标记，解析完整消息
          if (data === '[DONE]') {
            console.log('收到完整消息，内容:', assistantMessage.content);
            if (assistantMessage.content.includes('行程总览')) {
              try {
                console.log('开始解析行程计划');
                const plan = parseTravelPlan(assistantMessage.content);
                if (plan) {
                  console.log('解析成功，发送计划更新:', plan);
                  emit('planUpdated', plan);
                } else {
                  console.warn('解析结果为空');
                }
              } catch (e) {
                console.error('解析旅行计划失败:', e);
              }
            } else {
              console.log('消息中未包含行程总览');
            }
            continue;
          } else {
            // 尝试解析非结束标记的数据
            try {
              const parsedData = JSON.parse(data);
              if (parsedData.response) {
                assistantMessage.content += parsedData.response;
              }
            } catch (e) {
              // 忽略 [DONE] 的解析错误
              if (!data.includes('[DONE]')) {
                console.error('解析数据块失败:', e, data);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('发送消息失败:', error);
    userInput.value = originalInput;
    messages.value.pop();
    messages.value.push({
      role: 'system',
      content: `发生错误：${error.message}。请稍后重试。`
    });
  } finally {
    isLoading.value = false;
  }
};

// 添加解析旅行计划的函数
const parseTravelPlan = (content) => {
  try {
    console.log('开始解析行程内容:', content);

    // 提取行程总览
    const planMatch = content.match(/\*\*行程总览\*\*:\s*(.*?)(?=\n\n\*\*第|$)/);
    console.log('行程总览匹配结果:', planMatch);
    
    if (!planMatch) {
      console.warn('未找到行程总览部分');
      return null;
    }

    const overview = planMatch[1].trim();
    console.log('提取的行程总览:', overview);
    
    // 提取每天的行程
    const daysPattern = /\*\*第(\d+)天\*\*\n([\s\S]*?)(?=\*\*第\d+天\*\*|\*\*总预算估算|$)/g;
    const days = [];
    let locations = [];
    
    let match;
    let daysFound = 0;
    while ((match = daysPattern.exec(content)) !== null) {
      daysFound++;
      const dayNumber = parseInt(match[1]);
      const dayContent = match[2];
      
      console.log(`解析第${dayNumber}天的内容:`, dayContent);
      
      // 提取地点和时间
      const locationPattern = /\*\*([上中下]午|早上|晚上|夜间)\*\*:\s*([^（(]+)[（(](\d{1,2}:\d{2})-(\d{1,2}:\d{2})[）)]/g;
      const dayLocations = [];
      
      let locMatch;
      let locationsFound = 0;
      while ((locMatch = locationPattern.exec(dayContent)) !== null) {
        locationsFound++;
        const locationName = locMatch[2].trim();
        
        // 提取描述、交通和费用信息
        const descPattern = new RegExp(`\\*\\*描述\\*\\*:\\s*([^\\n]+)`, 'i');
        const transportPattern = new RegExp(`\\*\\*交通\\*\\*:\\s*([^\\n]+)`, 'i');
        const costPattern = new RegExp(`\\*\\*费用\\*\\*:\\s*([^\\n]+)`, 'i');
        
        const locationBlock = dayContent.split('-').find(block => block.includes(locationName));
        
        const location = {
          period: locMatch[1],
          name: locationName,
          arrival_time: locMatch[3],
          departure_time: locMatch[4],
          description: locationBlock?.match(descPattern)?.[1]?.trim() || '',
          transport: locationBlock?.match(transportPattern)?.[1]?.trim() || '',
          cost: locationBlock?.match(costPattern)?.[1]?.trim() || ''
        };
        
        console.log(`找到地点:`, location);
        dayLocations.push(location);
        locations.push({
          ...location,
          day: dayNumber
        });
      }
      
      if (locationsFound === 0) {
        console.warn(`第${dayNumber}天未找到任何地点信息`);
      }
      
      days.push({
        day: dayNumber,
        locations: dayLocations
      });
    }
    
    if (daysFound === 0) {
      console.warn('未找到任何天数信息');
      return null;
    }

    // 提取总预算和旅行建议
    const budgetMatch = content.match(/\*\*总预算估算\*\*:\s*(.*?)(?=\n|$)/);
    const tipsMatch = content.match(/\*\*旅行建议\*\*:\n([\s\S]*?)$/);

    const plan = {
      overview,
      days,
      locations,
      budget: budgetMatch ? budgetMatch[1].trim() : '',
      tips: tipsMatch ? tipsMatch[1].split('\n').map(tip => tip.replace(/^-\s*/, '').trim()).filter(Boolean) : []
    };
    
    console.log('解析完成的行程计划:', plan);
    return plan;

  } catch (error) {
    console.error('解析行程计划失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('原始内容:', content);
    return null;
  }
};

// 监听消息变化,自动滚动
watch(() => messages.value.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
});

const formattedContent = (content) => {
  if (!content) return '';
  try {
    return marked(content);
  } catch (e) {
    console.error('Markdown 渲染错误:', e);
    return content;
  }
};
</script>

<style scoped>
.chat-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  scroll-behavior: smooth;
}

.message {
  margin-bottom: 16px;
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
}

.message.user {
  margin-left: auto;
  background-color: var(--vp-c-brand);
  color: white;
}

.message.assistant {
  margin-right: auto;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.message.system {
  margin: 0 auto;
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-dark);
  font-size: 0.9em;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
}

.message-content :deep(p) {
  margin: 0.5em 0;
}

.message-content :deep(p:first-child) {
  margin-top: 0;
}

.message-content :deep(p:last-child) {
  margin-bottom: 0;
}

.input-area {
  padding: 16px;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 12px;
}

textarea {
  flex: 1;
  min-height: 60px;
  max-height: 120px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  resize: vertical;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color 0.2s;
}

textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

button {
  align-self: flex-end;
  padding: 8px 20px;
  height: 40px;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--vp-c-brand-dark);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: var(--vp-c-text-3);
}

/* 暗色主题适配 */
:deep(.dark) .message.assistant {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

:deep(.dark) textarea {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
</style>