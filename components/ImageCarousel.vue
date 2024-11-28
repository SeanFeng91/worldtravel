<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div class="carousel-slides" :style="slideStyle">
        <div v-for="(image, index) in images" :key="index" class="carousel-slide">
          <img :src="image" :alt="`Slide ${index + 1}`">
        </div>
      </div>
      
      <button class="carousel-btn prev" @click="prev">❮</button>
      <button class="carousel-btn next" @click="next">❯</button>
      
      <div class="carousel-dots">
        <span 
          v-for="(_, index) in images" 
          :key="index"
          :class="['dot', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  }
})

const currentIndex = ref(0)

const slideStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`
}))

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// 自动播放
if (props.autoplay) {
  setInterval(next, props.interval)
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
}

.carousel-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f5f5f5;
  max-height: 100%;
  max-width: 100%;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 16px 12px;
  border: none;
  cursor: pointer;
  opacity: 0.7;
}

.carousel-btn:hover {
  opacity: 1;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.dot.active {
  background: white;
}
</style> 