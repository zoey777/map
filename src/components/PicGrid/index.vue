<script lang="ts" setup>
import { useMapGridStore } from '@/store/mapGrid'
import PicBox from './components/PicBox.vue'
import { onMounted, onUnmounted, toRefs } from 'vue'

const mapGridStore = useMapGridStore()

const { recordMousedown, recordMouseup, recordMousemove } = mapGridStore
const { allSelectedPicIndexData } = toRefs(mapGridStore)
/** 获取点击元素的数据属性 */
const getElementInfo = (event: MouseEvent) => {
	const element = event.target as HTMLElement
	const attrs = element.dataset
	return {
		picIndex: attrs['picIndex'],
	}
}

const handleMousedown = (event: MouseEvent) => {
	if (event.button !== 0) {
		return
	}

	const { picIndex } = getElementInfo(event)
	if (!picIndex) {
		recordMousedown(-1)
		return
	}

	recordMousedown(Number(picIndex))
}

const handleMousemove = (event: MouseEvent) => {
	const { picIndex } = getElementInfo(event)
	if (!picIndex) return

	recordMousemove(Number(picIndex))
}

const handleMouseup = () => {
	recordMouseup()
}

onMounted(() => {
	window.addEventListener('mousedown', handleMousedown)
	window.addEventListener('mouseup', handleMouseup)
})

onUnmounted(() => {
	window.removeEventListener('mouseup', handleMouseup)
})
</script>

<template>
	<div class="pic-grid__container" @mousedown="handleMousedown($event)" @mousemove="handleMousemove($event)">
		<PicBox
			v-for="(item, index) in mapGridStore.renderCount"
			:key="item"
			:path="`/pics/${index}.jpg`"
			:selected="allSelectedPicIndexData[index]"
			:data-pic-index="index"
		/>
	</div>
</template>

<style lang="less" scoped>
.pic-grid {
	&__container {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		justify-content: space-around;
		display: grid;
		grid-template-columns: repeat(30, 1fr);
		grid-template-rows: repeat(10, 1fr);
		gap: 2px;
	}
}
</style>
