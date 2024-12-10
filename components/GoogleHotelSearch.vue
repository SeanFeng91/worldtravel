<template>
  <div class="hotel-search">
    <!-- 添加基础的输入框和按钮，先测试功能 -->
    <div class="search-form">
      <input 
        v-model="searchForm.destination" 
        placeholder="输入城市或地区（如：杭州）"
        class="search-input"
      />
      
      <input 
        type="date" 
        v-model="searchForm.checkIn"
        class="search-input"
      />
      
      <input 
        type="date" 
        v-model="searchForm.checkOut"
        class="search-input"
      />
      
      <button 
        @click="searchHotels" 
        :disabled="loading"
        class="search-button"
      >
        {{ loading ? '搜索中...' : '搜索' }}
      </button>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- 搜索结果 -->
    <div v-if="hotels.length" class="hotel-results">
      <div v-for="hotel in hotels" :key="hotel.name" class="hotel-card">
        <!-- 图片轮播 -->
        <div class="hotel-images">
          <img 
            v-if="hotel.thumbnail" 
            :src="hotel.thumbnail" 
            :alt="hotel.name" 
            class="hotel-main-image"
          />
          <div class="image-thumbnails" v-if="hotel.images.length > 1">
            <img 
              v-for="(image, index) in hotel.images.slice(1, 5)" 
              :key="index"
              :src="image.thumbnail"
              :alt="`${hotel.name} - 图片 ${index + 2}`"
              class="thumbnail-image"
            />
          </div>
        </div>

        <div class="hotel-info">
          <h3>
            <a v-if="hotel.link" :href="hotel.link" target="_blank" rel="noopener">
              {{ hotel.name }}
            </a>
            <span v-else>{{ hotel.name }}</span>
          </h3>
          <div class="hotel-details">
            <p v-if="hotel.address" class="hotel-address">
              <span class="label">地址:</span> {{ hotel.address }}
            </p>
            <p v-if="hotel.rating" class="hotel-rating">
              <span class="label">评分:</span> {{ hotel.rating }}
              <span v-if="hotel.reviews_count" class="reviews-count">
                ({{ hotel.reviews_count }}条评价)
              </span>
            </p>
            <p v-if="hotel.location_rating" class="location-rating">
              <span class="label">位置评分:</span> {{ hotel.location_rating }}
            </p>
            <p v-if="hotel.price" class="hotel-price">
              <span class="label">价格:</span> {{ hotel.price }}
            </p>
            <div v-if="hotel.check_in_time" class="check-times">
              <p><span class="label">入住时间:</span> {{ hotel.check_in_time }}</p>
              <p><span class="label">退房时间:</span> {{ hotel.check_out_time }}</p>
            </div>
            <div v-if="hotel.amenities.length" class="hotel-amenities">
              <span class="label">设施:</span>
              <span class="amenity" v-for="amenity in hotel.amenities" :key="amenity">
                {{ amenity }}
              </span>
            </div>
            <div v-if="hotel.nearby_places.length" class="nearby-places">
              <span class="label">周边:</span>
              <div v-for="place in hotel.nearby_places" :key="place.name">
                {{ place.name }} - {{ place.distance }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose } from 'vue'
const API_KEY = import.meta.env.VITE_API_KEY
const WORKER_URL = import.meta.env.VITE_WORKER_URL

// onMounted(() => {
//   console.log('环境变量检查：', {
//     'WORKER_URL': import.meta.env.VITE_WORKER_URL,
//     'API_KEY 存在': !!import.meta.env.VITE_API_KEY
//   })
// })

const searchForm = reactive({
  destination: '',
  checkIn: '',
  checkOut: '',
})

const hotels = ref([])
const loading = ref(false)
const error = ref('')

const searchHotels = async (searchParams) => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('开始搜索酒店:', searchParams)
    
    const response = await fetch(`${WORKER_URL}/ai/hotels/search?` + new URLSearchParams({
      q: searchParams.destination,
      check_in_date: searchParams.checkIn,
      check_out_date: searchParams.checkOut,
      adults: searchParams.adults,
      children: searchParams.children,
      rooms: searchParams.rooms,
      // 添加其他搜索参数
      stars: searchParams.stars.join(','),
      min_price: searchParams.priceMin,
      max_price: searchParams.priceMax,
      amenities: searchParams.amenities.join(',')
    }))

    if (!response.ok) {
      throw new Error(`搜索请求失败: ${response.status}`)
    }

    const data = await response.json()
    console.log('搜索结果:', data)

    if (data.properties && data.properties.length > 0) {
      hotels.value = data.properties
    } else {
      error.value = '未找到相关酒店'
      hotels.value = []
    }
  } catch (err) {
    console.error('搜索酒店失败:', err)
    error.value = err.message
    hotels.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 格式化地址
const formatAddress = (coords) => {
  if (!coords?.latitude || !coords?.longitude) return '地址未知'
  return `${coords.latitude}, ${coords.longitude}`
}

// 更新酒店列表的方法
const updateHotels = (newHotels) => {
  console.log('更新酒店列表:', newHotels)
  hotels.value = newHotels
}

// 暴露方法给外部使用
defineExpose({
  searchHotels
})
</script>

<style scoped>
.hotel-search {
  padding: 20px;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  flex: 1;
}

.search-button {
  padding: 8px 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.error-message {
  color: #f56c6c;
  margin-bottom: 20px;
  padding: 10px;
  background: #fef0f0;
  border-radius: 4px;
}

.hotel-results {
  margin-top: 20px;
}

.hotel-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hotel-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.hotel-info {
  flex: 1;
}

.hotel-details p {
  margin: 8px 0;
}

.label {
  font-weight: 600;
  color: #666;
  margin-right: 8px;
}

.hotel-description {
  font-size: 0.9em;
  color: #666;
  margin-top: 12px;
  line-height: 1.5;
}

.reviews-count {
  font-size: 0.9em;
  color: #666;
  margin-left: 8px;
}

.hotel-amenities {
  font-size: 0.9em;
  color: #666;
}

.hotel-images {
  width: 300px;
}

.hotel-main-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.image-thumbnails {
  display: flex;
  gap: 4px;
}

.thumbnail-image {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

.hotel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.hotel-class {
  font-size: 0.9em;
  color: #f0ad4e;
}

.amenity {
  display: inline-block;
  background: #f5f7fa;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 2px;
  font-size: 0.9em;
}

.nearby-places {
  margin-top: 12px;
  font-size: 0.9em;
}

.check-times {
  display: flex;
  gap: 20px;
  margin: 8px 0;
}
</style>