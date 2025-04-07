import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from './modules/home';

const routes: Array<RouteRecordRaw> = [
  ...Home
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;    