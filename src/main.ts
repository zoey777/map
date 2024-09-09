import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'swiper/css'
import i18n from './libs/i18n'

const app = createApp(App)
const pinia = createPinia()

// 路由
app.use(router)
// 全局store
app.use(pinia)
// 组件
app.use(ELementPlus)
// 本地化
app.use(i18n)

app.mount('#app')
