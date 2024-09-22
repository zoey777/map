import asyncFetchPublicJson from '@/tools/asyncFetchPublicJson'
import { WithI18nString } from '@/types/WithI18nTypes'
import { defineStore } from 'pinia'
import _ from 'lodash'

export type FeatureType = {
	title: WithI18nString<'zh' | 'en'>
	tip: WithI18nString<'zh' | 'en'>
	value: [number, number]
	max?: number
	min?: number
	defaultMax: number
	defaultMin: number
	/** 在data文件中的索引 */
	dataIndex: string
}

export type CoordinateDataType = Record<string, [number, number][]>

const defaultState = {
	/** feature数据解析后的滑块渲染数据 */
	featureConfigs: [] as FeatureType[],
	featureData: {} as Record<string, number[]>,
	/** 每个点对应features范围 */
	coordinateData: {} as CoordinateDataType,
	/** 被勾选的feature */
	checkedFeatureList: [] as string[],
	isInit: false,
}

/** 滑块value的倍率显示。值乘以MUlTIPLE, 展示的时候除以MULTIPLE */
export const MULTIPLE = Math.pow(10, 15)

/**
 * 获取倍率计算后的值。这里固定倍率为当前页面的MULTIPLE变量
 * @param value 原始值
 * @param isSet 是否是设置，如果是设置则乘以倍率，否则除以
 */
const getMultipleVal = (value: number, isSet: boolean) => {
	return isSet ? value * MULTIPLE : value / MULTIPLE
}

/** 获取feature相关配置 */
const getFeatureConfig = async () => {
	return await asyncFetchPublicJson<FeatureType[]>('/configs/features.json', '请检查features.json文件格式是否正确')
}
/** 获取feature相关配置 */
const getFeatureData = async () => {
	return await asyncFetchPublicJson<Record<string, number[]>>(
		'/data/features_data.json',
		'请检查features_data.json文件格式是否正确'
	)
}

/** 获取feature对应范围数据 */
const getCoordinateData = async () => {
	return await asyncFetchPublicJson<CoordinateDataType>('/data/coordinate.json')
}

export const useFeatureStore = defineStore('feature', {
	state: () => defaultState,
	actions: {
		/** 获取勾选状态 */
		getCheckedStatus(dataIndex: string) {
			return this.checkedFeatureList.includes(dataIndex)
		},
		/**
		 * 设置勾选
		 * @param dataIndex
		 * @param isActive 是否从 非勾选变更为勾选
		 */
		setCheckedStatus(dataIndex: string, isActive: boolean) {
			const hasCheckedData = this.getCheckedStatus(dataIndex)
			if (isActive) {
				if (!hasCheckedData) {
					this.checkedFeatureList.push(dataIndex)
				}
			} else {
				if (hasCheckedData) {
					const index = this.checkedFeatureList.findIndex(item => item === dataIndex)
					this.checkedFeatureList.splice(index, 1)
				}
			}
		},
		async initFeatureState() {
			//获取config文件
			const featureConfigs: FeatureType[] = await getFeatureConfig()
			// 获取data文件
			this.coordinateData = await getCoordinateData()
			this.featureData = await getFeatureData()

			this.featureConfigs.splice(0)
			this.featureConfigs = featureConfigs.map(config => {
				const max = getMultipleVal(config.max ?? 1, true)
				const min = getMultipleVal(config.min ?? 1, true)
				const defaultMin = getMultipleVal(config.defaultMin || 0.4, true)
				const defaultMax = getMultipleVal(config.defaultMax || 0.6, true)
				return {
					title: config.title,
					tip: config.tip,
					max,
					min,
					value: [defaultMin, defaultMax],
					defaultMax,
					defaultMin,
					dataIndex: config.dataIndex,
				}
			})

			this.isInit = true
		},
	},
	getters: {
		/**
		 * 获取滑块范围内的点
		 */
		includedIds() {
			const featureConfigList = this.featureConfigs as FeatureType[]
			const activedFeatureConfigs: FeatureType[] = featureConfigList.filter(feature =>
				this.checkedFeatureList.includes(feature.dataIndex)
			)

			const ids: number[][] = activedFeatureConfigs.map((config: FeatureType) => {
				const isActive = this.checkedFeatureList.includes(config.dataIndex)
				if (!isActive) return []
				const data = this.featureData[config.dataIndex] // [0.2,0.4,0.5,.....]{length:900}
				const [min, max] = [getMultipleVal(config.value[0], false), getMultipleVal(config.value[1], false)]

				// 得到的是索引，索引对应图片的索引
				const ids = data
					.map((item, index) => {
						if (min <= item && max >= item) return index
					})
					.filter(item => item !== undefined)

				return ids
			})

			return _.intersection<number>(...ids)
		},
	},
})
