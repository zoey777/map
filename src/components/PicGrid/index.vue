<script lang="ts" setup>
import PicBox from './components/PicBox.vue'
</script>

<template>
	<div class="pic-grid__container">
		<PicBox v-for="item in 900" :key="item" :path="`/src/assets/pics/${item}.jpg`" />
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
	}
}
</style>
