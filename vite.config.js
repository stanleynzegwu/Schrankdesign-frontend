import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
// import svgr from "vite-plugin-svgr"
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
    ],
    assetsInclude: ['**/*.svg'] ,

    resolve: {
      alias: {
        '@src': path.resolve('./src'),
        '@public': path.resolve('./public'),
        '@types': path.resolve('./types'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.svg'],
    },
  }
})
