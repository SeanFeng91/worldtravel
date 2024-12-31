<template>
  <div>
    <div v-if="!isAuthenticated" class="password-form">
      <h2>🔐 本页博客有部分内容需要密码访问</h2>
      <div class="input-group">
        <input 
          type="password" 
          v-model="password"
          @keyup.enter="verify"
          placeholder="请输入密码"
        />
        <button @click="verify">确认</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  pageId: {
    type: String,
    required: true
  }
})

const password = ref('')
const error = ref('')
const isAuthenticated = ref(false)

// 从环境变量获取密码
const passwords = JSON.parse(import.meta.env.VITE_PAGE_PASSWORDS || '{}')

const verify = () => {
  const correctPassword = passwords[props.pageId]
  
  if (!correctPassword) {
    error.value = '页面配置错误'
    return
  }
  
  if (password.value === correctPassword) {
    isAuthenticated.value = true
    sessionStorage.setItem(`auth_${props.pageId}`, 'true')
  } else {
    error.value = '密码错误，请重试'
    password.value = ''
  }
}

// 检查 sessionStorage 中的认证状态
if (typeof window !== 'undefined') {
  isAuthenticated.value = sessionStorage.getItem(`auth_${props.pageId}`) === 'true'
}
</script>

<style scoped>
.password-form {
  max-width: 100%;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.input-group {
  display: flex;
  gap: 8px;
  margin: 1.5rem 0;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #edf2f7;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .password-form {
    background: #1a1a1a;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  }

  h2 {
    color: #e5e7eb;
  }

  input {
    background: #262626;
    border-color: #404040;
    color: #e5e7eb;
  }

  input:focus {
    border-color: #3b82f6;
    background: #333333;
  }

  button {
    background: #3b82f6;
  }

  button:hover {
    background: #2563eb;
  }
}
</style> 