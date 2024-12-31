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
import GoogleSearchElement from '../../components/GoogleSearchElement.vue'
import ExchangeRateCalculator from '../../components/ExchangeRateCalculator.vue';
import WeatherWidget from '../../components/WeatherWidget.vue'
import GeminiSearchElement from '../../components/GeminiSearchElement.vue'
import GeminiLiveChat from '../../components/GeminiLiveChat.vue'
import GeminiMap from '../../components/GeminiMap.vue'
import EnhancedGeminiAI from '../../components/EnhancedGeminiAI.vue'
import PersistentMap from '../../components/PersistentMap.vue'  
import PasswordProtected from '../../components/PasswordProtected.vue'
import './custom.css'


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TravelMap', TravelMap)
    app.component('PresetRouteMap', PresetRouteMap)
    app.component('OramaSearch', OramaSearch)
    app.component('HotelSearchModal', HotelSearchModal)
    app.component('RoutePlanner', RoutePlanner)
    app.component('NearbyGoogleSearch', NearbyGoogleSearch)
    app.component('MyTravelWorld', MyTravelWorld)
    app.component('AmadeusSearch', AmadeusSearch)
    app.component('GoogleSearchElement', GoogleSearchElement)
    app.component('ExchangeRateCalculator', ExchangeRateCalculator);
    app.component('WeatherWidget', WeatherWidget)
    app.component('GeminiSearchElement', GeminiSearchElement)
    app.component('GeminiLiveChat', GeminiLiveChat)
    app.component('GeminiMap', GeminiMap)
    app.component('EnhancedGeminiAI', EnhancedGeminiAI)
    app.component('PersistentMap', PersistentMap)
    app.component('PasswordProtected', PasswordProtected)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [
        h(FloatingChat),
        h(BackToTop),
        h(AMapTest),
        h(HotelSearchModal),
        
      ],
      'nav-bar-content-before': () => h(OramaSearch),
      'doc-after': () => h(Disqus)
    })
  }
} 