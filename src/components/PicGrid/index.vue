<script lang="ts" setup>
import { useMapGridStore } from '@/store/mapGrid'
import PicBox from './components/PicBox.vue'
import { computed, onMounted, onUnmounted, toRefs } from 'vue'
import { useFeatureStore } from '@/store/feature'
import useOutStore from '@/store/out'

const mapGridStore = useMapGridStore()
const featureStore = useFeatureStore()
const outStore = useOutStore()
const { recordMousedown, recordMouseup, recordMousemove } = mapGridStore
const { allSelectedPicIndexData, isStreetScapeOn, preferenceRadius } = toRefs(mapGridStore)
const { includedIds, isGroundStreetScapeOn } = toRefs(featureStore)

const preferenceColorList = computed(() => outStore.allPointsPreferenceValue.pointColors)

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
			:selected="Boolean(allSelectedPicIndexData[index])"
			:featureSelectd="includedIds.includes(index)"
			:featureSelected="featureStore.includedIds.includes(index)"
			:streetScapeProperty="isStreetScapeOn ? mapGridStore.streetScapeList[index] || null : null"
			:groundStreetColorRGB="isGroundStreetScapeOn ? featureStore.groundStreetscapeColorRGB[index] : null"
			:preferenceColor="preferenceRadius === 0 ? null : preferenceColorList[index]"
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
		gap: 0;
	}
}
</style>
