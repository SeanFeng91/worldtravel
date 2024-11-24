export default {
  // ... 其他配置
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('leaflet-')
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
          inlineDynamicImports: true
        }
      }
    },
    ssr: {
      noExternal: ['leaflet']
    }
  }
} 