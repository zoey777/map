<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { SUPPORTED_CITY, useMap } from './map'
import { useFeatureStore } from '@/store/feature'
import { StreetScapeType, useMapGridStore } from '@/store/mapGrid'

const featureStore = useFeatureStore()
const mapGridStore = useMapGridStore()
const containerRef = ref<HTMLElement | null>(null)
const { init, destroy, loading, load, markPoint, markGroundStreetscape } = useMap(SUPPORTED_CITY['香港'], {
	onDraw: {
		callback(containsFn: (point: [number, number]) => boolean) {
			const coordinateData = featureStore.coordinateData

			const res: StreetScapeType[] = Object.entries(coordinateData).map(([key, value]) => {
				const count = value.filter(item => containsFn([item[1], item[0]])).length
				return {
					picIndex: Number(key),
					count,
					opacity: Math.min(1, count * 0.1),
				}
			})

			mapGridStore.setStreetScapeList(res, false)
		},
	},
})

onMounted(async () => {
	await init()
	await load(containerRef)
})

onUnmounted(() => {
	destroy()
})

defineExpose({
	markPoint,
	markGroundStreetscape,
})
</script>

<template>
	<div id="container" class="container" v-loading="loading" ref="containerRef"></div>
</template>

<style lang="less" scoped>
.container {
	width: 100%;
	height: 100%;
}

.skeleton {
	width: 100%;
	height: 100%;
}
</style>
