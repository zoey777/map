import { defineStore } from 'pinia'

export type SelectedIndexMapType = Record<string, boolean>
export type StreetScapeType = {
	picIndex: number
	count: number
	opacity: number
}

const defaultState = {
	renderCount: 900,
	renderRow: 30,
	isMousedown: false,
	startMouseIndex: -1,
	currentMouseIndex: -1,
	/** 景区偏好滑块最大半径 */
	maxPreference: 10,
	/** 鼠标已经点选的图片的索引 */
	selectedIndexMap: {} as SelectedIndexMapType,
	/** 已经框选的 */
	preStreetScapeList: [] as StreetScapeType[],
	/** 寻景数据信息 */
	streetScapeList: [] as StreetScapeType[],
	/** 是否展示寻景图层 */
	isStreetScapeOn: false,
	/**	景趣偏好半径。用于计算选中点周围的半径范围内的点 */
	preferenceRadius: 0,
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
			if (this.isMousedown && this.startMouseIndex !== -1) {
				this.currentMouseIndex = index
			}
		},
		recordMouseup() {
			// 判断如果开始和结束是相同索引，则反选
			if (this.startMouseIndex === this.currentMouseIndex) {
				if (this.startMouseIndex >= 0) {
					this.selectedIndexMap[this.startMouseIndex] = !this.selectedIndexMap[this.startMouseIndex]
				}
			} else {
				// 存储本次选中的元素
				this.selectedIndexData.picIndexSelectedIndexArr.forEach(index => {
					this.selectedIndexMap[index] = true
				})
			}

			// 在最后判断。selectedIndexData会判断是否处于按下状态，如果不处于按下状态，则返回空内容，导致后续无法拿到当前选中的值
			this.isMousedown = false
		},

		/**
		 * 设置寻景数据
		 * @param list
		 * @param isSubmit 如果为true，则将preStreetScapeList保存到streetScapeList，否则将list保存到preStreetScapeList。
		 */
		setStreetScapeList(list: StreetScapeType[], isSubmit: boolean) {
			if (!isSubmit) {
				this.preStreetScapeList = list
			} else {
				this.streetScapeList.splice(0)
				this.streetScapeList.push(...this.preStreetScapeList)
				this.isStreetScapeOn = true
			}
		},
		/**
		 * 开关 是否显示寻景图层
		 * @param turnOn
		 */
		switchStreetScape(turnOn?: boolean) {
			if (turnOn === undefined) {
				this.isStreetScapeOn = !this.isStreetScapeOn
			} else {
				this.isStreetScapeOn = turnOn
			}
		},
		clear() {
			// 清除点选图片列表
			this.selectedIndexMap = {}
			// 清除寻景
			this.preStreetScapeList.splice(0)
			this.streetScapeList.splice(0)
			this.isStreetScapeOn = false
			// 清除鼠标记录
			this.startMouseIndex = -1
			this.currentMouseIndex = -1
		},
		setPreference(val: number) {
			this.preferenceRadius = val
		},
		initMaxPreference(val: number) {
			this.maxPreference = val
		},
		/** 获取900个点的二维数组 */
		getIndexArray() {
			const row = this.renderRow
			const column = Math.floor(this.renderCount / this.renderRow)

			const arr = []
			for (let i = 0; i < row; i++) {
				for (let j = 0; j < column; j++) {
					arr.push({
						row: i,
						column: j,
						id: i * row + j,
					})
				}
			}
			return arr
		},
		/** 选中的id列表，获取他们在二维数组中的位置 */
		selectedIdsToArray(indexes: number[]) {
			return indexes.map(index => {
				const row = Math.floor(index / this.renderRow)
				const column = index % this.renderRow
				return {
					row,
					column,
				}
			})
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
					arr.push(Math.max(0, j) * this.renderRow + i)
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
		/** 选中的ids */
		selectedIds() {
			return Object.entries(this.allSelectedPicIndexData)
				.filter(item => {
					return item[1]
				})
				.map(item => Number(item[0]))
		},
		streetscapeOpacityList() {
			const isOn = this.isStreetScapeOn as boolean
			const scapeList: StreetScapeType[] = this.streetScapeList
			return isOn ? scapeList : null
		},
	},
})
