# 存在困难 🚧

## 视频背景实现

::: tip 实现方法
在VitePress的Markdown文件中,我们可以直接嵌入HTML和CSS代码来实现视频背景效果。
:::

<div class="video-background">
  <video autoplay muted loop>
    <source src="/videos/STG_boost.mp4" type="video/mp4">
  </video>
</div>

<style>
.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

::: warning 注意事项
- 请确保将视频文件 `background-video.mp4` 放在 `public` 目录下
- 视频大小会影响页面加载速度,建议使用压缩后的视频文件
- 考虑移动端的适配问题
- 注意视频背景可能会影响页面内容的可读性
:::