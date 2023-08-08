import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/homePage/HomeIndex.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/panel/basedPanel',
    children: [
      {
        path: '/panel/basedPanel',
        name: 'panel.basedPanel',
        component: () => import(/* webpackChunkName: "about" */ '../views/panel/basePanel.vue')
      },
      {
        path: '/systemManagement/userManagement',
        name: 'systemManagement.userManagement',
        component: () => import(/* webpackChunkName: "about" */ '../views/systemManagement/userManagement.vue')
      }
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
