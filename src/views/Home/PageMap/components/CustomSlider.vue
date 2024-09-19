<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'

interface IProps {
	title?: string
}
const props = defineProps<IProps>()
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
					<span>{{ props.title }}</span>
					<el-icon>
						<Warning />
					</el-icon>
				</el-space>
				<div class="container__slider">
					<el-text class="slider__left-content">高</el-text>
					<el-slider class="slider__bar" :max="10000" :min="0" />
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
