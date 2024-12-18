<template>
    <div class="weather-widget">
      <div v-if="weather" class="weather-content">
        <div class="weather-header">
          <h3>{{ city }}</h3>
          <span class="date">{{ currentDate }}</span>
        </div>
        <div class="weather-info">
          <div class="temperature">
            {{ weather.temp }}°C
          </div>
          <div class="weather-desc">
            {{ weather.text }}
            <img :src="getWeatherIcon(weather.icon)" :alt="weather.text">
          </div>
        </div>
        <div class="weather-details">
          <div>湿度: {{ weather.humidity }}%</div>
          <div>风速: {{ weather.windSpeed }} km/h</div>
        </div>
        <div class="forecast" v-if="forecast.length">
          <div v-for="day in forecast" :key="day.fxDate" class="forecast-item">
            <span>{{ formatDate(day.fxDate) }}</span>
            <img :src="getWeatherIcon(day.iconDay)" :alt="day.textDay">
            <span>{{ day.tempMin }}° / {{ day.tempMax }}°</span>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        加载天气信息...
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    city: {
      type: String,
      default: '北京'
    },
    location: {
      type: String,
      required: true
    }
  })
  
  const weather = ref(null)
  const forecast = ref([])
  const currentDate = new Date().toLocaleDateString('zh-CN')
  
  // 和风天气 API Key
  const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY
  
  async function fetchWeather() {
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://devapi.qweather.com/v7/weather/now?location=${props.location}&key=${WEATHER_KEY}`),
        fetch(`https://devapi.qweather.com/v7/weather/3d?location=${props.location}&key=${WEATHER_KEY}`)
      ])
      
      const currentData = await currentRes.json()
      const forecastData = await forecastRes.json()

      if (currentData.code === '200') {
        weather.value = {
          temp: currentData.now.temp,
          text: currentData.now.text,
          icon: currentData.now.icon,
          humidity: currentData.now.humidity,
          windSpeed: currentData.now.windSpeed
        }
      }

      if (forecastData.code === '200') {
        forecast.value = forecastData.daily
      }
    } catch (error) {
      console.error('获取天气失败:', error)
    }
  }
  
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { weekday: 'short' })
  }
  
  function getWeatherIcon(code) {
    return `https://qweather.com/img/icons/${code}.png`
  }
  
  onMounted(fetchWeather)
  </script>
  
  <style scoped>
  .weather-widget {
    width: 300px;
    padding: 1rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #00b4db, #0083b0);
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  
  .weather-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .weather-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .date {
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .weather-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .temperature {
    font-size: 2.5rem;
    font-weight: bold;
  }
  
  .weather-desc {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .weather-desc img {
    width: 40px;
    height: 40px;
  }
  
  .weather-details {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .loading {
    text-align: center;
    padding: 1rem;
  }
  
  .forecast {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .forecast-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }
  
  .forecast-item img {
    width: 24px;
    height: 24px;
  }
  </style>