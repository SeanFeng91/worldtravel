# 如何撰写 🗺️

这是我规划的路线，从杭州出发，经过北京，西安，最终到达亚美尼亚...

<ClientOnly>
  <PresetRouteMap :routes="[
    { type: 'start', name: '杭州市, 浙江省, 中国' },
    { type: 'waypoint', name: '北京市, 中国' },
    { type: 'waypoint', name: '西安市, 陕西省, 中国' },
    { type: 'end', name: 'Yerevan, 亚美尼亚' }
  ]" />
</ClientOnly>