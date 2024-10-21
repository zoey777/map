import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useMapGridStore } from './mapGrid'
import { CoordinateDataType, useFeatureStore } from './feature'
import _ from 'lodash'
import { genVIRIDIS } from '@/tools/color'

const VIRIDIS = genVIRIDIS()

/** 聚合多个store */
const useOutStore = defineStore('out', () => {
	const poiColors = ref<(string | null)[]>([])
	const mapGridStore = useMapGridStore()
	const featureStore = useFeatureStore()

	const maxRow = computed(() => mapGridStore.renderRow)
	const maxColumn = computed(() => mapGridStore.renderCount / mapGridStore.renderRow)
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
	 * 拿到所有选中的点，和景趣偏好半径。
	 *
	 */
	const allPointsPreferenceValue = computed(() => {
		const selectedIds = mapGridStore.selectedIds.filter(item => item > 0 && item < mapGridStore.renderCount)

		/** 当前选中点的坐标 */
		const idsArr = mapGridStore.selectedIdsToArray(selectedIds)

		/** 所有点对应的索引和值的信息 */
		const indexArr = mapGridStore.getIndexArray()

		// 第一个点
		const frlc = indexArr[0]
		// 第一行最后一列
		const frfc = indexArr.find(item => item.row === 0 && item.column === maxColumn.value - 1)
		// 最后一行，第一列
		const lrfc = indexArr.find(item => item.row === maxRow.value - 1 && item.column === 0)
		const lrlc = indexArr.find(item => item.row === maxRow.value - 1 && item.column === maxColumn.value - 1)

		const points = [frlc, frfc, lrfc, lrlc].filter(item => item !== undefined)

		// 获取selectedIds中每一个点，距离points每一个点的最大距离

		const selectedMaxDisList = idsArr.map(selectIdInfo => {
			const { row, column } = selectIdInfo
			if (row === -1 || column === -1) return -1

			const dis = points.map(item => {
				return Math.max(Math.abs(item.row - row), Math.abs(item.column - column))
			})

			return dis.length === 0 ? -1 : Math.max(...dis)
		})

		const maxDis = selectedMaxDisList.length === 0 ? -1 : Math.min(...selectedMaxDisList)

		// 900个的半径距离
		const pointsDis =
			maxDis < 0
				? []
				: indexArr.map(item => {
						// 从所有距离中取出最小距离
						const arr = idsArr
							.map(selectIdInfo => {
								// 计算距离
								const { row, column } = selectIdInfo
								if (row === -1 || column === -1) return -1

								const dis = Math.max(Math.abs(item.row - row), Math.abs(item.column - column))
								return dis
							})
							.filter(item => item <= maxDis && item >= 0)

						return Math.min(...arr)
					})

		// 900个点的颜色
		const colors = pointsDis.map(dis => {
			if (dis > maxDis) return null
			// 当前距离除以最大半径 = 比例
			// 比例在渐变色中的占比
			return VIRIDIS.getHex(dis / maxDis)
		})

		return {
			selectedIds,
			colors,
		}
	})

	return {
		selectedCoordinated,
		allPointsPreferenceValue,
		poiColors,
	}
})

export default useOutStore
