import { defineStore } from 'pinia'

interface DefaultState {
	selectedIndexes: number[]
	tempSelectedIndexes: number[]
	renderCount: number
	renderRow: number
	isMousedown: boolean
	startIndex: number
	endIndex: number
	startRow: number
	endRow: number
	startColumn: number
	endColumn: number
}
const defaultState: DefaultState = {
	selectedIndexes: [],
	tempSelectedIndexes: [],
	renderCount: 900,
	renderRow: 30,
	isMousedown: false,
	startIndex: -1,
	endIndex: -1,
	startRow: -1,
	endRow: -1,
	startColumn: -1,
	endColumn: -1,
}
export const useMapGridStore = defineStore('map', {
	state: () => defaultState,
	actions: {
		setMousedown(index: number) {
			this.isMousedown = true
			this.startIndex = index

			this.startRow = Math.floor(index / this.renderRow)
			this.startColumn = index % this.renderRow
			this.setEndIndex(index)
		},
		setMouseup(isRoot = false) {
			if (isRoot) {
				this.isMousedown = false
			} else {
				// // 如果相同横纵，则表示点击。反选
				// if (this.tempSelectedIndexes.length <= 1) {
				// 	this.deleteSelect(this.startIndex)
				// }
				this.addToSelected()
			}
		},
		setEndIndex(index: number) {
			if (this.isMousedown) {
				this.endIndex = index
				this.endRow = Math.floor(index / this.renderRow)
				this.endColumn = index % this.renderRow
				this.setTempSelected()
			}
		},
		// 新一次鼠标选择
		newMouse() {
			this.startIndex = -1
			this.endIndex = -1
			this.startRow = -1
			this.startColumn = -1
			this.endRow = -1
			this.endColumn = -1
		},
		// 添加到已选中列表
		addToSelected() {
			this.tempSelectedIndexes.forEach(item => {
				if (!this.selectedIndexes.includes(item)) {
					this.selectedIndexes.push(item)
				}
			})
			this.tempSelectedIndexes.splice(0)
		},
		// 添加到已选中列表
		setTempSelected() {
			const valueList = []
			const { startRow, startColumn, endRow, endColumn } = this.getMapRowColumn
			for (let i = startColumn; i <= endColumn; i++) {
				for (let j = startRow; j <= endRow; j++) {
					valueList.push(i + j * this.renderRow)
				}
			}

			this.tempSelectedIndexes = valueList
		},
		deleteSelect(index: number) {
			if (this.selectedIndexes.includes(index)) {
				if (this.selectedIndexes.indexOf(index) !== -1) {
					this.selectedIndexes = this.selectedIndexes.filter(item => !this.tempSelectedIndexes.includes(item))
				}
			}
		},
	},
	getters: {
		getMapRowColumn(state) {
			let startRow = -1,
				endRow = -1,
				startColumn = -1,
				endColumn = -1
			if (state.endRow < state.startRow) {
				startRow = state.endRow
				endRow = state.startRow
			} else {
				startRow = state.startRow
				endRow = state.endRow
			}
			if (state.endColumn < state.startColumn) {
				startColumn = state.endColumn
				endColumn = state.startColumn
			} else {
				startColumn = state.startColumn
				endColumn = state.endColumn
			}
			return {
				startRow,
				endRow,
				startColumn,
				endColumn,
			}
		},
	},
})
