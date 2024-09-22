<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps<{
	path: string
	selected: boolean
	featureSelected: boolean
}>()

const borderWidth = ref(2)
const border = computed(() => `${borderWidth.value}px`)
const size = computed(() => `calc(100% - ${borderWidth.value * 2}px)`)
</script>
<template>
	<div class="pic-box">
		<div
			class="pic-box__mask"
			:class="{
				'pic-box__mask-selected': props.selected,
			}"
		>
			<img :src="props.path" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.pic-box {
	background-color: rgba(0, 0, 0, 0.05);
	display: flex;
	aspect-ratio: 1;
	cursor: pointer;
	position: relative;
	user-select: none;

	img {
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		pointer-events: none;
		font-size: 0;
		line-height: 0;
		transition: scale ease-in-out 0.05s;
	}

	&:hover {
		img {
			scale: 1.8;
		}
	}
	&__mask {
		overflow: hidden;
		pointer-events: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		&-selected {
			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				border: v-bind(border) solid #fc9628;
				width: v-bind(size);
				height: v-bind(size);
			}
		}
	}
}
</style>
