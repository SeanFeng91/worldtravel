import DefaultTheme from 'vitepress/theme'
import TravelMap from '../../components/TravelMap.vue'
import PresetRouteMap from '../../components/PresetRouteMap.vue'
import FloatingChat from '../../components/FloatingChat.vue'
import BackToTop from '../../components/BackToTop.vue'
import AMapTest from '../../components/AMapTest.vue'
import OramaSearch from '../../components/oramasearch.vue'
// import GoogleHotelSearch from '../../components/GoogleHotelSearch.vue'
import HotelSearchModal from '../../components/HotelSearchModal.vue'
import RoutePlanner from '../../components/RoutePlanner.vue'
import NearbyGoogleSearch from '../../components/NearbyGoogleSearch.vue'
import MyTravelWorld from '../../components/MyTravelWorld.vue'
import AmadeusSearch from '../../components/AmadeusSearch.vue'
import { h } from 'vue'
import Disqus from '../../components/disqus.vue'


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TravelMap', TravelMap)
    app.component('PresetRouteMap', PresetRouteMap)
    app.component('OramaSearch', OramaSearch)
    // app.component('GoogleHotelSearch', GoogleHotelSearch)
    app.component('HotelSearchModal', HotelSearchModal)
    app.component('RoutePlanner', RoutePlanner)
    app.component('NearbyGoogleSearch', NearbyGoogleSearch)
    app.component('MyTravelWorld', MyTravelWorld)
    app.component('AmadeusSearch', AmadeusSearch)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [
        h(FloatingChat),
        h(BackToTop),
        h(AMapTest),
        h(HotelSearchModal),
        // h(GoogleHotelSearch),
        
      ],
      'nav-bar-content-before': () => h(OramaSearch),
      'doc-after': () => h(Disqus)
    })
  }
} 