import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
	state: () => ({
		/** 页面计算高度 */
		pageSizeProperty: {
			/** 网页基本尺寸属性 */
			base: {
				/** 视口宽度 */
				innerWidth: 0,
				/** 视口高度 */
				innerHeight: 0,
			},
			/** 应用属性 */
			app: {
				/** 页面头部高度 */
				headerHeight: 0,
				bodyHeight: 0,
			},
		},
	}),
	actions: {
		initPageProp(pageProperty: typeof this.$state) {
			Object.assign(this.pageSizeProperty, pageProperty.pageSizeProperty)
		},
	},
})
