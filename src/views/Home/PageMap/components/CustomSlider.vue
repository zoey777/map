<script setup lang="ts">
import { FeatureType, MULTIPLE, useFeatureStore } from '@/store/feature'
import { Warning } from '@element-plus/icons-vue'
import _ from 'lodash'
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const featureStore = useFeatureStore()

const props = defineProps<FeatureType>()
const propRefs = toRefs(props)
const emit = defineEmits(['checkFeature'])
/** 选项框值 */
const rangeValue = defineModel<[number, number]>('rangeValue')

const i18n = useI18n()
const local = computed(() => i18n.locale.value)
const tip = computed(() => {
	return propRefs.tip.value[local.value as 'zh' | 'en'] || '[未配置语言]'
})

const title = computed(() => {
	return propRefs.title.value[local.value as 'zh' | 'en'] || '[未配置语言]'
})

const checked = computed({
	get() {
		return featureStore.getCheckedStatus(props.dataIndex)
	},
	set(newValue) {
		featureStore.setCheckedStatus(props.dataIndex, newValue)
		// 开启立即寻址才会触发
		emit('checkFeature')
	},
})

const changeSlider = _.debounce(() => {
	// 开启立即寻址才会触发
	emit('checkFeature')
}, 300)
</script>

<template>
	<div class="container" shadow="hover">
		<el-divider
			:style="{
				padding: '8px 0 0 0',
				margin: '4px 0',
			}"
		/>

		<div class="container__btn-box">
			<el-checkbox v-model="checked" />
			<div class="container__btn-box__right">
				<el-space class="container__title">
					<span>{{ title }}</span>
					<el-tooltip :content="tip">
						<el-icon>
							<Warning />
						</el-icon>
					</el-tooltip>
				</el-space>
				<div class="container__slider">
					<el-text class="slider__left-content">低</el-text>
					<el-slider
						class="slider__bar"
						v-model="rangeValue"
						:max="props.max"
						:min="props.min"
						:formatTooltip="val => val / MULTIPLE"
						range
						@change="changeSlider"
					/>
					<el-text class="slider__left-content">高</el-text>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	::v-deep(.el-card__body) {
		padding: 10px;
	}

	&__btn-box {
		display: flex;
		gap: 10px;
		align-items: center;
		&__right {
			flex: 1;
		}
	}

	&__title {
		font-size: 12px;
	}

	&__slider {
		width: 100%;
		gap: 12px;
		display: flex;
	}
}
</style>
