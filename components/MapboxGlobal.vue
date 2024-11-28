<template>
  <div id="map" class="map-background"></div>
</template>

<script>
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export default {
  name: 'MapboxGlobal',
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
          center: [120.207825, 30.257943], // 初始中心点坐标（杭州）
          
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
            .setLngLat([120.207825, 30.257943]) // 使用杭州的坐标，你可以根据需要修改
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
      const maxSpinZoom = 8; // 最大自动旋转的缩放级别
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

<style>
.map-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(15, 16, 45) !important; /* 设置地图背景颜色 */
}

.mapboxgl-map {
  z-index: 1;
}
</style>
