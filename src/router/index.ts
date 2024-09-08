import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './enter'

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
