import AMapLoader from '@amap/amap-jsapi-loader'
import { Ref, ref } from 'vue'

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
		data: LngLat[]
		callback: (result: { index: number; lnglat: LngLat; isInclude: boolean }[]) => void
	}
}
/**
 *
 * @param id html容器id
 * @returns
 */
export const useMap = (city: SUPPORTED_CITY, callbacks: MapCallbacks) => {
	const config = mapConfig[city]

	const map = ref<any>(null)
	const loading = ref<boolean>(true)
	const AMap = ref<any>(null)

	const init = async () => {
		// 调用init初始化key
		window._AMapSecurityConfig = {
			securityJsCode: import.meta.env.VITE_JS_SECURITY_KEY,
		}

		AMap.value = await AMapLoader.load({
			key: import.meta.env.VITE_JS_API_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
			version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: ['AMap.DistrictSearch', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.MouseTool'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
		})
	}

	const load = async (container: Ref<HTMLElement | null>) => {
		if (!container.value || !container.value?.id) {
			throw new Error(`没有找到id为${container}的容器.`)
		}

		// 创建Map
		map.value = new AMap.value.Map(container.value.id, {
			expendZoomRange: true,
			zoom: 10,
			zooms: [8, 30],
			center: config.center,
			showIndoorMap: false,
			mapStyle: 'amap://styles/grey',
			showLabel: true,
			doubleClickZoom: false,
		})

		await loadPlugin(map)
	}

	const loadPlugin = async (map: any) => {
		surrondCity(map)
		pluginMouseTool(map)
	}

	/** 地图边界隐藏 */
	const surrondCity = (map: any) => {
		// 香港地区覆盖层
		new AMap.value.DistrictSearch({
			extensions: 'all',
			subdistrict: 0,
		}).search(config.name, function (status: any, result: any) {
			status
			const outer = [
				new AMap.value.LngLat(-360, 90, true),
				new AMap.value.LngLat(-360, -90, true),
				new AMap.value.LngLat(360, -90, true),
				new AMap.value.LngLat(360, 90, true),
			]
			const holes = result.districtList[0].boundaries
			// 香港
			const pathArray = [outer, ...holes]

			const polygon = new AMap.value.Polygon({
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
	}

	/** 绘制多边形 */
	const pluginMouseTool = async (map: any) => {
		const mouseTool = await new AMap.value.MouseTool(map.value)

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
			const data = callbacks.onDraw.data
			callbacks.onDraw.callback(
				data.map((lnglat, index) => {
					return {
						index,
						lnglat,
						isInclude: obj.contains(lnglat),
					}
				})
			)
		})
	}
	const destroy = () => {
		map.value && map.value.destroy()
	}

	return {
		init,
		load,
		loading,
		destroy,
	}
}
