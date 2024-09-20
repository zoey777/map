import { WithI18nString } from '@/types/WithI18nTypes'
import { defineStore } from 'pinia'

export type FeatureType = {
	title: WithI18nString<'zh' | 'en'>
	tip: WithI18nString<'zh' | 'en'>
	value: number
	max?: number
	min?: number
}

const defaultState = {
	featureList: [] as FeatureType[],
	isInit: false,
}

/** 滑块value的倍率显示。值乘以MUlTIPLE, 展示的时候除以MULTIPLE */
export const MULTIPLE = Math.pow(10, 15)

export const useFeatureStore = defineStore('feature', {
	state: () => defaultState,
	actions: {
		initFeatureState(featureConfigs: FeatureType[]) {
			this.isInit = true
			this.featureList.splice(0)
			this.featureList = featureConfigs.map(config => {
				return {
					title: config.title,
					tip: config.tip,
					max: (config.max ?? 1) * MULTIPLE,
					min: (config.min ?? 0) * MULTIPLE,
					value: 0,
				}
			})
		},
	},
})
