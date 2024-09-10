<script lang="ts" setup>
import { useMapGridStore } from '@/store/mapGrid'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{
	path: string
	index: number
}>()

const mapGridStore = useMapGridStore()
const { isMousedown, selectedIndexes, tempSelectedIndexes } = storeToRefs(mapGridStore)
const { setMousedown, setMouseup, setEndIndex, newMouse } = mapGridStore

const handleMousedown = () => {
	newMouse()
	setMousedown(props.index)
}
const handleMouseup = () => {
	setMouseup()
}

const handleMouseEnter = () => {
	if (isMousedown) {
		setEndIndex(props.index)
	}
}

const isSelected = computed(() => {
	return selectedIndexes.value.includes(props.index)
})

const isTempSelected = computed(() => {
	return tempSelectedIndexes.value.length !== 0 && tempSelectedIndexes.value.includes(props.index)
})
</script>
<template>
	<div class="pic-box" @mousedown="handleMousedown" @mouseup="handleMouseup" @mouseenter="handleMouseEnter">
		<div
			class="pic-box__mask"
			:class="{
				'pic-box__mask-selected': isTempSelected || isSelected,
			}"
		>
			<img :src="props.path" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.pic-box {
	background-color: rgba(0, 0, 0, 0.05);
	display: flex;
	aspect-ratio: 1;
	cursor: pointer;
	position: relative;
	user-select: none;

	img {
		width: 100%;
		aspect-ratio: 1;
		pointer-events: none;
		font-size: 0;
		line-height: 0;
	}

	&__mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all ease-in-out 0.15s;

		&-selected {
			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: calc(100% - 2px);
				height: calc(100% - 2px);
				border: 2px solid #fc9628;
				z-index: 10;
			}
		}
	}
}
</style>
