<template>
  <div class="floating-chat">
    <!-- 悬浮按钮 -->
    <button 
      class="float-button"
      @click="isOpen = !isOpen"
      :class="{ 'is-open': isOpen }"
    >
      <span v-if="!isOpen">💬</span>
      <span v-else>&times;</span>
    </button>

    <!-- 对话框 -->
    <div class="chat-container" v-show="isOpen">
      <div class="chat-header">
        <h3>AI 助手</h3>
        <button class="close-button" @click="isOpen = false">&times;</button>
      </div>
      <ChatDialog />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatDialog from './ChatDialog.vue'

const isOpen = ref(false)
</script>

<style scoped>
.floating-chat {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
}

.float-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.float-button:hover {
  transform: scale(1.1);
}

.float-button.is-open {
  background: #f44336;
}

.chat-container {
  position: fixed;
  right: 20px;
  bottom: 90px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 12px 16px;
  background: #4CAF50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

@media (max-width: 768px) {
  .chat-container {
    width: 90vw;
    height: 70vh;
    right: 5vw;
    left: 5vw;
  }
}
</style> 