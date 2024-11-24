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
    }
  }
} 