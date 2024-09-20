import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'swiper/css'
import './assets/font/font.css'
import { getI18nPluginAsync } from './libs/i18n'

const app = createApp(App)
const pinia = createPinia()

// 路由
app.use(router)
// 全局store
app.use(pinia)
// 组件
app.use(ELementPlus)

Promise.all([getI18nPluginAsync()])
	.then(plugins => {
		plugins.forEach(plugin => app.use(plugin))
	})
	.then(() => {
		app.mount('#app')
	})
