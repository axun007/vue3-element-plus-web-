import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/homePage/HomeIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/panel/basedPanel',
    children: [
      {
        path: '/panel/basedPanel',
        name: '',
        component: () => import(/* webpackChunkName: "about" */ '../views/panel/basePanel.vue')
      },
      {
        path: '/systemManagement/userManagement',
        name: '',
        component: () => import(/* webpackChunkName: "about" */ '../views/systemManagement/userManagement.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
