<script setup lang="ts">
import { computed, ref } from 'vue'
import Map from '@/components/Map/index.vue'
import PicGrid from '@/components/PicGrid/index.vue'
import CustomSlider from './components/CustomSlider.vue'
import { useFeatureStore } from '@/store/feature'
import useOutStore from '@/store/out'
import { useMapGridStore } from '@/store/mapGrid'
import ChangePage from '@/components/ChangePage/index.vue'
import { Splitpanes, Pane } from 'splitpanes'
import { ConfigNameEnum, useConfigStore } from '@/store/config'
import Poi from './components/Poi.vue'
import Preference from './components/Preference.vue'

const emit = defineEmits(['prevPage', 'nextPage'])

const isPicTextCollapse = ref(true)
const configStore = useConfigStore()
const featureStore = useFeatureStore()
const mapGridStore = useMapGridStore()
const outStore = useOutStore()
const mapRef = ref<typeof Map | null>(null)

/** 是否滑动后执行寻址 */
const isImmi = computed(() => configStore.getConfig(ConfigNameEnum['滑块是否在滑动后立即执行一次寻址']))
const splitRange = computed(() => {
	const value = configStore.getConfig(ConfigNameEnum['侧边栏比例（设置60，代表左侧占比60%。取值范围0-100）'])
	const leftVal = isNaN(Number(value)) ? 50 : Math.min(100, Math.max(0, Number(value)))

	return [leftVal, 100 - leftVal]
})
featureStore.initFeatureState()

const features = computed(() => featureStore.featureConfigs)

/** 寻址 */
const findLocation = () => {
	mapRef.value?.markPoint(outStore.selectedCoordinated)
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

/** 地景关系 */
const turnOnPreferance = () => {
	const preferenceColorList = Object.entries(outStore.allPointsPreferenceValue.pointColors).filter(
		item => item[1] !== null
	)

	mapRef.value?.markPreference(preferenceColorList, featureStore.coordinateData)
}

/** 清空 */
const clear = () => {
	mapGridStore.clear()
	featureStore.clear()
	mapRef.value?.clear()
}

/** 点选poi */
const changeCheckbox = () => {
	findLocation()
}

const checkFeature = () => {
	isImmi.value && findLocation()
}

const handlePicTextCollapse = () => {
	isPicTextCollapse.value = !isPicTextCollapse.value
}
</script>

<template>
	<Splitpanes
		class="default-theme"
		:style="{
			gap: '1px',
		}"
	>
		<Pane :size="splitRange[0]">
			<el-aside class="page-map-container__aside">
				<div class="page-map-container__aside-left">
					<div class="page-map-container__left-button-container">
						<div class="page-map-container__left-button-container-left">
							<div class="title">{{ $t('page3.title') }}</div>
							<CustomSlider
								v-for="item in features"
								v-bind="item"
								v-model:rangeValue="item.value"
								:key="item.title.zh || item.title.en"
								@checkFeature="checkFeature"
							/>
						</div>
					</div>
					<div class="page-map-container__left-map-container">
						<Map ref="mapRef" />
					</div>
				</div>
				<div class="page-map-container__aside-right">
					<el-space class="page-map-container__aside-right__top" direction="vertical" size="small">
						<el-button @click="findLocation">{{ $t('page3.findGeo') }}</el-button>
						<el-button @click="findStreetscape">{{ $t('page3.findStreet') }}</el-button>
						<el-button @click="switchVisible">{{ $t('page3.hide') }}</el-button>
						<el-button @click="turnOnGroundStreetScape">{{ $t('page3.grondSteet') }}</el-button>
						<el-button @click="turnOnPreferance">{{ $t('page3.preferenceBtn') }}</el-button>
						<el-button @click="clear">{{ $t('page3.default') }}</el-button>
					</el-space>
					<ElDivider />
					<div
						:style="{
							'overflow-y': 'auto',
							overflowX: 'hidden',
						}"
					>
						<Poi @changeCheckbox="changeCheckbox" />
					</div>
				</div>
			</el-aside>
		</Pane>
		<Pane :size="splitRange[1]">
			<el-main
				:style="{
					'justify-content': 'center',
					'background-color': '#fff',
					height: '100%',
					padding: '8px',
				}"
			>
				<ElSpace
					:style="{
						gap: '0px',
					}"
					class="pic-map-container"
					direction="vertical"
					alignment="flex-end"
				>
					<ChangePage direction="prev" @click="emit('prevPage')" />
					<div class="pic-map-container__text">
						<p class="intro__title">
							{{ $t('page3.introText') }}
						</p>
						<template v-if="!isPicTextCollapse">
							<ElDivider />
							<p class="intro__title">{{ $t('page3.introText2') }}</p>
							<p>
								{{ $t('page3.introText3') }}
							</p>
							<p class="intro__title">{{ $t('page3.introText4') }}</p>
							<p>
								{{ $t('page3.introText5') }}
							</p>
							<p class="intro__title">{{ $t('page3.introText6') }}</p>
							<p>
								{{ $t('page3.introText7') }}
							</p>
						</template>
						<ElButton
							:style="{
								width: '100%',
							}"
							@click="handlePicTextCollapse"
						>
							{{ $t('page3.introCollapse') }}
						</ElButton>
					</div>
				</ElSpace>
				<div class="pic-grid-title">
					<p
						:style="{
							padding: '10px 0',
							textAlign: 'center',
							fontFamily: 'PingFangSC-Thin',
							color: '#444444',
							fontSize: '20px',
						}"
					>
						{{ $t('page3.gridTitle') }}
					</p>
					<Preference />
				</div>
				<div>
					<PicGrid />
				</div>
			</el-main>
		</Pane>
	</Splitpanes>
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
		height: 100%;
		width: 100%;
		transition: all 0.18s ease-in-out;
		position: relative;
		z-index: 2;
		overflow: visible;
		display: flex;

		&-left {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		&-right {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 80px 10px 4px 10px;
			&__top {
				justify-content: center;
				padding: 0 10px;
				::v-deep(.el-space__item) {
					width: 100%;

					.el-button {
						height: fit-content;
						word-break: break-all;
						white-space: nowrap;
					}
				}
			}
		}
	}

	// 左侧按钮容器
	&__left-button-container {
		border-radius: 4px;
		padding: 8px 4px;
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
				font-family: 'PingFang-Thin';
			}
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

.pic-map-container {
	&__text {
		p {
			padding-top: 5px;
			padding-bottom: 5px;
			display: flex;
			justify-content: left;
			align-items: center;
			line-height: 28px;
			font-size: 14px;
			font-family: 'PingFang';
			text-align: justify;
			color: #444444;
		}
	}
}

.intro__title {
	font-weight: bold;
}

.pic-grid-title {
	display: flex;
	justify-content: space-between;
}
</style>
