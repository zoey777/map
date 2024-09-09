<script lang="ts" setup>
const props = defineProps<{
	path: string
}>()
</script>
<template>
	<div class="pic-box">
		<img :src="props.path" />
	</div>
</template>

<style lang="less" scoped>
.pic-box {
	background-color: rgba(0, 0, 0, 0.05);
	display: flex;
	aspect-ratio: 1;
	img {
		width: 100%;
		aspect-ratio: 1;
	}
}
</style>
