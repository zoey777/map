import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useMapGridStore } from './mapGrid'
import { CoordinateDataType, useFeatureStore } from './feature'
import _ from 'lodash'

/** 聚合多个store */
const useOutStore = defineStore('out', () => {
	const mapGridStore = useMapGridStore()
	const featureStore = useFeatureStore()

	/**
	 * 根据图片id，获取id下面的街景点的坐标列表
	 * @returns
	 */
	const getCoordinateListByIds = (..._ids: number[][]) => {
		const ids = _.uniq(_ids.reduce((pre, cur) => pre.concat(cur), []))
		const data: CoordinateDataType = featureStore.coordinateData

		const coordinates = ids
			.map(id => {
				return data[id] as [number, number][]
			})
			.reduce((pre, cur) => {
				return pre.concat(cur)
			}, [])

		return coordinates
	}

	/**
	 * feature和selected的所有id, 获取id下的坐标点
	 * poi 和feature、selected的点进行交集
	 */
	const selectedCoordinated = computed(() => {
		const poiPoints = featureStore.poiDataPoints
		const featurePoints = getCoordinateListByIds(mapGridStore.selectedIds, featureStore.includedIds)

		if (featureStore.selectedPoiKeys.length === 0) {
			return featurePoints
		} else if (featureStore.checkedFeatureList.length === 0) {
			return poiPoints
		} else {
			// 如果都不为空，则交集
			return _.intersectionBy(featurePoints, poiPoints, item => `[${item[0]},${item[1]}]`)
		}
	})

	return {
		selectedCoordinated,
	}
})

export default useOutStore
