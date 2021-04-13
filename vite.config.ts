import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      input: './src/main.tsx',
      // output: {
      //   entryFileNames: '[name].js'
      // }
    },
    // outDir: 'dist',
    // assetsDir: '',
  },
  base: '',
  // publicDir: '',
  server: {
    host: '0.0.0.0',
    port: 3010
  },
  plugins: [reactRefresh()]
})
