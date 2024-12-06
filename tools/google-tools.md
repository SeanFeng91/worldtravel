<script setup>
import GoogleTravelSearch from '../components/GoogleTravelSearch.vue'
</script>

# Google 旅游搜索工具

这个页面用于收集和整理通过 Google 搜索获取的旅游信息。使用 Google Custom Search API 来搜索特定的旅游相关内容。

<ClientOnly>
  <GoogleTravelSearch />
</ClientOnly>

## 使用方法

1. 在上方搜索框中输入目的地或关键词
2. 选择搜索类型：
   - 一般搜索
   - 景点搜索
   - 美食搜索
   - 住宿搜索
   - 旅游攻略
3. 点击搜索按钮获取结果
4. 可以将有用的搜索结果保存到此文档中

## 已保存的搜索结果

（搜索结果将会自动添加到这里）

---
