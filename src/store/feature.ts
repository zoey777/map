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

export type PoiDataType = Record<
	string,
	{
		index: number
		count: number
	}[]
>

export type PoiDataCoordinateDataType = [number, number][]

const defaultState = {
	/** feature数据解析后的滑块渲染数据 */
	featureConfigs: [] as FeatureType[],
	featureData: {} as Record<string, number[]>,
	/** 每个点对应features范围 */
	coordinateData: {} as CoordinateDataType,
	/** poi数据 */
	poiData: {} as PoiDataType,
	/** poi对应的坐标点数据 */
	poiCoordinateData: [] as PoiDataCoordinateDataType,
	/** 被勾选的poi的key */
	selectedPoiKeys: [] as string[],
	/** 被勾选的feature */
	checkedFeatureList: [] as string[],
	/** 地景关系rgb */
	groundStreetscapeColor: {} as Record<string, [number, number, number]>,
	/** 是否展示地景关系  */
	isGroundStreetScapeOn: false,
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

/** 获取pois相关配置 */
const getPoiData = async () => {
	return await asyncFetchPublicJson<PoiDataType>('/data/pois.json', '请检查pois.json文件格式是否正确')
}

/** 获取feature对应范围数据 */
const getCoordinateData = async () => {
	return await asyncFetchPublicJson<CoordinateDataType>('/data/coordinate.json')
}

/** 获取feature对应范围数据 */
const getPoiCoordinateData = async () => {
	return await asyncFetchPublicJson<PoiDataCoordinateDataType>('/data/all_coordinates.json')
}

/**
 * 获取地景关系颜色数据
 */
const getGroundStreetscapeColor = async () => {
	return await asyncFetchPublicJson<Record<string, [number, number, number]>>(
		'/data/color.json',
		'请检查color.json文件格式是否正确'
	)
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
		setGroundStreetscapeColorOn() {
			this.isGroundStreetScapeOn = !this.isGroundStreetScapeOn
		},

		async initFeatureState() {
			// //获取config文件
			// const rawConfigs = await getFeatureConfig()
			// // 获取data文件
			// this.coordinateData = await getCoordinateData()

			// this.featureData = await getFeatureData()
			// this.groundStreetscapeColor = await getGroundStreetscapeColor()
			// this.poiData = await getPoiData()

			const [rawConfigs, coordinateData, featureData, groundStreetscapeColor, poiData, poiCoordinateData] =
				await Promise.all([
					getFeatureConfig(),
					getCoordinateData(),
					getFeatureData(),
					getGroundStreetscapeColor(),
					getPoiData(),
					getPoiCoordinateData(),
				]).catch(err => {
					throw new Error('文件读取失败', err)
				})
			this.coordinateData = coordinateData
			this.featureData = featureData
			this.groundStreetscapeColor = groundStreetscapeColor
			this.poiData = poiData
			this.poiCoordinateData = poiCoordinateData

			this.featureConfigs.splice(0)
			this.featureConfigs = rawConfigs.map(config => {
				const max = getMultipleVal(config.max ?? 1, true)
				const min = getMultipleVal(config.min ?? 0, true)
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
		},

		async clear() {
			// 隐藏地景关系
			this.isGroundStreetScapeOn = false
			// 清空勾选
			this.checkedFeatureList.splice(0)
			this.selectedPoiKeys.splice(0)
			// 清空滑块
			await this.initFeatureState()
		},

		checkPoi(poiKey: string, isCheck: boolean) {
			if (isCheck) {
				if (this.selectedPoiKeys.includes(poiKey)) return
				this.selectedPoiKeys.push(poiKey)
			} else {
				if (!this.selectedPoiKeys.includes(poiKey)) return
				const index = this.selectedPoiKeys.findIndex(item => item === poiKey)
				if (index !== -1) {
					this.selectedPoiKeys.splice(index, 1)
				}
			}
		},
	},
	getters: {
		poiCoordinatesLengthArr() {
			const countArr: number[] = []
			Object.keys(this.coordinateData).reduce((pre, cur) => {
				const count = pre + this.coordinateData[cur].length
				countArr.push(count)
				return count
			}, 0)
			return countArr
		},

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
		/**
		 * 地景关系的rgb值
		 * @returns
		 */
		groundStreetscapeColorRGB() {
			const rgbDatas = this.groundStreetscapeColor as Record<string, [number, number, number]>
			const rgbObject: Record<string, string> = {}
			Object.entries(rgbDatas).forEach(([key, [r, g, b]]) => {
				rgbObject[key] = `rgb(${r},${g},${b})`
			})
			return rgbObject
		},
		poiKeys() {
			const data = this.poiData as PoiDataType
			return Object.keys(data)
		},
		/**
		 * poi对应的坐标点
		 */
		poiDataPoints() {
			const keys = this.selectedPoiKeys as string[]
			const poiData = this.poiData as PoiDataType
			let data: [number, number][][] = []
			if (keys.length !== 0) {
				data = keys.map(item => {
					return poiData[item]
						.map(poi => {
							// // 找到是第几个数组
							// const index = lengthArr.findIndex((length, index) => {
							// 	if (index + 1 >= length) return -1
							// 	return length <= poi.index && lengthArr[index + 1] > poi.index
							// })

							// if (index === -1) return null

							// // 找到是数组中第几个
							// const valueIndex = poi.index - lengthArr[index]

							// return this.coordinateData[index][valueIndex]
							return this.poiCoordinateData[poi.index]
						})
						.filter(item => item) as [number, number][]
				})
			}
			console.log(data)

			return _.intersectionBy(...data, item => `[${item[0]},${item[1]}]`)
		},
	},
})
