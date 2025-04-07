/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:32:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-07 16:56:58
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
// https://vite.dev/config/
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
