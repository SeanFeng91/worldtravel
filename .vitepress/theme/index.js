import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 在这里注册自定义组件
  }
} 