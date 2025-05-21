/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:32:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-21 09:14:28
 * @FilePath: \pcszl\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    checker({
      typescript: true,
    })
  ],
  build: {
    commonjsOptions:{
      requireReturnsDefault:'namespace'
    },
    // minify: false, // 禁用代码压缩
    // sourcemap: true,
    rollupOptions: {
      output: {
        hoistTransitiveImports: false,
        // hoistTransitiveImports: false, // 禁用导入提升
        // preserveModules: true,
        manualChunks(id) {
          // 将 axios 单独打包到 axios 代码块
          if (id.includes('node_modules/axios')) {
            return 'axios';
          }
          // 将 element-plus 单独打包到 element-plus 代码块
          if (id.includes('node_modules/element-plus')) {
            return 'element-plus';
          }
          // 将 normalize.css 单独打包到 normalize-css 代码块
          if (id.includes('node_modules/normalize.css')) {
            return 'normalize-css';
          }
          if (id.includes('node_modules/danmu.js')) {
            return 'danmu.js';
          }
          if (id.includes('node_modules/xgplayer')) {
            return 'xgplayer';
          }
          if (id.includes('node_modules/xgplayer-hls.js')) {
            return 'xgplayer-hls.js';
          }
          // 将 pinia 和 pinia-plugin-persistedstate 打包到 pinia 代码块
          if (id.includes('node_modules/pinia') || id.includes('node_modules/pinia-plugin-persistedstate')) {
            return 'pinia';
          }
          // 将开发依赖中的一些工具库打包到 dev-tools 代码块
          const devTools = [
            '@types/node',
            '@vitejs/plugin-vue',
            '@vue/tsconfig',
            'sass',
            'typescript',
            'unplugin-auto-import',
            'unplugin-vue-components',
            'vite',
            'vite-plugin-checker',
            'vue-tsc'
          ];
          for (const tool of devTools) {
            if (id.includes(`node_modules/${tool}`)) {
              return 'dev-tools';
            }
          }
        }
      }
    }
  },
  server: {
    host: true // 监听所有可用的网络接口
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      }
    ],
    extensions: ['.ts', '.js'],
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler', additionalData: '@use "@/assets/styles/util.scss" as util;' },
    }
  }
})
