---
layout: home
hero:
  name: 环球旅行规划
  text: 让旅行更简单
  tagline: 专业的环球旅行规划指南，助你实现旅行梦想
  # image:
  #   src: https://cloudflare-imgbed-1d8.pages.dev/file/1732189556282_6decfd8553d5a64618bc890240151665.jpg
  #   alt: 环球旅行
  actions:
    - theme: brand
      text: 基本指南
      link: /guide/getting-started
    - theme: alt
      text: 查看工具
      link: /tools/
features:
  - icon: 🗺️
    title: 专业规划
    details: 提供详尽的路线规划、预算管理和签证指南
    link: /guide/route
  - icon: 💡
    title: 实用工具
    details: 旅行预算计算器、行程规划工具等实用工具
    link: /tools/
  - icon: 👥
    title: 社区交流
    details: 与其他旅行者分享经验，寻找旅伴
    link: /community/
  - icon: 📸
    title: 旅行摄影
    details: 专业的旅行摄影技巧和器材建议
    link: /special/photography
  - icon: 🍜
    title: 美食地图
    details: 世界各地特色美食推荐和寻味指南
    link: /special/food
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

