---
layout: home
hero:
  name: "环球旅行规划"
  text: "一个专业的环球旅行规划指南"
  tagline: 让旅行更简单，让计划更完美
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/getting-started
    - theme: alt
      text: 查看示例
      link: /guide/future-plan

features:
  - icon: 🗺️
    title: 交互式地图
    details: 使用交互式地图规划你的旅行路线
  - icon: 📝
    title: 经验分享
    details: 来自资深旅行者的第一手经验
    link: /special/experience
---

<script setup>
import MapboxGlobal from './components/MapboxGlobal.vue'
</script>

<div class="map-wrapper">
  <MapboxGlobal />
</div>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3eaf7c 30%, #42d392);
}

/* 调整主要内容的层级 */
.VPHome {
  /* position: relative; */
  z-index: 1;
  /* background: transparent; */
}

/* 确保 hero 部分在地图上层 */
.VPHero {
  /* position: relative; */
  z-index: 10;
  /* background: transparent; */
}

/* 确保 features 部分在地图上层 */
.VPFeatures {
  /* position: relative; */
  z-index: 10;
  /* background: transparent; */
}

/* 可选：添加半透明背景使文字更易读 */
.VPHero .container {
  /* background-color: rgba(255, 255, 255, 0.8); */
  padding: 20px;
  border-radius: 10px;
}

.VPFeatures .container {
  /* background-color: rgba(255, 255, 255, 0.8); */
  padding: 20px;
  border-radius: 10px;

}

/* 添加地图包装器样式 */
.map-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 8; /* 确保地图在最底层 */
}
</style>

