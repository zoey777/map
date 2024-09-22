<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { SUPPORTED_CITY, useMap } from './map'

const containerRef = ref<HTMLElement | null>(null)
const { init, destroy, loading, load, markPoint } = useMap(SUPPORTED_CITY['香港'], {
	onDraw: {
		data: [[114.15818, 22.281928]],
		callback: result => {
			console.log(result)
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
