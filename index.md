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

<div class="video-background">
  <video autoplay loop muted playsinline>
    <source src="/videos/STG_boost.mp4" type="video/mp4">
  </video>
</div>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3eaf7c 30%, #42d392);
}

.video-background {
  position: fixed;
  top: -200px; /* 将视频位置整体往上移动50像素 */
  left: 0;
  width: 100%;
  height: calc(100%); /* 增加高度以补偿上移的距离 */
  z-index: -1;
  overflow: hidden;
}

.video-background video {
  min-width: 100%;
  min-height: 110%;
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

/* 添加一个半透明遮罩，使文字更容易阅读 */
/* .video-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
} */
</style>

