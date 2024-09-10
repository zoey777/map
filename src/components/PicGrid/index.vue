<script lang="ts" setup>
import { useMapGridStore } from '@/store/mapGrid'
import PicBox from './components/PicBox.vue'

const mapGridStore = useMapGridStore()

const handleMousedown = (event: MouseEvent) => {
	;(event.currentTarget as HTMLDivElement).childNodes
}
</script>

<template>
	<div class="pic-grid__container" @mousedown="handleMousedown($event)">
		<PicBox
			v-for="(item, index) in mapGridStore.renderCount"
			:key="item"
			:path="`pics/${index}.jpg`"
			v-bind:index="index"
		/>
	</div>
</template>

<style lang="less" scoped>
.pic-grid {
	&__container {
		margin: 0;
		padding: 0;
		justify-content: space-around;
		display: grid;
		grid-template-columns: repeat(30, 1fr);
		grid-template-rows: repeat(10, 1fr);
	}
}
</style>
