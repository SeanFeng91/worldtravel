<template>
  <div class="mapbox-container">
      <div id="map" class="map-content"></div>
  </div>
</template>

<script>
const MAPBOX_ACCESS_TOKEN = import.meta.env.MAPBOX_ACCESS_TOKEN

export default {
  name: 'MapboxMiaAsia',
  data() {
    return {
      map: null,
      spinEnabled: true, // 控制地球是否自动旋转
      userInteracting: false // 用户是否正在与地图交互
    }
  },
  mounted() {
    // 改用 setTimeout 来确保 mapboxgl 已加载
    if (typeof window !== 'undefined') {
      const checkMapbox = () => {
        if (typeof mapboxgl !== 'undefined') {
          this.initializeMap();
        } else {
          console.log('等待 Mapbox GL JS 加载...');
          setTimeout(checkMapbox, 100);
        }
      };
      
      checkMapbox();
    }
  },
  methods: {
    initializeMap() {
      try {
        console.log('开始初始化地图');
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN; // Mapbox访问令牌
        
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v11', // 地图样式
          projection: 'globe', // 使用球体投影
          zoom: 6, // 初始缩放级别
          center: [45.221557, 40.615384], // 初始中心点坐标（亚美尼亚）
          
          preserveDrawingBuffer: true // 添加这个选项可能有助于解决某些渲染问题
        });

        console.log('地图实例创建成功');

        this.map.addControl(new mapboxgl.NavigationControl()); // 添加导航控件
        // this.map.scrollZoom.disable(); // 禁用滚轮缩放

        this.map.on('style.load', () => {
          console.log('地图样式加载完成');
          this.map.setFog({}); // 设置雾效果
          
          // 添加 marker
          const marker = new mapboxgl.Marker({ color: 'black', rotation: 0 })
            .setLngLat([45.130463, 40.341540]) // 使用亚美尼亚的坐标，你可以根据需要修改
            .addTo(this.map); // 注意这里使用 this.map 而不是 map
        });

        // 设置事件监听器
        this.map.on('mousedown', () => {
          this.userInteracting = true;
        });
        
        this.map.on('dragstart', () => {
          this.userInteracting = true;
        });

        this.map.on('moveend', () => {
          this.spinGlobe();
        });

        // 开始旋转
        this.spinGlobe();
      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    },
    spinGlobe() {
      const secondsPerRevolution = 1000; // 完成一次旋转所需的秒数
      const maxSpinZoom = 6; // 最大自动旋转的缩放级别
      const slowSpinZoom = 3; // 开始减慢旋转速度的缩放级别

      const zoom = this.map.getZoom();
      if (this.spinEnabled && !this.userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = this.map.getCenter();
        center.lng -= distancePerSecond;
        this.map.easeTo({
          center,
          duration: 1000,
          easing: (n) => n
        });
      }
    }
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }
  
}
</script>

<style scoped>
.mapbox-container {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 2rem 0;  /* 上下都加间距 */
  border-radius: 8px;  /* 可选：添加圆角 */
  overflow: hidden;  /* 确保地图内容不会溢出容器 */
}

.map-content {
  width: 100%;
  height: 100%;
  background-color: rgb(15, 16, 45) !important;
}

/* 确保地图不会影响其他内容的 z-index */
.mapboxgl-map {
  z-index: 1;
}

/* 适配 VitePress 主题 */
:deep(.vp-doc) & {
  margin: 2rem 0;
}
</style>
