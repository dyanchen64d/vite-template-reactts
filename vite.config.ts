import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: '[name].js'
      }
    },
    outDir: 'dist',
    assetsDir: ''
  },
  base: 'static',
  plugins: [reactRefresh()]
})
