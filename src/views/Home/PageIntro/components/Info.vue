<script setup lang="ts">
const props = defineProps<{
	path?: string
	title?: string
	link?: {
		title: string
		path: string
	}
}>()
</script>
<template>
	<div class="pic-info">
		<img v-if="props.path" :src="props.path" :alt="props.title" />
		<div class="text">
			<span class="title" v-if="props.title">{{ props.title }}</span>
			<ElLink :underline="false" v-if="props.link" :href="props.link.path">{{ props.link.title }}</ElLink>
		</div>
	</div>
</template>

<style scoped lang="less">
.pic-info {
	width: 68%;

	img {
		width: 100%;
	}
}

.title {
	font-family: 'PingFang';
	text-align: left;
	margin-top: 5px;
	line-height: 10px;
	font-weight: normal;
	font-size: 14px;
	color: #444444;
}

.text {
	margin-bottom: 18px;

	::v-deep(.el-link) {
		display: inline;
		.el-link__inner {
			display: inline;
		}
	}
}
</style>
