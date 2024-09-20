<script setup lang="ts">
import { FeatureType } from '@/store/feature'
import { Warning } from '@element-plus/icons-vue'
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<FeatureType>()
const propRefs = toRefs(props)

/** 选项框值 */
const rangeValue = defineModel('rangeValue', {
	type: Number,
})

const i18n = useI18n()
const local = computed(() => i18n.locale.value)
const tip = computed(() => {
	return propRefs.tip.value[local.value as 'zh' | 'en'] || '[未配置语言]'
})

const title = computed(() => {
	return propRefs.title.value[local.value as 'zh' | 'en'] || '[未配置语言]'
})
</script>

<template>
	<div class="container" shadow="hover">
		<el-divider
			:style="{
				margin: '4px 0 ',
			}"
		/>

		<div class="container__btn-box">
			<el-checkbox />
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
					<el-text class="slider__left-content">高</el-text>
					<el-slider class="slider__bar" :max="props.max" :min="props.min" v-model="rangeValue" />
					<el-text class="slider__left-content">低</el-text>
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
