/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:56:38
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-10 15:38:48
 * @FilePath: \pcszl\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from './modules/home';
import course from './modules/course';
const routes: Array<RouteRecordRaw> = [
  ...Home,
  ...course
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;    