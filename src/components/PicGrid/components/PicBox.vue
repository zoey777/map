<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps<{
	path: string
	selected: boolean
	featureSelected: boolean
}>()

const selectedValue = ref(2)
const featureValue = ref(4)
const selectedBorderWidth = computed(() => `${selectedValue.value}px`)
const selectedSize = computed(() => `calc(100% - ${selectedValue.value * 2}px)`)
const featureSelectedBorderWidth = computed(() => `${featureValue.value}px`)
const featureSelectedSize = computed(() => `calc(100% - ${featureValue.value * 2}px)`)
</script>
<template>
	<div class="pic-box">
		<div class="pic-box__container">
			<div
				v-show="props.selected"
				class="pic-box__container__mask pic-box__container__mask--selected-mouse"
			></div>
			<div
				v-show="props.featureSelected"
				class="pic-box__container__mask pic-box__container__mask--selected-feature"
			></div>
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
	user-select: none;
	justify-content: center;
	align-items: center;

	&__container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;

		img {
			width: 100%;
			height: 100%;
			pointer-events: none;
			line-height: 0;
			transition: scale ease-in-out 0.08s;
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
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 10;

			&::after {
				content: '';
				left: 0;
				top: 0;
			}

			&--selected-mouse {
				z-index: 10;
				&::after {
					border: v-bind(selectedBorderWidth) solid #fc9628;
					width: v-bind(selectedSize);
					height: v-bind(selectedSize);
				}
			}
			&--selected-feature {
				z-index: 9;
				&::after {
					border: v-bind(featureSelectedBorderWidth) solid rgba(255, 255, 255, 0.8);
					width: v-bind(featureSelectedSize);
					height: v-bind(featureSelectedSize);
				}
			}
		}
	}
}
</style>
