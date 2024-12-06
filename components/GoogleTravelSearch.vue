<template>
  <ClientOnly>
    <div class="google-travel-search">
      <div class="mb-6">
        <div class="flex gap-4 mb-4">
          <input
            v-model="searchQuery"
            class="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            placeholder="输入目的地或旅游关键词..."
            @keyup.enter="handleSearch"
          />
          <select v-model="searchType" class="p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
            <option value="general">一般搜索</option>
            <option value="attractions">景点</option>
            <option value="restaurants">美食</option>
            <option value="hotels">住宿</option>
            <option value="tips">旅游攻略</option>
          </select>
          <button
            @click="handleSearch"
            :disabled="loading"
            class="bg-blue-500 text-white px-6 py-2 rounded disabled:bg-blue-300"
          >
            {{ loading ? '搜索中...' : '搜索' }}
          </button>
        </div>
      </div>

      <!-- 搜索结果显示 -->
      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <div v-if="results.length" class="space-y-6">
        <div v-for="(item, index) in results" :key="index" class="border rounded p-4 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-2">
            <a :href="item.link" target="_blank" class="text-blue-600 hover:underline dark:text-blue-400">
              {{ item.title }}
            </a>
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-2">{{ item.snippet }}</p>
          <div v-if="item.pagemap?.cse_thumbnail" class="mt-2">
            <img 
              :src="item.pagemap.cse_thumbnail[0].src" 
              :alt="item.title"
              class="rounded"
            />
          </div>
        </div>
      </div>

      <div v-else-if="!loading && searched" class="text-gray-500 dark:text-gray-400 text-center py-8">
        未找到相关结果
      </div>

      <button
        v-if="results.length"
        @click="saveToMarkdown"
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        保存搜索结果
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const searchType = ref('general')
const results = ref([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)

// 根据搜索类型构建搜索关键词
const buildSearchQuery = (query, type) => {
  const typeQueries = {
    attractions: `${query} 景点 旅游景区`,
    restaurants: `${query} 美食 餐厅推荐`,
    hotels: `${query} 酒店 住宿`,
    tips: `${query} 旅游攻略 游记`,
    general: query
  }
  return typeQueries[type]
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  error.value = ''
  results.value = []
  searched.value = true

  try {
    const finalQuery = buildSearchQuery(searchQuery.value, searchType.value)
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(finalQuery)}`)
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`搜索请求失败: ${errorData.error?.message || '未知错误'}`)
    }

    const data = await response.json()
    results.value = data.items || []
  } catch (err) {
    console.error('Error:', err)
    error.value = err.message || '搜索失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 在 script setup 中添加保存函数
const saveToMarkdown = async () => {
  const currentDate = new Date().toLocaleDateString('zh-CN')
  const markdown = `\n## ${searchQuery.value} 搜索结果 (${currentDate})\n\n` +
    `搜索类型：${searchType.value}\n\n` +
    results.value.map(item => (
      `### ${item.title}\n\n` +
      `${item.snippet}\n\n` +
      `[查看原文](${item.link})\n\n` +
      (item.pagemap?.cse_thumbnail ? `![缩略图](${item.pagemap.cse_thumbnail[0].src})\n\n` : '') +
      '---\n'
    )).join('\n')

  try {
    // 这里你需要实现一个后端 API 来保存内容到文件
    // 例如：
    const response = await fetch('/api/save-markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath: 'trip-plan/google-tools.md',
        content: markdown,
        mode: 'append' // 追加模式
      })
    })

    if (response.ok) {
      alert('搜索结果已保存！')
    } else {
      throw new Error('保存失败')
    }
  } catch (err) {
    console.error('保存失败:', err)
    alert('保存失败，请重试')
  }
}
</script>

<style scoped>
.google-travel-search {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 