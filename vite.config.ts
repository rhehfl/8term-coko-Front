import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    tsconfigPaths(),
    react({
      plugins: [
        [
          '@swc/plugin-styled-components',
          {
            displayName: true,
            ssr: false,
          },
        ],
      ],
    }),
    mkcert(), 
    visualizer({
      open: true,      // 빌드 후 자동으로 브라우저 열림
      gzipSize: true,  // gzip 기준 크기도 표시
      brotliSize: true,
    })
  ],build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0]
        }
      }
    }
  }
},
  cacheDir: 'vite_cache',
});
