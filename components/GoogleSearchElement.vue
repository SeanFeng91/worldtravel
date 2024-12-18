<template>
    <ClientOnly>
      <div class="google-search-container">
        <h1 class="text-2xl font-bold mb-4">旅游搜索工具</h1>
        <!-- 使用单个搜索组件 -->
        <div ref="searchContainer" class="gcse-search"></div>
      </div>
    </ClientOnly>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  
  const searchContainer = ref(null)
  
  onMounted(() => {
    // 初始化 Google 自定义搜索
    window.__gcse = {
      parsetags: 'explicit',
      callback: function() {
        if (google.search) {
          google.search.cse.element.render({
            div: searchContainer.value,
            tag: 'search',
            attributes: {
              enableHistory: true,
              linkTarget: '_blank'
            }
          });
        }
      }
    };
  
    // 加载搜索脚本
    const script = document.createElement('script')
    script.src = `https://cse.google.com/cse.js?cx=${import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID}`
    script.async = true
    document.head.appendChild(script)
  })
  </script>
  
  <style>
  /* 保留之前的样式，但移除两列布局相关样式 */
  .google-search-container {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* 搜索框样式 */
  .gsc-control-cse {
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
  }
  
  .gsc-input-box {
    border-radius: 100px !important;
    border: none !important;
    background: #f3f4f6 !important;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05) !important;
    padding: 12px 20px !important;
  }
  
  .gsc-search-button-v2 {
    border-radius: 50px !important;
    padding: 12px 24px !important;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
    border: none !important;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2) !important;
  }
  
  /* 暗色模式 */
  :root.dark .gsc-input-box {
    background: #1f2937 !important;
  }
  
  :root.dark .gsc-search-button-v2 {
    background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%) !important;
  }
  </style>