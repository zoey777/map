<script lang="ts" setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Lang } from '../index.vue'

const emit = defineEmits<{
	(e: 'nextPage', lang: Lang): void
}>()
const i18n = useI18n()

console.log('加载语言', ...i18n.availableLocales)
watch(
	() => i18n,
	newVal => {
		console.log('当前语言：', newVal?.locale?.value)
	},
	{
		deep: true,
		immediate: true,
	}
)
</script>

<template>
	<div class="cover">
		<ElSpace class="btns" direction="vertical">
			<div class="btns__btn" @click="emit('nextPage', 'en')">{{ $t('page1.startEn') }}</div>
			<div class="btns__btn" @click="emit('nextPage', 'zhCn')">{{ $t('page1.startZhCn') }}</div>
		</ElSpace>
	</div>
</template>
<style lang="less" scoped>
.cover {
	width: 100%;
	min-height: 100vh;
	background: url(/pageCover-cover.jpg) no-repeat center;
	background-size: cover;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	animation: bg 5s ease-in-out;
	position: relative;
	justify-content: center;
}
.btns {
	width: 100%;
	height: 40%;
	display: flex;

	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 20px;
	z-index: 10;
	color: rgb(207, 111, 9);

	&__btn {
		width: 200px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 14px;
		padding: 8px 20px;
		font-weight: bold;
		user-select: none;
		text-align: center;

		&:hover {
			cursor: pointer;
			color: #fff;
			background-color: rgb(207, 111, 9);
			transition: all ease-in-out 0.15s;
		}
	}
}
</style>
