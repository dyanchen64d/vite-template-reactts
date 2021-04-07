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
    outDir: 'dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    cors: true
  },
  plugins: [reactRefresh()]
})
