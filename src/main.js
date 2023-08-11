import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入 elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册所有elementui图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 进度条动画
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).mount('#app')
app.use(ElementPlus)

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 200,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 100, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})
//当路由进入前
router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
 NProgress.start();
 // 这个一定要加，没有next()页面不会跳转的
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {  
 // 在即将进入新的页面组件前，关闭掉进度条
 NProgress.done()
})

// 打开进度条
export const start = ()=>{
  NProgress.start()
}

// 关闭进度条
export const close = ()=>{
  NProgress.done()
}
