import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入 elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册所有elementui图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).mount('#app')
app.use(ElementPlus)
