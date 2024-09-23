<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import Map from '@/components/Map/index.vue'
import PicGrid from '@/components/PicGrid/index.vue'
import CustomSlider from './components/CustomSlider.vue'
import { useFeatureStore } from '@/store/feature'
import useOutStore from '@/store/out'
import { useMapGridStore } from '@/store/mapGrid'

const featureStore = useFeatureStore()
const mapGridStore = useMapGridStore()
const outStore = useOutStore()
const mapRef = ref<typeof Map | null>(null)

// 是否折叠
const isCollapse = ref(true)

featureStore.initFeatureState()

const features = computed(() => featureStore.featureConfigs)

/** 寻址 */
const findLocation = () => {
	mapRef.value && mapRef.value.markPoint(outStore.selectedCoordinated)
}

/**
 * 寻景
 * 地图框选的点
 */
const findStreetscape = () => {
	mapGridStore.setStreetScapeList([], true)
}

/** 隐藏/显示 */
const switchVisible = () => {
	mapGridStore.switchStreetScape()
}

/** 地景关系 */
const turnOnGroundStreetScape = () => {
	mapRef.value?.markGroundStreetscape(
		Object.entries(featureStore.groundStreetscapeColor),
		featureStore.coordinateData
	)
	featureStore.setGroundStreetscapeColorOn()
}

/** 清空 */
const clear = () => {
	mapGridStore.clear()
	featureStore.clear()
	mapRef.value?.clear()
}
</script>

<template>
	<el-container class="page-map-container">
		<el-aside
			:style="{
				width: isCollapse ? '40%' : '68%',
			}"
			class="page-map-container__aside"
		>
			<div class="page-map-container__aside-left">
				<div class="page-map-container__left-button-container">
					<div class="page-map-container__left-button-container-left">
						<div class="title">街 景 搜 索 引 擎 — 香 港 站</div>
						<CustomSlider
							v-for="item in features"
							v-bind="item"
							v-model:rangeValue="item.value"
							:key="item.title.zh || item.title.en"
						/>
					</div>

					<el-space class="page-map-container__left-button-container-right" direction="vertical" size="small">
						<el-button @click="findLocation">寻址</el-button>
						<el-button @click="findStreetscape">寻景</el-button>
						<el-button @click="switchVisible">隐藏/显示</el-button>
						<el-button @click="turnOnGroundStreetScape">地景关系</el-button>
						<el-button @click="clear">清空</el-button>
					</el-space>
				</div>
				<div class="page-map-container__left-map-container">
					<Map ref="mapRef" />
				</div>
			</div>
			<div @click="() => (isCollapse = !isCollapse)" class="page-map-container__collaspe_btn">
				<el-button>
					<el-icon>
						<ArrowRight v-if="isCollapse" />
						<ArrowLeft v-else />
					</el-icon>
				</el-button>
			</div>
		</el-aside>
		<el-container>
			<el-main
				:style="{
					'justify-content': 'center',
				}"
			>
				<PicGrid />
			</el-main>
		</el-container>
	</el-container>
</template>
<style lang="less" scoped>
.page-map-container {
	height: 100%;
	padding: 4px;
	overflow: auto;
	::v-deep(.amap-container) {
		height: 100% !important;
	}

	position: relative;
	&__aside {
		width: 200px;
		transition: all 0.5s ease-in-out;
		position: relative;
		z-index: 2;
		overflow: visible;
		min-width: 280px;

		&-left {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	}

	// 左侧按钮容器
	&__left-button-container {
		border-radius: 4px;
		padding: 4px;
		width: 100%;
		display: flex;
		height: 52%;
		background-color: #fff;

		&-left {
			flex: 1;
			overflow-x: auto;
			padding-right: 20px;
			padding-left: 8px;
			// 标题
			.title {
				padding-top: 20px;
				margin-bottom: 12px;
				width: 100%;
				text-align: center;
				font-size: 25px;
				font-weight: lighter;
				font-family: 'PingFang';
			}
		}
		&-right {
			overflow: auto;
			justify-content: center;
		}
	}

	// 左侧地图容器
	&__left-map-container {
		flex: 1;
	}

	&__collaspe_btn {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 3;
		width: fit-content;
	}
}
</style>
