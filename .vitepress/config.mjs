import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "环球旅行规划",
  description: "一个专业的环球旅行规划指南",
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      // { text: '特色板块', link: '/special/' },
      { text: '出行计划', link: '/trip-plan/' },
      // { text: '社区', link: '/community/' },
      { text: '工具', link: '/tools/' },
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '网页介绍',
          items: [
            { text: '背景情况', link: '/guide/getting-started' },
            { text: 'AI 聊天助手', link: '/guide/how-to-write' },
            { text: '路线规划', link: '/guide/progress-status' },
            { text: '未来计划', link: '/guide/future-plan' },
            { text: '存在困难', link: '/guide/problems' },
            { text: 'AI 图像生成示例', link: '/guide/cloudflareAI.md' },
          ]
        },
        // {
        //   text: '实用攻略',
        //   items: [
        //     { text: '交通攻略', link: '/guide/transport' },
        //     { text: '住宿建议', link: '/guide/accommodation' },
        //     { text: '间管理', link: '/guide/time' },
        //     { text: '行前准备', link: '/guide/preparation' },
        //   ]
        // }
      ],
      '/trip-plan/':[
        {
          text:'出行计划',
          collapsed: false,
          items:[
            {text:'中亚三国',
              collapsed: true,
              items:[
                {text:'13天行程',link:'/trip-plan/midasia-three'},
                {text:'参考资料',link:'/trip-plan/reference'},
              ]
            }
          ]
        }
      ],
      '/special/': [
        {
          text: '特色内容',
          items: [
            { text: '旅行摄影', link: '/special/photography' },
            { text: '环球美食', link: '/special/food' },
            { text: '经验分享', link: '/special/experience' },
            {
              text: '目的地攻略',
              collapsed: true,
              items: [
                { text: '亚洲', link: '/special/destinations/asia' },
                { text: '欧洲', link: '/special/destinations/europe' },
                { text: '美洲', link: '/special/destinations/americas' },
                { text: '大洋洲', link: '/special/destinations/oceania' },
                { text: '非洲', link: '/special/destinations/africa' }
              ]
            }
          ]
        }
      ],
      '/community/': [
        {
          text: '社区',
          items: [
            { text: '旅行论坛', link: '/community/forum' },
            { text: '找寻旅伴', link: '/community/partner' },
            { text: '旅行日记', link: '/community/blog/index' },
            { text: '常见问题', link: '/community/faq' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '实用工具',
          items: [
            { text: 'Google 旅游搜索', link: '/tools/google-tools' },
            {text:'旅行规划助手',link:'/tools/travel-agent'},
            { text: '预算计算器', link: '/tools/budget-calculator' },
            { text: '行程规划', link: '/tools/itinerary-planner' },
            { text: '签证追踪', link: '/tools/visa-tracker' },
            { text: '路线优化', link: '/tools/route-optimizer' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' },
      { icon: 'twitter', link: 'https://twitter.com/your-account' }
    ],
    
    footer: {
      message: '用心做最好的环球旅行规划指南',
      copyright: 'Copyright © 2024-present WorldTravel'
    },
    
// 搜索配置
    search: {
      provider: 'orama', 
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'docsearch:language', content: 'zh-CN' }],
    ['meta', { name: 'docsearch:version', content: '1.0.0' }],
    ['script', { 
      src: 'https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js',
      crossorigin: 'anonymous'
    }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css',
      crossorigin: 'anonymous'
    }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['link', { 
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'
    }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdn.jsdelivr.net/npm/@orama/wc-components@latest/dist/orama-ui/orama-ui.css' 
    }],
    ['script', { 
      type: 'module', 
      src: 'https://cdn.jsdelivr.net/npm/@orama/wc-components@latest/dist/orama-ui/orama-ui.esm.js' 
    }],
    ['script', { 
      nomodule: true, 
      src: 'https://cdn.jsdelivr.net/npm/@orama/wc-components@latest/dist/cjs/orama-ui.cjs.js' 
    }]
  ],
  
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('leaflet-')
      || tag.includes('-')
      }
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['leaflet']
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        external: [],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/leaflet')) {
              return 'leaflet'
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['leaflet']
    },
    plugins: [
      {
        name: 'markdown-transform',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.md')) {
            return code
          }
        }
      }
    ],
    server: {
      proxy: {
        '/_AMapService': {
          target: 'https://lbs.amap.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/_AMapService/, '/AMapService')
        },
        '/api/hotels/search': {
          target: 'https://serpapi.com/search',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/hotels\/search/, '')
        }
      }
    }
  }
})
