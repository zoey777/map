import { defineStore } from 'pinia'

type SelectedIndexMapType = Record<string, boolean>

const defaultState = {
	renderCount: 900,
	renderRow: 30,

	selectedIndexMap: {} as SelectedIndexMapType,
	isMousedown: false,
	startMouseIndex: -1,
	currentMouseIndex: -1,
}

export const useMapGridStore = defineStore('map', {
	state: () => defaultState,
	actions: {
		recordMousedown(index: number) {
			this.isMousedown = true
			this.startMouseIndex = index
			this.currentMouseIndex = index
		},
		recordMousemove(index: number) {
			if (this.isMousedown) {
				this.currentMouseIndex = index
			}
		},
		recordMouseup() {
			// 判断如果开始和结束是相同索引，则反选
			if (this.startMouseIndex === this.currentMouseIndex) {
				this.selectedIndexMap[this.startMouseIndex] = !this.selectedIndexMap[this.startMouseIndex]
			} else {
				// 存储本次选中的元素
				this.selectedIndexData.picIndexSelectedIndexArr.forEach(index => {
					this.selectedIndexMap[index] = true
				})
			}

			// 在最后判断。selectedIndexData会判断是否处于按下状态，如果不处于按下状态，则返回空内容，导致后续无法拿到当前选中的值
			this.isMousedown = false
		},
	},
	getters: {
		/** 本次鼠标事件，选中的元素 */
		selectedIndexData() {
			const res: {
				picIndexSelectedIndexArr: number[]
				picIndexSelectedMap: SelectedIndexMapType
			} = {
				picIndexSelectedIndexArr: [],
				picIndexSelectedMap: {},
			}

			/** 如果没有点击，则返回空 */
			if (!this.isMousedown) return res

			let startRowIndex = -1,
				endRowIndex = -1,
				startColumnIndex = -1,
				endColumnIndex = -1

			const startMouseRow = Math.floor(this.startMouseIndex / this.renderRow)
			const currentMouseRow = Math.floor(this.currentMouseIndex / this.renderRow)
			const startMouseColumn = this.startMouseIndex % this.renderRow
			const currentMouseColumn = this.currentMouseIndex % this.renderRow

			startRowIndex = Math.min(startMouseRow, currentMouseRow)
			endRowIndex = Math.max(startMouseRow, currentMouseRow)
			startColumnIndex = Math.min(startMouseColumn, currentMouseColumn)
			endColumnIndex = Math.max(startMouseColumn, currentMouseColumn)

			/**
			 * 左上坐标[startColumnIndex,startRowIndex]
			 * 右下坐标 [endColumnIndex,endRowIndex]
			 */
			const arr: number[] = []

			for (let i = startColumnIndex; i <= endColumnIndex; i++) {
				for (let j = startRowIndex; j <= endRowIndex; j++) {
					arr.push(j * this.renderRow + i)
				}
			}

			const picIndexSelectedMap: SelectedIndexMapType = Object.fromEntries(arr.map(picIndex => [picIndex, true]))

			return Object.assign(res, {
				picIndexSelectedIndexArr: arr,
				picIndexSelectedMap,
			})
		},
		/** 包括已经选中的，和本次交互事件选中的元素 */
		allSelectedPicIndexData() {
			const tempMap: SelectedIndexMapType = {}
			Object.assign(tempMap, this.selectedIndexMap)
			Object.assign(tempMap, this.selectedIndexData.picIndexSelectedMap)
			return tempMap
		},
	},
})
