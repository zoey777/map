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
	 * 滑块范围和勾选的点,下面所包含的坐标
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

	/** feature和selected的所有id, 获取id下的坐标点 */
	const selectedCoordinated = computed(() => {
		return getCoordinateListByIds(mapGridStore.selectedIds, featureStore.includedIds)
	})

	return {
		selectedCoordinated,
	}
})

export default useOutStore
