<script lang="ts" setup>
const props = defineProps<{
	path: string
	selected: boolean
}>()
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
		transition: scale ease-in-out 0.15s;
	}

	&__mask {
		overflow: hidden;
		pointer-events: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all ease-in-out 0.15s;
		display: flex;
		justify-content: center;
		align-items: center;

		&-selected {
			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				border: 4px solid #fc9628;
				width: calc(100% - 8px);
				height: calc(100% - 8px);
			}
		}
	}
}
</style>
