<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const map = ref<any>()
onMounted(() => {
	AMapLoader.load({
		key: import.meta.env.VITE_JS_API_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	})
		.then(AMap => {
			map.value = new AMap.Map('container', {
				// 设置地图容器id
				viewMode: '3D', // 是否为3D地图模式
				zoom: 11, // 初始化地图级别
				center: [116.397428, 39.90923], // 初始化地图中心点位置
			})
		})
		.catch(e => {
			console.log(e)
		})
})

onUnmounted(() => {
	map.value.destroy()
})
</script>

<template>
	<div id="container"></div>
</template>

<style scoped>
#container {
	width: 100%;
	height: 100%;
}
</style>
