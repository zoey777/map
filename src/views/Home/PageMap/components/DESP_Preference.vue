<script setup lang="ts"></script>
<template>
	<div class="preference">
		<ElText class="text">{{ $t('page3.preferenceSlider') }}:</ElText>
	</div>
</template>

<style lang="less" scoped>
.preference {
	width: 280px;
	padding: 8px;
	display: flex;
	margin-right: 4px;
	align-items: center;
	gap: 14px;

	.text {
		white-space: nowrap;
	}
}
</style>
