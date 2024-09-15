<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { SUPPORTED_CITY, useMap } from './map'

const containerRef = ref<HTMLElement | null>(null)
const { init, destroy, loading, load } = useMap(SUPPORTED_CITY['香港'])

onMounted(async () => {
	await init()
	load(containerRef)
})

onUnmounted(() => {
	destroy()
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
