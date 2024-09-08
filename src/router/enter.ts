import { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/views/Home/index.vue'),
	},
]

export default routes
