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

	/**
	 * 计算所有点的景趣偏好值。
	 * 拿到所有选中的点，和景趣偏好半径。在选中点的透明度值为1，选中点到半径最外层的点的透明度值逐级递减。
	 *
	 */
	const allPointsPreferenceValue = computed(() => {
		const selectedIds = mapGridStore.selectedIds
		const radius = mapGridStore.preferenceRadius

		/** 当前选中点的坐标 */
		const idsArr = mapGridStore.selectedIdsToArray(selectedIds)

		/** 所有点对应的索引和值的信息 */
		const indexArr = mapGridStore.getIndexArray()

		// 900个点的透明度系数
		const opacity = indexArr.map(item => {
			// 从所有距离中取出最小距离
			const arr = idsArr
				.map(selectIdInfo => {
					// 计算距离
					const { row, column } = selectIdInfo
					if (row === -1 || column === -1) return -1

					const dis = Math.max(Math.abs(item.row - row), Math.abs(item.column - column))
					return dis
				})
				.filter(item => item <= radius && item >= 0)
				.map(dis => {
					// 半径为0，则未激活， 返回0
					if (radius === 0) return 0

					/**
					 * 透明度 = 1 - (1 / 半径最大值) * (切比雪夫距离 - 1)  = 1 - (1 / mapGridStore.maxPreference ) * (dis - 1)
					 *
					 * 1. 如果半径最大值为10，则当选中半径为2的时候，距离为0和1的透明度都为1。此时根据此算法计算的距离为2的点的透明度为0.8，所以dis - 1
					 * 2. 后面乘以10，除以10，是配合Math.round使用。因为浮点计算，所以小数会出现例如0.2999999,0.30000003的情况
					 *
					 */

					return Math.round((1 - (1 / mapGridStore.maxPreference) * Math.max(0, dis - 1)) * 10) / 10
				})

			if (arr.length === 0) return 0
			return Math.max(...arr)
		})
		return {
			selectedIds,
			opacity,
		}
	})

	return {
		selectedCoordinated,
		allPointsPreferenceValue,
	}
})

export default useOutStore
