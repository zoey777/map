<script setup lang="ts">
defineProps<{
	direction: 'next' | 'prev'
}>()
</script>
<template>
	<div class="change_page">
		<ElButton>{{ direction === 'prev' ? '上一页' : '下一页' }}</ElButton>
	</div>
</template>

<style scoped lang="less">
.change_page {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
</style>
