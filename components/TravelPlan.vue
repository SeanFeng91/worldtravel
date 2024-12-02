<template>
  <div class="plan-container">
    <div v-if="travelPlan" class="plan-details">
      <h3>行程总览</h3>
      <p class="overview">{{ travelPlan.overview }}</p>
      
      <div class="plan-days">
        <div v-for="day in travelPlan.days" 
             :key="day.day"
             class="day-card"
             @click="$emit('dayFocused', day)">
          <h4>第 {{ day.day }} 天</h4>
          <div class="locations">
            <div v-for="loc in day.locations" 
                 :key="loc.name"
                 class="location">
              <div class="time">
                <span class="period">{{ loc.period }}</span>
                <span class="hours">{{ loc.arrival_time }} - {{ loc.departure_time }}</span>
              </div>
              <div class="name">{{ loc.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      请在聊天框中输入您的旅行需求...
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  travelPlan: {
    type: Object,
    default: null,
    validator(value) {
      if (!value) return true;
      
      const valid = value.overview && Array.isArray(value.days);
      if (!valid) {
        console.warn('无效的行程计划数据:', value);
      }
      return valid;
    }
  }
});

// 添加 watch 来监控数据变化
watch(() => props.travelPlan, (newPlan) => {
  console.log('TravelPlan 收到新的计划数据:', newPlan);
}, { deep: true });
</script>

<style scoped>
.plan-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.plan-details {
  height: 100%;
}

h3 {
  margin: 0 0 20px 0;
  font-size: 1.5em;
  color: var(--vp-c-text-1);
}

.plan-days {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.day-card {
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.day-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h4 {
  margin: 0 0 12px 0;
  font-size: 1.2em;
  color: var(--vp-c-text-1);
}

.locations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
}

.time {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.name {
  flex: 1;
  color: var(--vp-c-text-1);
}

/* 滚动条样式 */
.plan-container::-webkit-scrollbar {
  width: 6px;
}

.plan-container::-webkit-scrollbar-track {
  background: transparent;
}

.plan-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.plan-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--vp-c-text-3);
}

/* 暗色主题适配 */
:deep(.dark) .day-card {
  background-color: var(--vp-c-bg-mute);
}

:deep(.dark) .location {
  background-color: var(--vp-c-bg-soft);
}

.overview {
  margin-bottom: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}

.time {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.period {
  font-weight: 500;
  color: var(--vp-c-brand);
}

.hours {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 0.9em;
}
</style> 