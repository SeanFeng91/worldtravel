<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    const searchBox = this.$el.querySelector('orama-search-box')
    const searchConfig = {
      resultsMap: {
        path: "path",
        title: "title",
        section: "section",
        description: "section"
      },
      colorScheme: "system",
      themeConfig: {},
      index: {
        endpoint: import.meta.env.VITE_ORAMA_ENDPOINT,
        api_key: import.meta.env.VITE_ORAMA_API_KEY,
      }
    }
    
    Object.assign(searchBox, searchConfig)
    
    searchBox.addEventListener('load', () => {
      console.log('Search box configured:', searchBox.resultsMap)
    })
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
    top: 5px;
  }
}
</style>