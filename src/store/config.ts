import asyncFetchPublicJson from '../tools/asyncFetchPublicJson'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum ConfigNameEnum {
	滑块是否在滑动后立即执行一次寻址 = 'findImmediatly',
	'侧边栏比例（设置60，代表左侧占比60%。取值范围0-100）' = 'splitRange',
}

type ConfigItem = {
	value: boolean | number | string
	comment: string
}

type ConfigType = {
	[k in ConfigNameEnum]: ConfigItem
}

const genConfig = (defaultValue: ConfigItem['value'], comment: string): ConfigItem => {
	return {
		value: defaultValue,
		comment,
	}
}

export const defaultConfig: ConfigType = {
	[ConfigNameEnum.滑块是否在滑动后立即执行一次寻址]: genConfig(
		false,
		'是否需要滑块在【勾选和关闭】、【滑动】的时候，立即执行一次寻址。如果为false，则在滑动后需手动点击寻址才可生效。'
	),
	[ConfigNameEnum['侧边栏比例（设置60，代表左侧占比60%。取值范围0-100）']]: genConfig(
		60,
		'map界面侧边栏占比（设置60，代表左侧占比60%。取值范围0-100）'
	),
}

const getConfiguration = async () => {
	return asyncFetchPublicJson<Record<ConfigNameEnum, ConfigItem>>(
		'/configs/configuration.json',
		'请检查configuration.json文件格式是否正确'
	)
}

export const useConfigStore = defineStore('config', () => {
	const state = ref(defaultConfig)

	getConfiguration().then(res => {
		;(Object.keys(res) as ConfigNameEnum[]).forEach((key: ConfigNameEnum) => {
			if (state.value[key] !== undefined) {
				state.value[key] = res[key as ConfigNameEnum]
			}
		})
	})

	return {
		state,
		getConfig: (name: keyof ConfigType) => {
			return state.value[name].value
		},
	}
})
