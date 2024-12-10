<template>
  <!-- 修改悬浮按钮结构 -->
  <button 
    class="floating-search-btn"
    @click="showSearch = true"
  >
    <i class="fas fa-hotel"></i>
    <span>住</span>
  </button>

  <!-- 搜索界面使用 Teleport 确保在最顶层 -->
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="showSearch" class="hotel-search-wrapper">
        <!-- 返回按钮 -->
        <div class="back-header">
          <button class="back-btn" @click="showSearch = false">
            <i class="fas fa-arrow-left"></i>
            <span>返回</span>
          </button>
          <h2>酒店搜索</h2>
        </div>

        <!-- 搜索栏 -->
        <div class="search-bar-container">
          <div class="search-bar">
            <!-- 目的地 -->
            <div class="search-item" @click="showModal = true">
              <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
              <div class="content">
                <div class="label">目的地</div>
                <div class="value">{{ searchForm.destination || '请选择目的地' }}</div>
              </div>
            </div>

            <div class="divider"></div>

            <!-- 日期 -->
            <div class="search-item" @click="showModal = true">
              <div class="icon"><i class="fas fa-calendar"></i></div>
              <div class="content">
                <div class="label">日期</div>
                <div class="value">{{ formatDateRange(searchForm.checkIn, searchForm.checkOut) }}</div>
              </div>
            </div>

            <div class="divider"></div>

            <!-- 住客 -->
            <div class="search-item" @click="showModal = true">
              <div class="icon"><i class="fas fa-user"></i></div>
              <div class="content">
                <div class="label">住客</div>
                <div class="value">{{ formatGuests() }}</div>
              </div>
            </div>

            <!-- 搜索按钮 -->
            <button class="search-button" @click="handleSearch">
              <i class="fas fa-search"></i>
              搜索
            </button>
          </div>
        </div>

        <!-- 结果容器 -->
        <div class="results-container">
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <span>正在搜索酒店...</span>
          </div>

          <!-- 调试信息 -->
          <!-- <div class="debug-info">
            <p>hotels 长度: {{ hotels.length }}</p>
            <p>loading 状态: {{ loading }}</p>
          </div> -->

          <!-- 有结果时显示 -->
          <div v-if="hotels.length > 0" class="hotel-results">
            <div v-for="hotel in hotels" :key="hotel.name" class="hotel-card">
              <!-- 酒店图片 -->
              <div class="hotel-image">
                <img 
                  v-if="hotel.images?.[0]?.original_image" 
                  :src="hotel.images[0].original_image" 
                  :alt="hotel.name"
                >
                <div v-else class="placeholder-image">
                  <i class="fas fa-hotel"></i>
                </div>
              </div>
              
              <div class="hotel-content">
                <div class="hotel-header">
                  <h3 class="hotel-name">{{ hotel.name }}</h3>
                  <div class="hotel-stars" v-if="hotel.extracted_hotel_class">
                    <i v-for="n in parseInt(hotel.extracted_hotel_class)" 
                       :key="n" 
                       class="fas fa-star">
                    </i>
                  </div>
                </div>

                <!-- 评分和点评 -->
                <div class="hotel-rating" v-if="hotel.overall_rating">
                  <div class="rating-info">
                    <span class="rating-score">{{ hotel.overall_rating }}/5</span>
                    <span class="review-count" v-if="hotel.reviews">
                      ({{ hotel.reviews }}条点评)
                    </span>
                  </div>
                  <!-- 首条点评 -->
                  <div class="first-review" v-if="hotel.reviews_breakdown?.[0]">
                    <i class="fas fa-quote-left"></i>
                    <span>{{ hotel.reviews_breakdown[0].text }}</span>
                  </div>
                </div>

                <!-- 位置 -->
                <div class="hotel-location" v-if="hotel.nearby_places?.[0]">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ hotel.nearby_places[0].name }}</span>
                </div>

                <!-- 价格区域 -->
                <div class="hotel-price-section">
                  <div class="price-info">
                    <span class="price">{{ hotel.rate_per_night?.lowest }}</span>
                    <span class="price-note">每晚起</span>
                  </div>
                  <a v-if="hotel.link" 
                     :href="hotel.link" 
                     target="_blank" 
                     class="book-button">
                    查看详情
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页控件 -->
          <div class="pagination" v-if="totalPages > 1">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- 无结果提示 -->
          <div v-else-if="!loading" class="no-results">
            未找到符合条件的酒店
          </div>
        </div>

        <!-- 搜索弹窗 -->
        <Transition name="modal">
          <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
            <div class="modal-content">
              <div class="modal-header">
                <h2>酒店搜索</h2>
                <button class="close-btn" @click="showModal = false">&times;</button>
              </div>

              <div class="search-sections">
                <!-- 目的地 -->
                <div class="search-section">
                  <label>目的地</label>
                  <div class="input-with-icon">
                    <i class="fas fa-map-marker-alt"></i>
                    <input 
                      v-model="searchForm.destination" 
                      placeholder="城市、地区或具体酒店"
                      @input="handleDestinationInput"
                    />
                  </div>
                  <!-- 目的地建议列表 -->
                  <div v-if="suggestions.length" class="suggestions">
                    <div 
                      v-for="suggestion in suggestions" 
                      :key="suggestion"
                      class="suggestion-item"
                      @click="selectDestination(suggestion)"
                    >
                      <i class="fas fa-location-dot"></i>
                      {{ suggestion }}
                    </div>
                  </div>
                </div>

                <!-- 日期选择 -->
                <div class="search-section dates">
                  <div class="date-input">
                    <label>入住日期</label>
                    <div class="input-with-icon">
                      <i class="fas fa-calendar"></i>
                      <input 
                        type="date" 
                        v-model="searchForm.checkIn"
                        :min="today"
                      />
                    </div>
                  </div>
                  <div class="date-separator">
                    <span class="nights">1晚</span>
                  </div>
                  <div class="date-input">
                    <label>退房日期</label>
                    <div class="input-with-icon">
                      <i class="fas fa-calendar"></i>
                      <input 
                        type="date" 
                        v-model="searchForm.checkOut"
                        :min="searchForm.checkIn || today"
                      />
                    </div>
                  </div>
                </div>

                <!-- 住客和房间 -->
                <div class="search-section">
                  <label>住客和房间</label>
                  <div class="guests-rooms">
                    <div class="counter-group">
                      <label>成人</label>
                      <div class="counter">
                        <button 
                          class="counter-btn"
                          @click="updateGuests('adults', -1)"
                          :disabled="searchForm.adults <= 1"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="counter-value">{{ searchForm.adults }}</span>
                        <button 
                          class="counter-btn"
                          @click="updateGuests('adults', 1)"
                          :disabled="searchForm.adults >= 20"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    <div class="counter-group">
                      <label>儿童</label>
                      <div class="counter">
                        <button 
                          class="counter-btn"
                          @click="updateGuests('children', -1)"
                          :disabled="searchForm.children <= 0"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="counter-value">{{ searchForm.children }}</span>
                        <button 
                          class="counter-btn"
                          @click="updateGuests('children', 1)"
                          :disabled="searchForm.children >= 10"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    <div class="counter-group">
                      <label>房间</label>
                      <div class="counter">
                        <button 
                          class="counter-btn"
                          @click="updateGuests('rooms', -1)"
                          :disabled="searchForm.rooms <= 1"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="counter-value">{{ searchForm.rooms }}</span>
                        <button 
                          class="counter-btn"
                          @click="updateGuests('rooms', 1)"
                          :disabled="searchForm.rooms >= 10"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 筛选选项 -->
                <div class="search-section filters">
                  <div class="filter-group">
                    <label>酒店星级</label>
                    <div class="star-filters">
                      <label v-for="star in 5" :key="star" class="star-option">
                        <input 
                          type="checkbox" 
                          :value="star"
                          :checked="searchForm.stars.includes(star)"
                          @change="toggleStar(star)"
                        />
                        <div class="star-label">
                          <i v-for="n in star" :key="n" class="fas fa-star"></i>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div class="filter-group">
                    <label>价格范围</label>
                    <div class="price-range">
                      <div class="input-with-icon">
                        <i class="fas fa-yen-sign"></i>
                        <input 
                          type="number" 
                          v-model="searchForm.priceMin" 
                          placeholder="最低价"
                        />
                      </div>
                      <span class="price-separator">-</span>
                      <div class="input-with-icon">
                        <i class="fas fa-yen-sign"></i>
                        <input 
                          type="number" 
                          v-model="searchForm.priceMax" 
                          placeholder="最高价"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="filter-group">
                    <label>设施</label>
                    <div class="amenities-filters">
                      <label v-for="amenity in availableAmenities" :key="amenity.value" class="amenity-option">
                        <input 
                          type="checkbox" 
                          :value="amenity.value"
                          :checked="searchForm.amenities.includes(amenity.value)"
                          @change="toggleAmenity(amenity.value)"
                        />
                        <div class="amenity-label">
                          <i :class="amenity.icon"></i>
                          <span>{{ amenity.label }}</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button class="reset-btn" @click="resetForm">
                  <i class="fas fa-rotate-left"></i>
                  重置
                </button>
                <button class="search-btn" @click="handleSearch">
                  <i class="fas fa-search"></i>
                  搜索
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'

// 1. 正确定义 emit
const emit = defineEmits(['search-complete'])

const API_KEY = import.meta.env.VITE_API_KEY
const WORKER_URL = import.meta.env.VITE_WORKER_URL

// 控制搜索页面显示
const showSearch = ref(false)
const showModal = ref(false)
const loading = ref(false)
const error = ref('')
const suggestions = ref([])
const hotels = ref([])

const searchForm = reactive({
  destination: '杭州',  // 默认值
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  rooms: 1,
  stars: [],
  priceMin: '',
  priceMax: '',
  amenities: []
})

const availableAmenities = [
  { label: '免费WiFi', value: 'wifi', icon: 'fas fa-wifi' },
  { label: '停车场', value: 'parking', icon: 'fas fa-parking' },
  { label: '游泳池', value: 'pool', icon: 'fas fa-swimming-pool' },
  { label: '健身中心', value: 'fitness', icon: 'fas fa-dumbbell' },
  { label: '餐厅', value: 'restaurant', icon: 'fas fa-utensils' },
  { label: '商务中心', value: 'business', icon: 'fas fa-briefcase' },
  { label: 'SPA', value: 'spa', icon: 'fas fa-spa' },
  { label: '接机服务', value: 'shuttle', icon: 'fas fa-shuttle-van' },
]

const today = new Date().toISOString().split('T')[0]

// 添加分页相关的状态
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 20 // 每页显示数量

// 处理分页
const changePage = async (page) => {
  currentPage.value = page
  await handleSearch()
}

// 修改搜索函数，添加分页参数
const handleSearch = async () => {
  try {
    loading.value = true
    
    const params = new URLSearchParams({
      q: searchForm.destination,
      check_in_date: searchForm.checkIn,
      check_out_date: searchForm.checkOut,
      adults: searchForm.adults.toString(),
      children: searchForm.children.toString(),
      rooms: searchForm.rooms.toString(),
      page: currentPage.value.toString()
    })
    
    const response = await fetch(`${WORKER_URL}/ai/hotels/search?${params}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    })

    const data = await response.json()
    
    if (data.properties && Array.isArray(data.properties)) {
      hotels.value = data.properties
      // 计算总页数
      totalPages.value = Math.ceil(data.search_information.total_results / pageSize)
    } else {
      hotels.value = []
    }

  } catch (err) {
    console.error('搜索错误:', err)
    hotels.value = []
  } finally {
    loading.value = false
  }
}

// 用于测试数据绑定
const testHotels = computed(() => {
  console.log('当前 hotels 值:', hotels.value)
  return hotels.value
})

// 格式化日期显示
const formatDateRange = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return '选择日期'
  return `${checkIn} - ${checkOut}`
}

// 格式化住客显示
const formatGuests = () => {
  return `${searchForm.adults}位成人, ${searchForm.rooms}间房`
}

const handleDestinationInput = async (e) => {
  // 这里可以添加目的地建议的API调用
  suggestions.value = ['杭州', '上海', '北京'] // 示例数据
}

const selectDestination = (destination) => {
  searchForm.destination = destination
  suggestions.value = []
}

const updateGuests = (type, delta) => {
  const limits = {
    adults: { min: 1, max: 20 },
    children: { min: 0, max: 10 },
    rooms: { min: 1, max: 10 }
  }
  
  const newValue = searchForm[type] + delta
  if (newValue >= limits[type].min && newValue <= limits[type].max) {
    searchForm[type] = newValue
  }
}

const resetForm = () => {
  Object.assign(searchForm, {
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    stars: [],
    priceMin: '',
    priceMax: '',
    amenities: []
  })
}

// 在组件挂载时设置默认日期
onMounted(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  // 直接设置为 YYYY-MM-DD 格式
  searchForm.checkIn = today.toISOString().split('T')[0]
  searchForm.checkOut = tomorrow.toISOString().split('T')[0]
})

// 导出方法供父组件使用
defineExpose({
  handleSearch,
  searchForm
})

// 评分标签
const getRatingLabel = (rating) => {
  if (rating >= 4.5) return '好极了'
  if (rating >= 4.0) return '非常好'
  if (rating >= 3.5) return '好'
  if (rating >= 3.0) return '一般'
  return '较差'
}

// 设施图标映射
const getAmenityIcon = (amenity) => {
  const iconMap = {
    'Free Wi-Fi': 'fas fa-wifi',
    'Breakfast': 'fas fa-coffee',
    'Pool': 'fas fa-swimming-pool',
    'Fitness centre': 'fas fa-dumbbell',
    'Spa': 'fas fa-spa',
    'Restaurant': 'fas fa-utensils',
    'Bar': 'fas fa-glass-martini-alt',
    'Room service': 'fas fa-concierge-bell',
    'Parking': 'fas fa-parking',
    'Air conditioning': 'fas fa-snowflake',
    // ... 可以添加更多映射
  }
  return iconMap[amenity] || 'fas fa-check'
}

// 切换星级选择
const toggleStar = (star) => {
  const index = searchForm.stars.indexOf(star)
  if (index === -1) {
    searchForm.stars.push(star)
  } else {
    searchForm.stars.splice(index, 1)
  }
}

// 切换设施选择
const toggleAmenity = (amenity) => {
  const index = searchForm.amenities.indexOf(amenity)
  if (index === -1) {
    searchForm.amenities.push(amenity)
  } else {
    searchForm.amenities.splice(index, 1)
  }
}
</script>

<style scoped>
/* 修改悬浮按钮样式 */
.floating-search-btn {
  position: fixed;
  width: 60px;
  height: 60px;
  right: 20px;
  bottom: 160px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.floating-search-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.25);
  background: #e59b11;
}

.floating-search-btn:active {
  transform: scale(0.95);
}

.floating-search-btn i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.floating-search-btn span {
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  transition: transform 0.3s ease;
}

.floating-search-btn:hover i,
.floating-search-btn:hover span {
  transform: translateY(-2px);
}

/* 搜索页面样式 */
.hotel-search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1000;
  overflow-y: auto;
}

.back-header {
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.search-bar-container {
  position: sticky;
  top: 0;
  background: #fff;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
}

.results-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hotel-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.hotel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.hotel-card:hover {
  transform: translateY(-4px);
}

.hotel-image {
  height: 200px;
  overflow: hidden;
}

.hotel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotel-content {
  padding: 16px;
}

.hotel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.hotel-name {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  flex: 1;
}

.hotel-stars {
  color: #ffc107;
  margin-left: 8px;
}

.hotel-rating {
  margin-bottom: 8px;
  color: #1a73e8;
}

.review-count {
  color: #666;
  font-size: 14px;
  margin-left: 4px;
}

.hotel-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.hotel-price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.price {
  font-size: 24px;
  font-weight: 500;
  color: #1a73e8;
}

.price-note {
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

.book-button {
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.book-button:hover {
  background: #1557b0;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 100px;
  padding: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  transition: all 0.3s;
}

.search-bar:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.search-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 100px;
  transition: background-color 0.3s;
}

.search-item:hover {
  background-color: #f5f5f5;
}

.icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  border-radius: 50%;
  margin-right: 12px;
}

.icon i {
  font-size: 16px;
  color: #1a73e8;
}

.content {
  flex: 1;
}

.label {
  font-size: 12px;
  color: #70757a;
  margin-bottom: 4px;
}

.value {
  font-size: 14px;
  color: #202124;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.divider {
  width: 1px;
  height: 32px;
  background: #e0e0e0;
  margin: 0 8px;
}

.search-button {
  background: #1a73e8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
  margin-left: 16px;
}

.search-button:hover {
  background: #1557b0;
}

.search-button i {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 8px;
  }

  .search-item {
    width: 100%;
  }

  .divider {
    display: none;
  }

  .search-button {
    width: 100%;
    margin-top: 8px;
  }

  .hotel-results {
    grid-template-columns: 1fr;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 4px;
}

.search-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.search-section {
  position: relative;
}

.search-section label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon i {
  position: absolute;
  left: 12px;
  color: #666;
}

.input-with-icon input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.input-with-icon input:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
  outline: none;
}

.dates {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
}

.date-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.nights {
  font-size: 12px;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 12px;
}

.guests-rooms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.counter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.counter {
  display: flex;
  align-items: center;
  gap: 16px;
}

.counter button {
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  background: white;
  color: #1a73e8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.counter button:hover:not(.disabled) {
  background: #1a73e8;
  color: white;
}

.counter button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter span {
  font-size: 16px;
  min-width: 24px;
  text-align: center;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.star-filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.star-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.star-option input {
  display: none;
}

.star-label {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  color: #666;
  transition: all 0.2s;
}

.star-option input:checked + .star-label {
  background: #1a73e8;
  color: white;
  border-color: #1a73e8;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 16px;
}

.price-separator {
  color: #666;
}

.amenities-filters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.amenity-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.amenity-option input {
  display: none;
}

.amenity-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  width: 100%;
  transition: all 0.2s;
}

.amenity-option input:checked + .amenity-label {
  background: #1a73e8;
  color: white;
  border-color: #1a73e8;
}

.amenity-option input:checked + .amenity-label i {
  color: white;
}

/* 添加新样式 */
.placeholder-image {
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image i {
  font-size: 48px;
  color: #ddd;
}

.first-review {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  font-style: italic;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.first-review i {
  color: #999;
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  padding: 20px 0;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background: #f5f5f5;
}

.page-info {
  font-size: 14px;
  color: #666;
}
</style>