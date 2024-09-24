import { defineStore } from 'pinia'

enum ConfigNameEnum {
	isSplitPaneMode = '是否手动面板分割',
	findImmediatly = '滑块是否在滑动后立即执行一次寻址',
}

type ConfigItem = {
	enable: boolean
	comment: string
}

type ConfigType = {
	[key in ConfigNameEnum]: ConfigItem
}

const genConfig = (defaultEnable: boolean, comment: string): ConfigItem => {
	return {
		enable: defaultEnable,
		comment,
	}
}

const defaultConfig: ConfigType = {
	[ConfigNameEnum.isSplitPaneMode]: genConfig(false, '地图页面，是否需要启用面板手动控制左右板块宽度'),
	[ConfigNameEnum.findImmediatly]: genConfig(
		true,
		'是否需要滑块在【勾选和关闭】、【滑动】的时候，立即执行一次寻址（已优化，不会有性能问题）'
	),
}

export const useConfigStore = defineStore('config', {
	state: () => defaultConfig,
	actions: {
		// getConfig(key: ConfigNameEnum) {},
	},
})
