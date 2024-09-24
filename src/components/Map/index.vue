<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { SUPPORTED_CITY, useMap } from './map'
import { useFeatureStore } from '@/store/feature'
import { StreetScapeType, useMapGridStore } from '@/store/mapGrid'

const featureStore = useFeatureStore()
const mapGridStore = useMapGridStore()
const { init, destroy, loading, load, markPoint, markGroundStreetscape, clear } = useMap(SUPPORTED_CITY['香港'], {
	onDraw: {
		callback(containsFn: (point: [number, number]) => boolean) {
			const coordinateData = featureStore.coordinateData

			const res: StreetScapeType[] = Object.entries(coordinateData).map(([key, value]) => {
				const count = value.filter(lnglat => containsFn(lnglat)).length
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

const ID = 'container'
onMounted(async () => {
	await init()
	await load(ID)
})

onUnmounted(() => {
	destroy()
})

defineExpose({
	markPoint,
	markGroundStreetscape,
	clear,
})
</script>

<template>
	<div :id="ID" class="container" v-loading="loading"></div>
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
