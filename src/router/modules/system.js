const router = [
  {
    path: '/system/user',
    name: 'system.user',
    component: () => import(/* webpackChunkName: "about" */ '../../views/system/userList.vue')
  },
  {
    path: '/system/role',
    name: 'system.role',
    component: () => import(/* webpackChunkName: "about" */ '../../views/system/roleList.vue')
  }
]
export default router