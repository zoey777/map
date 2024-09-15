<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { mapConfig } from './constant'

const map = ref<any>()
const loading = ref(true)
onMounted(async () => {
	window._AMapSecurityConfig = {
		securityJsCode: import.meta.env.VITE_JS_SECURITY_KEY,
	}

	const AMap = await AMapLoader.load({
		key: import.meta.env.VITE_JS_API_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ['AMap.DistrictSearch', 'AMap.ToolBar', 'AMap.ControlBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	})

	// 创建Map
	map.value = new AMap.Map('container', {
		expendZoomRange: true,
		zoom: 10,
		zooms: [8, 30],
		center: mapConfig.HONGKONG.center,
		showIndoorMap: false,
		mapStyle: 'amap://styles/grey',
		showLabel: true,
		doubleClickZoom: false,
	})

	// 香港地区覆盖层
	new AMap.DistrictSearch({
		extensions: 'all',
		subdistrict: 0,
	}).search(mapConfig.HONGKONG.name, function (status: any, result: any) {
		status
		const outer = [
			new AMap.LngLat(-360, 90, true),
			new AMap.LngLat(-360, -90, true),
			new AMap.LngLat(360, -90, true),
			new AMap.LngLat(360, 90, true),
		]
		const holes = result.districtList[0].boundaries

		const pathArray = [outer]
		pathArray.push.apply(pathArray, holes)
		const polygon = new AMap.Polygon({
			pathL: pathArray,
			strokeColor: '#000',
			strokeWeight: 0,
			fillColor: '#fcf7e3',
			fillOpacity: 0.8,
		})

		polygon.setPath(pathArray)
		map.value.add(polygon)
		loading.value = false
	})
})

onUnmounted(() => {
	map.value.destroy()
})
</script>

<template>
	<div id="container" class="container" v-loading="loading"></div>
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
