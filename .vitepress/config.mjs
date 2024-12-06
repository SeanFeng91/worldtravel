import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "环球旅行规划",
  description: "一个专业的环球旅行规划指南",
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '特色板块', link: '/special/' },
      { text: '社区', link: '/community/' },
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
                {text:'旅行规划助手',link:'/trip-plan/travel-agent'},
                {text:'旅行搜索工具',link:'/trip-plan/google-tools'}
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
    
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '52C6J0MS4V',
    //     apiKey: '816dc34de3e9c7f6b2d4f95bb85ba4a5',
    //     indexName: 'worldtravel',
    //     placeholder: '搜索文档',
    //     translations: {
    //       button: {
    //         buttonText: '搜索',
    //         buttonAriaLabel: '搜索'
    //       },
    //       modal: {
    //         searchBox: {
    //           resetButtonTitle: '清除查询条件',
    //           resetButtonAriaLabel: '清除查询条件',
    //           cancelButtonText: '取消',
    //           cancelButtonAriaLabel: '取消'
    //         },
    //         startScreen: {
    //           recentSearchesTitle: '搜索历史',
    //           noRecentSearchesText: '没有搜索历史',
    //           saveRecentSearchButtonTitle: '保存至搜索历史',
    //           removeRecentSearchButtonTitle: '从搜索历史中移除',
    //           favoriteSearchesTitle: '收藏',
    //           removeFavoriteSearchButtonTitle: '从收藏中移除'
    //         },
    //         errorScreen: {
    //           titleText: '无法获取结果',
    //           helpText: '你可能需要检查你的网络连接'
    //         },
    //         footer: {
    //           selectText: '选择',
    //           navigateText: '切换',
    //           closeText: '关闭',
    //           searchByText: '搜索提供者'
    //         },
    //         noResultsScreen: {
    //           noResultsText: '无法找到相关结果',
    //           suggestedQueryText: '你可以尝试查询',
    //           reportMissingResultsText: '你认为该查询应该有结果？',
    //           reportMissingResultsLinkText: '点击反馈'
    //         }
    //       }
    //     }
    //   }
    // }
    search: {
      provider: 'local',
      
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
        }
      }
    }
  }
})
