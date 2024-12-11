<template>
  <div class="flight-search">
    <h2>航班查询</h2>
    <div class="search-form">
      <!-- 出发地搜索 -->
      <div class="city-search">
        <input 
          v-model="originCity" 
          @input="searchOriginCities" 
          placeholder="输入出发城市名称" 
        />
        <div v-if="originCities.length" class="city-suggestions">
          <div 
            v-for="city in originCities" 
            :key="city.iataCode"
            @click="selectOrigin(city)"
            class="city-item"
          >
            {{ city.name }} ({{ city.iataCode }})
          </div>
        </div>
      </div>

      <!-- 目的地搜索 -->
      <div class="city-search">
        <input 
          v-model="destinationCity" 
          @input="searchDestinationCities" 
          placeholder="输入目的地城市名称" 
        />
        <div v-if="destinationCities.length" class="city-suggestions">
          <div 
            v-for="city in destinationCities" 
            :key="city.iataCode"
            @click="selectDestination(city)"
            class="city-item"
          >
            {{ city.name }} ({{ city.iataCode }})
          </div>
        </div>
      </div>

      <input v-model="departureDate" type="date" placeholder="出发日期" />
      <button @click="searchFlights">查询航班</button>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="flights.length" class="results">
      <h3>航班结果</h3>
      <ul>
        <li v-for="flight in flights" :key="flight.id" class="flight-item">
          <div class="flight-header">
            航班: {{ flight.itineraries[0].segments[0].carrierCode }} 
            {{ flight.itineraries[0].segments[0].number }}
          </div>
          <div class="flight-details">
            <div>起飞: {{ formatDateTime(flight.itineraries[0].segments[0].departure.at) }}</div>
            <div>到达: {{ formatDateTime(flight.itineraries[0].segments[0].arrival.at) }}</div>
            <div class="price">价格: {{ flight.price.total }} {{ flight.price.currency }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash/debounce'

const AMADEUS_CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID
const AMADEUS_CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET
const AMADEUS_API_URL = 'https://test.api.amadeus.com'

const originCity = ref('')
const destinationCity = ref('')
const originCities = ref([])
const destinationCities = ref([])
const departureDate = ref('')
const flights = ref([])
const loading = ref(false)
const error = ref('')
const accessToken = ref('')

// 获取 access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${AMADEUS_API_URL}/v1/security/oauth2/token`,
      `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    accessToken.value = response.data.access_token
    return response.data.access_token
  } catch (err) {
    console.error('获取 token 失败:', err)
    error.value = '认证失败'
    return null
  }
}

// 搜索城市
const searchCities = async (keyword) => {
  if (!accessToken.value) {
    await getAccessToken()
  }

  try {
    const response = await axios.get(`${AMADEUS_API_URL}/v1/reference-data/locations`, {
      params: {
        keyword,
        subType: 'CITY,AIRPORT'
      },
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    })
    return response.data.data
  } catch (err) {
    console.error('搜索城市失败:', err)
    return []
  }
}

// 使用 debounce 防止频繁请求
const searchOriginCities = debounce(async () => {
  if (originCity.value.length < 2) return
  originCities.value = await searchCities(originCity.value)
}, 500)

const searchDestinationCities = debounce(async () => {
  if (destinationCity.value.length < 2) return
  destinationCities.value = await searchCities(destinationCity.value)
}, 500)

// 选择城市
const selectOrigin = (city) => {
  originCity.value = `${city.name} (${city.iataCode})`
  originCities.value = []
}

const selectDestination = (city) => {
  destinationCity.value = `${city.name} (${city.iataCode})`
  destinationCities.value = []
}

// 格式化日期时间
const formatDateTime = (datetime) => {
  return new Date(datetime).toLocaleString('zh-CN')
}

// 搜索航班
const searchFlights = async () => {
  if (!accessToken.value) {
    await getAccessToken()
  }
  
  loading.value = true
  error.value = ''
  
  try {
    // 从选中的城市中提取 IATA 代码
    const originCode = originCity.value.match(/\(([^)]+)\)/)?.[1]
    const destinationCode = destinationCity.value.match(/\(([^)]+)\)/)?.[1]
    
    if (!originCode || !destinationCode) {
      throw new Error('请选择有效的城市')
    }

    const response = await axios.get(`${AMADEUS_API_URL}/v2/shopping/flight-offers`, {
      params: {
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: departureDate.value,
        adults: 1
      },
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    })
    flights.value = response.data.data
  } catch (err) {
    console.error('搜索航班失败:', err)
    error.value = err.message || '无法加载航班信息'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAccessToken()
})
</script>

<style scoped>
.flight-search {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.city-search {
  position: relative;
}

.city-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.city-item {
  padding: 8px;
  cursor: pointer;
}

.city-item:hover {
  background: #f0f0f0;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.loading, .error {
  margin-top: 10px;
  color: #d9534f;
  text-align: center;
}

.results {
  margin-top: 20px;
}

.flight-item {
  padding: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.flight-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.flight-details {
  display: grid;
  gap: 8px;
}

.price {
  font-weight: bold;
  color: #28a745;
}
</style>