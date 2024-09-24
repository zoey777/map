import { defineStore } from 'pinia'

type ConfigType =
	| {
			moduleName?: string

			comment?: string
			[k: string]: string | boolean | ConfigType | undefined
	  }
	| {
			enable: boolean
			comment?: string
	  }

const genConfig = (defaultEnable: boolean, comment: string): ConfigType => {
	return {
		enable: defaultEnable,
		comment,
	}
}

const defaultConfig: ConfigType = {
	isSplitPaneMode: {
		moduleName: 'PageMap',
		value: genConfig(false, '地图页面，是否需要启用面板手动控制左右板块宽度'),
	},
	feature: {
		moduleName: 'Feature',
		findImmediatly: genConfig(
			true,
			'是否需要滑块在【勾选和关闭】、【滑动】的时候，立即执行一次寻址（已优化，不会有性能问题）'
		),
	},
}

export const useConfigStore = defineStore('config', {
	state: () => ({
		defaultConfig,
	}),
	actions: {},
})
