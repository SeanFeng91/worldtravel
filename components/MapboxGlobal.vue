<template>
  <div id="map" class="map-background"></div>
</template>

<script>
export default {
  name: 'MapboxGlobal',
  data() {
    return {
      map: null,
      spinEnabled: true,
      userInteracting: false
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
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGlhaGlhNDUiLCJhIjoiY2lvdHcyZ3FqMDBkOHUwbTRyMTk1MmR1eCJ9.2SdvRkolF1B_GSrABB_Pxg';
        
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          projection: 'globe',
          zoom: 1,
          center: [30, 15],
          preserveDrawingBuffer: true // 添加这个选项可能有助于解决某些渲染问题
        });

        console.log('地图实例创建成功');

        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.scrollZoom.disable();

        this.map.on('style.load', () => {
          console.log('地图样式加载完成');
          this.map.setFog({});
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
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;

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
  z-index: 0;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mapboxgl-map {
  z-index: 0;
}
</style>
