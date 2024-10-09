import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useMapGridStore } from './mapGrid'
import { CoordinateDataType, useFeatureStore } from './feature'
import _ from 'lodash'
import { genVIRIDIS } from '@/tools/color'

const VIRIDIS = genVIRIDIS()

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

		// 900个的半径距离
		const pointsDis = indexArr.map(item => {
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

			if (arr.length === 0) return mapGridStore.maxPreference + 1
			return Math.min(...arr)
		})

		// 900个点的颜色
		const pointColors = pointsDis.map(dis => {
			if (dis > mapGridStore.maxPreference) return null
			// 当前距离除以最大半径 = 比例
			// 比例在渐变色中的占比
			return VIRIDIS.getHex(dis / mapGridStore.maxPreference)
		})

		return {
			selectedIds,
			pointColors,
		}
	})

	return {
		selectedCoordinated,
		allPointsPreferenceValue,
	}
})

export default useOutStore
