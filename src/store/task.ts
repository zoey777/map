import { TaskNodeType } from '@/views/Home/types'
import { defineStore } from 'pinia'

interface TaskStoreStateType {
	taskBookId: number
	taskNodes: TaskNodeType[]
}

export const useTaskStore = defineStore('task', {
	state: () =>
		({
			taskBookId: -1,
			taskNodes: [],
		}) as TaskStoreStateType,
	actions: {
		/**
		 * 更新对应id节点的完成状态。
		 * 当前节点完成状态，会改变被依赖节点的依赖待完成数量
		 */
		updateCompleteStatus(id: number, isComplete: boolean) {
			const target = this.taskNodes.find(item => item.id === id)
			if (!target) return

			target.status.isComplete = isComplete

			// 更新依赖节点
			const depIds = target.dependentsProperty.depIds

			// 更新依赖该节点的待完成数量
			depIds.forEach(depId => {
				const depNode = this.taskNodes.find(item => item.id === depId)
				if (depNode) {
					depNode.dependentsProperty.neededCompleteCount += isComplete ? -1 : 1

					if (depNode.dependentsProperty.neededCompleteCount <= 0) {
						depNode.status.isActive = true
					}
				}
			})
		},
		/**
		 * 根据taskBook的id初始化任务节点列表
		 */
		initTaskNode() {
			this.taskNodes.splice(0)
			this.taskNodes.push(
				{
					id: 1,
					data: {
						title: '第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务第一个任务',
						subTitle: '123',
						description:
							'任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述',
					},
					status: {
						isComplete: false,
						isActive: true,
					},
					dependentsProperty: {
						depIds: [2],
						neededCompleteCount: 0,
					},
				},
				{
					id: 2,
					data: {
						title: '第二个任务',
						subTitle: '123',
						description: '任务描述',
					},
					status: {
						isComplete: false,
						isActive: false,
					},
					dependentsProperty: {
						depIds: [],
						neededCompleteCount: 0,
					},
				}
			)
		},
		/**
		 * 添加一个节点
		 */
		addTaskNode() {},
		/**
		 * 保存任务书
		 */
		saveTaskBook() {},
	},
	getters: {},
})
