import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/homePage/HomeIndex.vue'
import panel from './modules/panel'
import system from './modules/system'
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/panel/basedPanel',
    children: [
      ...panel,
      ...system
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
