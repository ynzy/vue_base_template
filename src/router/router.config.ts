import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/Home/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
];
