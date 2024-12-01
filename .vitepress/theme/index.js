import DefaultTheme from 'vitepress/theme'
import TravelMap from '../../components/TravelMap.vue'
import PresetRouteMap from '../../components/PresetRouteMap.vue'
import FloatingChat from '../../components/FloatingChat.vue'
import BackToTop from '../../components/BackToTop.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TravelMap', TravelMap)
    app.component('PresetRouteMap', PresetRouteMap)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [
        h(FloatingChat),
        h(BackToTop)
      ]
    })
  }
} 