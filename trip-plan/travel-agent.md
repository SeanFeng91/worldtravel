---
title: 旅行规划助手
---

<script setup>
import { ref, onMounted } from 'vue'
import TravelChat from '../components/TravelChat.vue'
import TravelMap from '../components/TravelMap.vue'
import TravelPlan from '../components/TravelPlan.vue'

const currentPlan = ref(null)
const isLoading = ref(false)

const handlePlanUpdate = (plan) => {
  console.log('收到计划更新:', plan);
  currentPlan.value = plan;
}

const handleDayFocus = (day) => {
  console.log('聚焦天数:', day);
}
</script>

# 旅行规划助手

<div class="travel-container">
  <!-- 聊天区域 -->
  <div class="section">
    <TravelChat @planUpdated="handlePlanUpdate" />
  </div>

  <!-- 地图区域 -->
  <div class="section">
    <TravelMap
      :travel-plan="currentPlan"
      :is-loading="isLoading"
    />
  </div>

  <!-- 计划展示区域 -->
  <div class="section">
    <TravelPlan
      :travel-plan="currentPlan"
      @dayFocused="handleDayFocus"
    />
  </div>
</div>

<style>
.travel-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin: -24px;
  background-color: var(--vp-c-bg-soft);
}

.section {
  width: 100%;
  height: 600px;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 适配移动设备 */
@media (max-width: 768px) {
  .section {
    height: 500px;
  }
}
</style>