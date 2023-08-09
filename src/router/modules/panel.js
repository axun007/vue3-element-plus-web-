const routes = [
  {
    path: '/panel/basedPanel',
    name: 'panel.basedPanel',
    component: () => import(/* webpackChunkName: "about" */ '../../views/panel/basePanel.vue')
  },
]
export default routes