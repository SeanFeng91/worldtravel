<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    // 在组件挂载后配置搜索框
    const searchBox = this.$el.querySelector('orama-search-box')
    const searchConfig = {
      resultsMap: {
        "path": "content",
        "title": "title",
        "description": "content"
      },
      colorScheme: "system",
      themeConfig: {},
      index: {
        endpoint: "https://cloud.orama.run/v1/indexes/hapaiqi-top-hvx0op",
        api_key: "xdu6hi8ybc8jOAKR7qmFq9ltm7hpon6s",
      }
    }
    
    Object.assign(searchBox, searchConfig)
  },
  methods: {
    toggleSearch() {
      this.isOpen = !this.isOpen
      const searchBox = this.$el.querySelector('orama-search-box')
      searchBox.open = this.isOpen
    }
  }
} 
</script>

<template>
  <div id="orama-ui">
    <orama-search-button @click="toggleSearch">
      搜索...
    </orama-search-button>
    <orama-search-box></orama-search-box>
  </div>
</template>

<style>
#orama-ui {
  position: fixed;
  left: 280px;
  top: 10px;
  z-index: 1000;
}

:deep(orama-search-box) {
  position: absolute;
  left: 0;
  top: 100%;
  width: 300px;
  margin-top: 8px;
}

:deep(orama-search-button) {
  padding: 0px 16px;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
}

/* 添加响应式布局 */
@media (max-width: 960px) {
  #orama-ui {
    left: 20px;
  }
}
</style>