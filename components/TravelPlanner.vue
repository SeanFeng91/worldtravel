<template>
  <div class="travel-planner">
    <div class="layout">
      <!-- 左侧聊天区域 -->
      <div class="chat-section">
        <div class="chat-messages" ref="chatContainer">
          <div v-for="(msg, index) in messages" :key="index" 
               :class="['message', msg.role]">
            <div class="message-content" v-html="msg.content">
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

      <!-- 右侧地图和计划展示区域 -->
      <div class="map-section">
        <TravelMap 
          :travel-plan="currentPlan"
          :is-loading="isLoading"
        />
        
        <div v-if="currentPlan" class="plan-details">
          <h3>{{ currentPlan.overview }}</h3>
          <div class="plan-days">
            <div v-for="day in currentPlan.days" 
                 :key="day.day"
                 class="day-card"
                 @click="focusDay(day)">
              <h4>第 {{ day.day }} 天</h4>
              <div class="locations">
                <div v-for="loc in day.locations" 
                     :key="loc.name"
                     class="location">
                  <span class="time">{{ loc.arrival_time }}</span>
                  <span class="name">{{ loc.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 已保存的计划列表 -->
    <div class="saved-plans">
      <h3>已保存的计划</h3>
      <div class="plans-list">
        <div v-for="plan in savedPlans" 
             :key="plan.id"
             class="plan-item"
             @click="loadPlan(plan.id)">
          <div class="plan-info">
            <h4>{{ plan.overview }}</h4>
            <p>{{ plan.created_at }} · {{ plan.days }}天</p>
          </div>
          <button @click.stop="deletePlan(plan.id)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import TravelMap from './TravelMap.vue'
import { useData } from 'vitepress'

const API_BASE = import.meta.env.VITE_WORKER_URL
const API_KEY = import.meta.env.VITE_API_KEY

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const currentPlan = ref(null)
const savedPlans = ref([])
const chatContainer = ref(null)
const currentMessage = ref('')

const handleStream = async (response) => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  // 确保有一个助手消息
  if (messages.value[messages.value.length - 1].role !== 'assistant') {
    messages.value.push({
      role: 'assistant',
      content: ''
    });
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6); // 移除 'data: ' 前缀
        
        try {
          const parsed = JSON.parse(data);
          if (parsed.response) {
            // 处理普通文本响应
            messages.value[messages.value.length - 1].content += parsed.response;
          }
        } catch (e) {
          // 如果解析失败，尝试提取完整的 travel_plan JSON
          if (data.includes('"type":"travel_plan"')) {
            try {
              const planJson = data.match(/\{[\s\S]*"type"\s*:\s*"travel_plan"[\s\S]*\}/);
              if (planJson) {
                const plan = JSON.parse(planJson[0]);
                currentPlan.value = plan;
                const markdownText = formatTravelPlan(plan);
                messages.value[messages.value.length - 1].content = markdownText;
              }
            } catch (err) {
              console.log('等待完整的旅行计划数据...');
            }
          }
        }
      }
    }
    await nextTick();
  }
};

// 格式化旅行计划为 Markdown
const formatTravelPlan = (plan) => {
  return `
# ${plan.overview}

${plan.days.map(day => `
## 第 ${day.day} 天 (${day.date})

${day.locations.map(loc => `
### ${loc.name}
- ⏰ **时间**：${loc.arrival_time} - ${loc.departure_time}
- 📍 **行程**：${loc.description}
- 🚗 **交通**：${loc.transportation}
${loc.cost_estimate ? `- 💰 **预算**：${loc.cost_estimate}` : ''}
`).join('\n')}

${day.daily_notes ? `> 📌 **今日提醒**：${day.daily_notes}` : ''}
`).join('\n')}

${plan.total_cost_estimate ? `## 总体信息\n- 💰 **总预算**：${plan.total_cost_estimate}\n` : ''}
${plan.travel_tips ? `\n## 旅行建议\n${plan.travel_tips.map(tip => `- ✨ ${tip}`).join('\n')}` : ''}
`.trim();
};

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  const userMessage = {
    role: 'user',
    content: userInput.value.trim()
  };
  
  messages.value.push(userMessage);
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
      throw new Error(`请求失败: ${response.status}`);
    }

    await handleStream(response);
  } catch (error) {
    console.error('发送消息失败:', error);
    messages.value.push({
      role: 'system',
      content: '发生错误：' + error.message
    });
  } finally {
    isLoading.value = false;
  }
};

// 监听消息变化，自动滚动到底部
watch(() => messages.value.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

// 加载已保存的计划
const loadSavedPlans = async () => {
  try {
    const response = await fetch(`${API_BASE}/ai/travel-plans`, {
      headers: { 'X-API-Key': API_KEY }
    })
    savedPlans.value = await response.json()
  } catch (error) {
    console.error('加载已保存计划失败:', error)
  }
}

// 加载特定计划
const loadPlan = async (planId) => {
  try {
    const response = await fetch(`${API_BASE}/ai/travel-plans/${planId}`, {
      headers: { 'X-API-Key': API_KEY }
    })
    currentPlan.value = await response.json()
  } catch (error) {
    console.error('加载计划详情失败:', error)
  }
}

// 删除计划
const deletePlan = async (planId) => {
  if (!confirm('确定要删除这个计划吗？')) return
  
  try {
    await fetch(`${API_BASE}/ai/travel-plans/${planId}`, {
      method: 'DELETE',
      headers: { 'X-API-Key': API_KEY }
    })
    await loadSavedPlans()
    if (currentPlan.value?.plan_id === planId) {
      currentPlan.value = null
    }
  } catch (error) {
    console.error('删除计划失败:', error)
  }
}

// 聚焦特定日期的位置
const focusDay = (day) => {
  // 触发地图组件的聚焦方法
  // 需要在 TravelMap 组件中实现
}

onMounted(() => {
  loadSavedPlans()
})
</script>

<style scoped>
.travel-planner {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.layout {
  display: flex;
  gap: 20px;
  height: calc(100vh - 200px);
  width: 100%;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  min-width: 400px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
}

.message.user {
  background: var(--vp-c-bg-soft);
  margin-left: 20%;
}

.message.assistant {
  background: var(--vp-c-brand-soft);
  margin-right: 20%;
  word-wrap: break-word;
}

.input-area {
  padding: 20px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 10px;
}

.input-area textarea {
  flex: 1;
  min-height: 60px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  resize: none;
}

.map-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
}

.plan-details {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.day-card {
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
}

.day-card:hover {
  background: var(--vp-c-bg-soft);
}

.saved-plans {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 20px;
}

.plans-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 10px 0;
}

.plan-item {
  flex: 0 0 300px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
}

.plan-item:hover {
  background: var(--vp-c-bg-soft);
}

button {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message-content {
  line-height: 1.6;
}

.message-content :deep(h1) {
  font-size: 1.8em;
  margin-bottom: 1em;
  color: var(--vp-c-brand);
}

.message-content :deep(h2) {
  font-size: 1.5em;
  margin: 1em 0;
  color: var(--vp-c-brand);
}

.message-content :deep(h3) {
  font-size: 1.2em;
  margin: 0.8em 0;
}

.message-content :deep(ul) {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.message-content :deep(blockquote) {
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.5em 1em;
  margin: 1em 0;
  background: var(--vp-c-bg-soft);
}

.message-content :deep(p) {
  margin: 0.5em 0;
}

.message-content :deep(strong) {
  color: var(--vp-c-brand);
}
</style> 