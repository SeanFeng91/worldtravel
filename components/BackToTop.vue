<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const checkScroll = () => {
  visible.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition name="fade">
    <div 
      v-show="visible" 
      class="back-to-top"
      @click="scrollToTop"
      role="button"
      aria-label="返回顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z" fill="currentColor"/>
      </svg>
    </div>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 6rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
  z-index: 999;
}

.back-to-top:hover {
  background-color: #006400;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 适配深色模式 */
html.dark .back-to-top {
  background-color: var(--vp-c-brand-light);
}

html.dark .back-to-top:hover {
  background-color: var(--vp-c-brand);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .back-to-top {
    right: 1rem;
    bottom: 1rem;
  }
}
</style> 