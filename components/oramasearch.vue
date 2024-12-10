<script>

const customConfiguration = {
  "resultsMap": {
    "path": "path",
    "title": "title",
    "section": "content",
    "description": "content"
  },
  "colorScheme": "system",
  "themeConfig": {}
}

export default {
  data() {
    return {
      isOpen: false,
      searchBoxConfig: {
        open: false,
        index: {
          endpoint: import.meta.env.VITE_ORAMA_ENDPOINT,
          api_key: import.meta.env.VITE_ORAMA_API_KEY,
        },
        ...customConfiguration,
      }
    }
  },
  mounted() {
    const searchBox = this.$el.querySelector('orama-search-box')
    const searchConfig = {
      index: {
        endpoint: import.meta.env.VITE_ORAMA_ENDPOINT,
        api_key: import.meta.env.VITE_ORAMA_API_KEY,
      },
      ...customConfiguration,
    }
    
    Object.assign(searchBox, searchConfig)
    
    searchBox.addEventListener('load', () => {
      console.log('Search box configured:', searchBox.resultsMap)
    })
  },
  methods: {
    toggleSearch() {
      this.isOpen = !this.isOpen
      this.searchBoxConfig.open = this.isOpen
    }
  }
} 
</script>



<template>
  <main>
    <section>
      <div class="wrapper">
        <orama-search-button v-bind="searchBoxConfig" @click="toggleSearch" >
      搜索...
       </orama-search-button>
        <orama-search-box v-bind="searchBoxConfig" />
      </div>
    </section>
  </main>
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