<template>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import mapboxgl from 'mapbox-gl';
  
  const accessToken = 'pk.eyJ1IjoiaGlhaGlhNDUiLCJhIjoiY2lvdHcyZ3FqMDBkOHUwbTRyMTk1MmR1eCJ9.2SdvRkolF1B_GSrABB_Pxg'; // 替换为您的实际 Access Token
  
  onMounted(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [139.6917, 35.6895], // 设置地图中心为东京
      zoom: 12,
    });
  
    map.on('load', () => {
      // 设置起点和终点坐标
      const start = [139.6917, 35.6895]; // 东京
      const end = [139.7020, 35.6895]; // 目的地
  
      // 请求路径规划
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          const route = data.routes[0].geometry;
  
          // 在地图上添加路线
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route,
            },
          });
  
          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
            },
          });
  
          // 添加起点和终点标记
          new mapboxgl.Marker().setLngLat(start).addTo(map);
          new mapboxgl.Marker().setLngLat(end).addTo(map);
        })
        .catch((error) => {
          console.error('Error fetching directions:', error);
        });
    });
  });
  </script>
  
  <style>
  #map {
    width: 100%;
    height: 500px;
  }
  </style>
  