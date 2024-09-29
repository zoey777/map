<script setup lang="ts">
import { useMapGridStore } from '@/store/mapGrid'
import { computed } from 'vue'

const mapGridStore = useMapGridStore()
const value = computed({
	get() {
		return mapGridStore.preferenceRadius
	},
	set(val: number) {
		mapGridStore.setPreference(val)
	},
})
</script>
<template>
	<div class="preference">
		<ElText class="text">景趣偏好:</ElText>
		<ElSlider v-model="value" :min="0" :max="10" />
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
