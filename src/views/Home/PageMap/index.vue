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

const emit = defineEmits(['prevPage', 'nextPage'])

const isPicTextCollapse = ref(true)

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
	findLocation()
}

const handlePicTextCollapse = () => {
	isPicTextCollapse.value = !isPicTextCollapse.value
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
							@checkFeature="checkFeature"
						/>
						<ElDivider />
						<ElRow v-for="item in poiKeysRow" :key="`${item[0]}${item[1]}`">
							<ElCol :span="12" v-for="key in item" :key="key">
								<ElCheckbox
									@change="val => changeCheckbox(val, key)"
									:modelValue="featureStore.selectedPoiKeys.includes(key)"
								>
									{{ key }}
								</ElCheckbox>
							</ElCol>
						</ElRow>
						<ElDivider />
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
		<ElDivider
			direction="vertical"
			:style="{
				height: 0,
			}"
		/>
		<el-container>
			<el-main
				:style="{
					'justify-content': 'center',
					'background-color': '#fff',
				}"
			>
				<ElSpace class="pic-map-container" direction="vertical" alignment="flex-end">
					<ChangePage direction="prev" @click="emit('prevPage')" />
					<div class="pic-map-container__text">
						<p>
							以下“特征地图”通过分析街景中纹理、形状、颜色，将香港全境街景按“视觉感知相似性”重新排列。
							相较于“地理地图”，“特征地图”是一种全新的城市形象呈现逻辑。因此，我们对城市形象的探索将变得更加灵活与有趣！现在，你可以尝试以下操作来进行街景信息的搜索：
						</p>
						<template v-if="isPicTextCollapse">
							<ElDivider />
							<p>1. 寻址：根据街景，迅速定位其在城市中的地理位置。</p>
							<p>
								·
								拖动左边的量值滑动条，看看“纹理”、“形状”、“颜色”的视觉复杂度变化，会在特征地图中形成怎样的街景？点击左侧“寻址”按键，进一步发现这些街景在“地理地图”中的分布。
								这项操作可应用于：城市色彩研究或艺术家寻找城市中色彩组合丰富的场址，城市驾驶导航中选择视觉体验简洁的道路，等场景。
								·
								按照你的喜好与想法，在“特征地图”中选择街景，点击“寻址”，发现这些街景在“地理地图”中分布。
								这项操作可应用于：城市热岛效应研究中定位城市高密度建筑街区，旅游者在城市中搜寻自然风光地带，等场景。
							</p>
							<p>2. 寻景：根据地理位置，了解其所包含街景的类型与特征。</p>
							<p>
								·
								在“地理地图”中以多段线选择目标区域位置，点击“寻景”，“特征地图”中便以颜色标记的热力图表示区域内街景的组成类型与数量，颜色越深表明此类型街景越多。这项操作可应用于：某区域街景形象的快速审计、区域内街景环境的异质性评估，街道视觉感受的节奏控制，等场景。
								“隐藏/显示”按键有助于更方便的查看对应街景类型。
							</p>
							<p>3. 地景关系：以色彩标记连接城市“特征地图”与“地理地图”，展现城市街景分布特征。</p>
							<p>
								·
								点击“地景关系”，“特征地图”被色谱标记，细粒度区分不同街景类型；同时，“地理地图”中相应以色彩点展示了城市街景分布。“隐藏/显示”按键有助于更方便的查看对应街景类型。
							</p>
						</template>
						<ElButton
							:style="{
								width: '100%',
							}"
							@click="handlePicTextCollapse"
						>
							- 展开/折叠 -
						</ElButton>
					</div>
					<PicGrid />
				</ElSpace>
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
		min-width: 375px !important;
		transition: all 0.5s ease-in-out;
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
			overflow: auto;
			justify-content: center;
			padding: 0 10px;
			::v-deep(.el-space__item) {
				width: 100%;
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
</style>
