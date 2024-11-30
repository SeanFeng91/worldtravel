<template>
  <div class="travel-planner">
    <div class="layout">
      <!-- 左侧聊天区域 -->
      <div class="chat-section">
        <div class="chat-messages" ref="chatContainer">
          <div v-for="(msg, index) in messages" :key="index" 
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
import { marked } from 'marked'

const API_BASE = import.meta.env.VITE_WORKER_URL
const API_KEY = import.meta.env.VITE_API_KEY

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const currentPlan = ref(null)
const savedPlans = ref([])
const chatContainer = ref(null)
const currentMessage = ref('')

const handleStreamResponse = async (response, onUpdate) => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let currentResponse = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.response) {
              // 更新当前响应
              currentResponse += data.response;
              // 调用回调函数更新消息内容
              onUpdate(currentResponse);
            }
          } catch (e) {
            console.error('解析响应数据失败:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
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
    content: userInput.value.trim().replace(/\n+$/, '')
  };
  
  messages.value.push(userMessage);
  userInput.value = '';
  isLoading.value = true;
  
  // 创建 AI 回复消息
  const assistantMessage = {
    role: 'assistant',
    content: ''
  };
  messages.value.push(assistantMessage);

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

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            if (line.includes('[DONE]')) continue;
            
            const data = JSON.parse(line.slice(6));
            if (data.response !== undefined) {
              // 处理文本
              buffer += data.response;
              
              // 处理连续换行和句子结束后的换行
              const processedText = buffer
                .replace(/([。！？.!?])\n+/g, '$1\n') // 句子结束后最多一个换行
                .replace(/\n{3,}/g, '\n\n') // 多个连续换行替换为两个
                .replace(/([：])\n+/g, '$1') // 冒号后不换行
                .replace(/^([•\-])/gm, '\n$1'); // 列表项前添加换行
              
              assistantMessage.content = processedText;
              messages.value = [...messages.value];
              
              // 滚动到底部
              await nextTick();
              if (chatContainer.value) {
                chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
              }
            }
          } catch (e) {
            console.error('解析数据失败:', e);
          }
        }
      }
    }

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

// 添加消息样式
const messageClass = (role) => {
  return {
    message: true,
    [role]: true
  };
};

// 添加 marked 配置
const markedOptions = {
  breaks: true,
  gfm: true
};

// 添加消息内容的计算属性
const formattedContent = (content) => {
  if (!content) return '';
  try {
    // 配置 marked 选项
    marked.setOptions({
      gfm: true,
      breaks: false, // 禁用自动换行
      smartLists: true,
    });
    
    // 预处理文本
    const processedContent = content
      .replace(/\n{3,}/g, '\n\n') // 多个换行替换为两个
      .replace(/([：])\n/g, '$1') // 冒号后的换行删除
      .replace(/([。！？.!?])\n+/g, '$1\n') // 句号后最多一个换行
      .replace(/^[•\-]\s*/gm, '• '); // 统一列表符号格式
    
    return marked(processedContent);
  } catch (e) {
    console.error('Markdown 渲染错误:', e);
    return content;
  }
};

// 辅助函数：提取行程总览
function extractOverview(text) {
  const match = text.match(/\*\*行程总览\*\*:\s*([^\n]+)/);
  return match ? match[1].trim() : '';
}

// 监听消息变化，自动滚动到底部
watch(() => messages.value.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

// 加载已保存的计划
// const loadSavedPlans = async () => {
//   try {
//     const response = await fetch(`${API_BASE}/ai/travel-plans`, {
//       headers: { 'X-API-Key': API_KEY }
//     })
//     savedPlans.value = await response.json()
//   } catch (error) {
//     console.error('加载已保存计划失败:', error)
//   }
// }

// 加载特定计划
// const loadPlan = async (planId) => {
//   try {
//     const response = await fetch(`${API_BASE}/ai/travel-plans/${planId}`, {
//       headers: { 'X-API-Key': API_KEY }
//     })
//     currentPlan.value = await response.json()
//   } catch (error) {
//     console.error('加载计划详情失败:', error)
//   }
// }

// 删除计划
const deletePlan = async (planId) => {
  if (!confirm('确定要删除这个计划吗？')) return
  
  try {
    await fetch(`${API_BASE}/ai/travel-plans/${planId}`, {
      method: 'DELETE',
      headers: { 'X-API-Key': API_KEY }
    })
    // await loadSavedPlans()
    // if (currentPlan.value?.plan_id === planId) {
    //   currentPlan.value = null
    // }
  } catch (error) {
    console.error('删除计划失败:', error)
  }
}

// 聚焦特定日期的位置
const focusDay = (day) => {
  // 触发地图组件的聚焦方法
  // 需要在 TravelMap 组件中实现
}

// onMounted(() => {
//   loadSavedPlans()
// })

// 添加解析函数
const parseItinerary = (content) => {
  const itinerary = {
    locations: [],
    overview: '',
    days: []
  };

  try {
    // 匹配行程总览
    const overviewMatch = content.match(/行程总览[:：](.*?)(?=\n|$)/);
    if (overviewMatch) {
      itinerary.overview = overviewMatch[1].trim();
    }

    // 匹配每一天的行程
    const dayPattern = /第(\d+)天[^]*?(?=第\d+天|$)/g;
    const timePattern = /([上中下午晚]午|早上|凌晨).*?[（(](\d{1,2}:\d{2})[-~到至](\d{1,2}:\d{2})[）)]/g;
    const locationPattern = /([上中下午晚]午|早上|凌晨)[：:]\s*(.+?)\s*(?=[（(]|$)/g;

    let dayMatch;
    while ((dayMatch = dayPattern.exec(content)) !== null) {
      const dayContent = dayMatch[0];
      const dayNumber = parseInt(dayMatch[1]);
      const dayLocations = [];

      // 提取当天的所有地点和时间
      let timeMatch;
      while ((timeMatch = timePattern.exec(dayContent)) !== null) {
        const locationMatch = locationPattern.exec(dayContent);
        if (locationMatch) {
          dayLocations.push({
            period: timeMatch[1],
            location: locationMatch[2],
            startTime: timeMatch[2],
            endTime: timeMatch[3],
            day: dayNumber
          });
        }
      }

      itinerary.days.push({
        day: dayNumber,
        locations: dayLocations
      });

      // 将所有地点添加到总地点列表
      itinerary.locations.push(...dayLocations);
    }

  } catch (error) {
    console.error('解析行程失败:', error);
  }

  return itinerary;
};

// 修改消息处理逻辑
const handleMessage = async (content) => {
  // ... 其他代码保持不变 ...

  // 当收到完整消息时解析行程
  if (content.includes('行程总览') || content.includes('第1天')) {
    const parsedItinerary = parseItinerary(content);
    currentPlan.value = parsedItinerary;
    
    // 如果需要，可以在这里调用地图组件的方法来更新标记
    if (mapRef.value) {
      mapRef.value.updateMarkers(parsedItinerary.locations);
    }
  }
};
</script>

<style scoped>
.travel-planner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: calc(100vh - 40px);
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.chat-section {
  width: 100%;
  height: 45%;
  min-height: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.chat-messages {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
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
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.input-area textarea {
  height: 40px;
  max-height: 80px;
  flex: 1;
  min-height: 60px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  resize: vertical;
}

.map-section {
  width: 100%;
  height: 50%;
  min-height: 400px;
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
  white-space: pre-line;
  word-break: break-word;
  line-height: 1.6;
  padding: 8px;
}

.message-content :deep(ul) {
  margin: 0.3em 0;
  padding-left: 1em;
  list-style-type: none;
}

.message-content :deep(li) {
  margin: 0.2em 0;
  padding-left: 0.5em;
}

.message-content :deep(p) {
  margin: 0.2em 0;
}

/* 移除标题的额外边距 */
.message-content :deep(h1),
.message-content :deep(h2),
.message-content :deep(h3) {
  margin: 0.5em 0 0.3em 0;
}

/* 调整列表项的样式 */
.message-content :deep(ul li::before) {
  content: "•";
  color: var(--vp-c-brand);
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

/* 确保中文文本正常显示 */
.message-content :deep(*) {
  white-space: normal;
}

/* 确保地图容器占满宽度 */
:deep(.mapboxgl-map) {
  width: 100% !important;
  height: 100% !important;
}
</style> 

