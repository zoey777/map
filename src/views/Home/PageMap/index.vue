<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import Map from '@/components/Map/index.vue'
import PicGrid from '@/components/PicGrid/index.vue'
import CustomSlider from './components/CustomSlider.vue'
import { useFeatureStore } from '@/store/feature'
import useOutStore from '@/store/out'
import { useMapGridStore } from '@/store/mapGrid'
import _ from 'lodash'
import { CheckboxValueType } from 'element-plus'
import ChangePage from '@/components/ChangePage/index.vue'
import { Splitpanes, Pane } from 'splitpanes'
import { ConfigNameEnum, useConfigStore } from '@/store/config'

const emit = defineEmits(['prevPage', 'nextPage'])

const isPicTextCollapse = ref(true)
const configStore = useConfigStore()
const featureStore = useFeatureStore()
const mapGridStore = useMapGridStore()
const outStore = useOutStore()
const mapRef = ref<typeof Map | null>(null)

// 是否折叠
const isCollapse = ref(true)

/** 是否滑动后执行寻址 */
const isImmi = computed(() => configStore.getConfig(ConfigNameEnum['滑块是否在滑动后立即执行一次寻址']))
/** 是否是面板分割模式 */
const isSplitPane = computed(() => configStore.getConfig(ConfigNameEnum['是否手动面板分割']))

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

/** 清空 */
const clear = () => {
	mapGridStore.clear()
	featureStore.clear()
	mapRef.value?.clear()
}

const poiKeysRow = computed(() => {
	return _.chunk(featureStore.poiKeys, 2)
})

/** 点选poi */
const changeCheckbox = (val: CheckboxValueType, key: string) => {
	featureStore.checkPoi(key, Boolean(val))
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
		v-if="isSplitPane"
		:style="{
			gap: '1px',
		}"
	>
		<Pane>
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
							<ElDivider />
							<ElRow v-for="item in poiKeysRow" :key="`${item[0]}${item[1]}`">
								<ElCol :span="12" v-for="key in item" :key="key">
									<ElCheckbox
										@change="val => changeCheckbox(val, key)"
										:modelValue="featureStore.selectedPoiKeys.includes(key)"
									>
										{{ $t(`page3.${key}`) }}
									</ElCheckbox>
								</ElCol>
							</ElRow>
							<ElDivider />
						</div>

						<el-space
							class="page-map-container__left-button-container-right"
							direction="vertical"
							size="small"
						>
							<el-button @click="findLocation">{{ $t('page3.findGeo') }}</el-button>
							<el-button @click="findStreetscape">{{ $t('page3.findStreet') }}</el-button>
							<el-button @click="switchVisible">{{ $t('page3.hide') }}</el-button>
							<el-button @click="turnOnGroundStreetScape">{{ $t('page3.grondSteet') }}</el-button>
							<el-button @click="clear">{{ $t('page3.default') }}</el-button>
						</el-space>
					</div>
					<div class="page-map-container__left-map-container">
						<Map ref="mapRef" />
					</div>
				</div>
				<div
					v-if="!isSplitPane"
					@click="() => (isCollapse = !isCollapse)"
					class="page-map-container__collaspe_btn"
				>
					<el-button>
						<el-icon>
							<ArrowRight v-if="isCollapse" />
							<ArrowLeft v-else />
						</el-icon>
					</el-button>
				</div>
			</el-aside>
		</Pane>
		<Pane>
			<el-main
				:style="{
					'justify-content': 'center',
					'background-color': '#fff',
					height: '100%',
				}"
			>
				<ElSpace class="pic-map-container" direction="vertical" alignment="flex-end">
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
				<div>
					<PicGrid />
				</div>
			</el-main>
		</Pane>
	</Splitpanes>
	<!-- </el-container> -->
	<el-container class="page-map-container" v-else>
		<el-aside
			:style="{
				width: isCollapse ? '40%' : '68%',
			}"
			class="page-map-container__aside"
		>
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
						<ElDivider />
						<ElRow v-for="item in poiKeysRow" :key="`${item[0]}${item[1]}`">
							<ElCol :span="12" v-for="key in item" :key="key">
								<ElCheckbox
									@change="val => changeCheckbox(val, key)"
									:modelValue="featureStore.selectedPoiKeys.includes(key)"
								>
									{{ $t(`page3.${key}`) }}
								</ElCheckbox>
							</ElCol>
						</ElRow>
						<ElDivider />
					</div>

					<el-space class="page-map-container__left-button-container-right" direction="vertical" size="small">
						<el-button @click="findLocation">{{ $t('page3.findGeo') }}</el-button>
						<el-button @click="findStreetscape">{{ $t('page3.findStreet') }}</el-button>
						<el-button @click="switchVisible">{{ $t('page3.hide') }}</el-button>
						<el-button @click="turnOnGroundStreetScape">{{ $t('page3.grondSteet') }}</el-button>
						<el-button @click="clear">{{ $t('page3.default') }}</el-button>
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
		<ElDivider
			direction="vertical"
			:style="{
				height: 0,
			}"
		/>

		<el-main
			:style="{
				'justify-content': 'center',
				'background-color': '#fff',
			}"
		>
			<ElSpace class="pic-map-container" direction="vertical" alignment="flex-end">
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
			<div>
				<PicGrid />
			</div>
		</el-main>
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
		height: 100%;
		width: 100%;
		transition: all 0.18s ease-in-out;
		position: relative;
		z-index: 2;
		overflow: visible;

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
				font-weight: lighter;
				font-family: 'PingFang';
			}
		}
		&-right {
			max-width: 180px;
			overflow: auto;
			justify-content: center;
			padding: 0 10px;
			::v-deep(.el-space__item) {
				width: 100%;

				.el-button {
					height: fit-content;
					word-break: break-all;
					white-space: normal;
				}
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
			font-size: 15px;
			font-family: 'PingFang';
			text-align: justify;
			color: #444444;
		}
	}
}

.intro__title {
	font-weight: bold;
}
</style>
