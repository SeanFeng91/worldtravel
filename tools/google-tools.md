<script setup>
import GoogleTravelSearch from '../components/GoogleTravelSearch.vue'
import GoogleHotelSearch from '../components/GoogleHotelSearch.vue'
</script>

# Google 旅游搜索工具

## 酒店搜索
<!-- <ClientOnly>
  <div class="hotel-search-container">
    <GoogleHotelSearch />
  </div>
</ClientOnly> -->

## 旅游信息搜索
<!-- <ClientOnly>
  <GoogleTravelSearch />
</ClientOnly> -->

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

<style>
.hotel-search-container {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
</style>
