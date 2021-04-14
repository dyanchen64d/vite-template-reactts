import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dovEnv from 'dotenv';

dovEnv.config()

const devConfig = {
  build: {
    rollupOptions: {
      input: 'client/main.tsx'
    },
  },
  // base: 'dist',
  // publicDir: 'dist',
  server: {
    host: '0.0.0.0',
    port: 3010
  },
  plugins: [reactRefresh()]
}

const prodConfig = {
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      input: 'client/main.tsx'
    },
    outDir: 'dist',
    assetsDir: 'assets'
  },
  base: 'dist',
  // publicDir: 'dist',
}

let config = {};

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  config = defineConfig(devConfig);
}

if (process.env.NODE_ENV === 'production') {
  config = defineConfig(prodConfig);
}

// https://vitejs.dev/config/
export default config;
