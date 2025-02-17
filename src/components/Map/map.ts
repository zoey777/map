import { CoordinateDataType } from '@/store/feature'
import genSVG from '@/tools/genSVG'
import AMapLoader from '@amap/amap-jsapi-loader'
import { ref } from 'vue'

export enum SUPPORTED_CITY {
	'香港' = 'HONG_KONG',
}

type MapConfigItem = {
	name: string
	center: [number, number]
}

export const mapConfig: Record<SUPPORTED_CITY, MapConfigItem> = {
	HONG_KONG: {
		name: '香港',
		center: [114.15818, 22.281928],
	},
}

type LngLat = [number, number]
interface MapCallbacks {
	onDraw: {
		callback: (containsFn: (point: LngLat) => boolean) => void
	}
}
/**
 *
 * @param id html容器id
 * @returns
 */
export const useMap = (city: SUPPORTED_CITY, callbacks: MapCallbacks) => {
	const config = mapConfig[city]
	const loading = ref<boolean>(true)

	let map: any = null
	let AMap: any = null
	let mouseTool: any = null
	let labelsLayer: any = null
	let groundStreetLabelsLayer: any = null
	let preferenceLabelsLayer: any = null
	const labelMarkerList: any = []
	const groundStreetscapeLabelMarkerList: any = []
	const preferenceLabelMarkerList: any = []

	const init = async () => {
		// 调用init初始化key
		window._AMapSecurityConfig = {
			securityJsCode: import.meta.env.VITE_JS_SECURITY_KEY,
		}

		AMap = await AMapLoader.load({
			key: import.meta.env.VITE_JS_API_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
			version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: ['AMap.DistrictSearch', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.MouseTool'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
		})
	}

	const load = async (container: string) => {
		// 创建Map
		map = new AMap.Map(container, {
			expendZoomRange: true,
			zoom: 10,
			zooms: [8, 30],
			center: config.center,
			showIndoorMap: false,
			mapStyle: 'amap://styles/grey',
			showLabel: true,
			doubleClickZoom: false,
		})

		loadLayer()
		await loadPlugin(map)
	}

	/** 添加图层 */
	const loadLayer = () => {
		/** labelMarker图层 */
		labelsLayer = new AMap.LabelsLayer({
			zIndex: 1000,
			collision: false, //该层内标注是否避让
			allowCollision: false, //不同标注层之间是否避让
		})
		map.add(labelsLayer)

		/** 地景关系图层 */
		groundStreetLabelsLayer = new AMap.LabelsLayer({
			zIndex: 1000,
			collision: false, //该层内标注是否避让
			allowCollision: false, //不同标注层之间是否避让
		})
		/** 景趣偏好图层 */
		preferenceLabelsLayer = new AMap.LabelsLayer({
			zIndex: 1000,
			collision: false, //该层内标注是否避让
			allowCollision: false, //不同标注层之间是否避让
		})
		map.add(groundStreetLabelsLayer)
		map.add(preferenceLabelsLayer)
	}

	const loadPlugin = async (map: any) => {
		surrondCity(map)
		pluginMouseTool(map)
	}

	/** 地图边界隐藏 */
	const surrondCity = (map: any) => {
		// 香港地区覆盖层
		new AMap.DistrictSearch({
			extensions: 'all',
			subdistrict: 0,
		}).search(config.name, function (status: any, result: any) {
			status
			const outer = [
				new AMap.LngLat(-360, 90, true),
				new AMap.LngLat(-360, -90, true),
				new AMap.LngLat(360, -90, true),
				new AMap.LngLat(360, 90, true),
			]
			const holes = result.districtList[0].boundaries
			// 香港
			const pathArray = [outer, ...holes]

			const polygon = new AMap.Polygon({
				pathL: pathArray,
				strokeColor: '#000',
				strokeWeight: 0,
				fillColor: '#fcf7e3',
				fillOpacity: 0.8,
			})

			polygon.setPath(pathArray)
			map.add(polygon)
			loading.value = false
		})
	}

	/** 绘制多边形 */
	const pluginMouseTool = async (map: any) => {
		mouseTool = await new AMap.MouseTool(map)

		mouseTool.polygon({
			strokeColor: '#FF33FF', //轮廓线颜色
			strokeOpacity: 1, //轮廓线透明度
			strokeWeight: 2, //轮廓线宽度
			fillColor: '#1791fc', //多边形填充颜色
			fillOpacity: 0.4, //多边形填充透明度
			strokeStyle: 'solid', //线样式还支持 'dashed'
		})
		mouseTool.on('draw', function (event: any) {
			//event.obj 为绘制出来的覆盖物对象
			const obj = event.obj

			callbacks.onDraw.callback(obj.contains.bind(obj))
		})
	}

	/** 在地图中标记默认选中图片后的点 */
	const markPoint = (coordinateList: LngLat[]) => {
		labelMarkerList.forEach((marker: any) => {
			marker.remove()
		})
		labelMarkerList.splice(0)

		const markers = coordinateList.map(lnglat => {
			return new AMap.LabelMarker({
				position: lnglat,
				icon: {
					type: 'image',
					image: genSVG('#ffda05'),
					size: [1, 1],
					alwaysRender: false,
					anchor: 'bottom-center',
				},
			})
		})

		labelMarkerList.push(...markers)
		labelsLayer.add(labelMarkerList)
	}

	const markGroundStreetscape = (
		rgbList: [string, [number, number, number]][],
		coordinateData: CoordinateDataType
	) => {
		groundStreetscapeLabelMarkerList.forEach((marker: any) => {
			marker.remove()
		})
		groundStreetscapeLabelMarkerList.splice(0)

		const markers = rgbList
			.map(item => {
				const points = coordinateData[item[0]]
				return points.map(lnglat => {
					const [r, g, b] = item[1]
					return new AMap.LabelMarker({
						position: lnglat,
						icon: {
							type: 'image',
							image: genSVG(`rgb(${r},${g},${b})`),
							size: [1, 1],
							alwaysRender: false,
							anchor: 'bottom-center',
						},
					})
				})
			})
			.reduce((pre, cur) => pre.concat(cur), [])

		groundStreetscapeLabelMarkerList.push(...markers)
		groundStreetLabelsLayer.add(groundStreetscapeLabelMarkerList)
	}

	const markPreference = (hexList: string[], coordinateData: CoordinateDataType) => {
		preferenceLabelMarkerList.forEach((marker: any) => {
			marker.remove()
		})
		preferenceLabelMarkerList.splice(0)

		const markers = hexList
			.map(item => {
				const points = coordinateData[item[0]]
				return points.map(lnglat => {
					return new AMap.LabelMarker({
						position: lnglat,
						icon: {
							type: 'image',
							image: genSVG(item[1], 1),
							size: [1, 1],
							alwaysRender: false,
							anchor: 'bottom-center',
						},
					})
				})
			})
			.reduce((pre, cur) => pre.concat(cur), [])

		preferenceLabelMarkerList.push(...markers)
		preferenceLabelsLayer.add(preferenceLabelMarkerList)
	}

	const destroy = () => {
		map && map.destroy()
	}

	/** 清除地图内容 */
	const clear = () => {
		labelsLayer.clear()
		groundStreetLabelsLayer.clear()
		preferenceLabelsLayer.clear()
		mouseTool.close(true)
		pluginMouseTool(map)
	}

	return {
		init,
		load,
		loading,
		destroy,
		markPoint,
		markGroundStreetscape,
		markPreference,
		clear,
	}
}
