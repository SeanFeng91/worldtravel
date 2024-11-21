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
          text: '开始规划',
          items: [
            { text: '入门指南', link: '/guide/getting-started' },
            { text: '路线设计', link: '/guide/route' },
            { text: '预算规划', link: '/guide/budget' },
            { text: '签证指南', link: '/guide/visa' },
          ]
        },
        {
          text: '实用攻略',
          items: [
            { text: '交通攻略', link: '/guide/transport' },
            { text: '住宿建议', link: '/guide/accommodation' },
            { text: '时间管理', link: '/guide/time' },
            { text: '行前准备', link: '/guide/preparation' },
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
    
    algolia: {
      appId: '你的APPID',
      apiKey: '你的API_KEY',
      indexName: 'worldtravel'
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ]
})
