<script setup lang="ts">
import { ConfigNameEnum, useConfigStore } from '@/store/config'
import { useMapGridStore } from '@/store/mapGrid'
import { computed, toRefs, watch } from 'vue'

const configStore = useConfigStore()
const mapGridStore = useMapGridStore()
const { maxPreference } = toRefs(mapGridStore)

const configMaxPreference = computed(() => configStore.getConfig(ConfigNameEnum.景趣最大半径))

watch(configMaxPreference, newValue => {
	mapGridStore.initMaxPreference(typeof newValue === 'number' ? newValue : Number(newValue))
})

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
		<ElText class="text">{{ $t('page3.preferenceSlider') }}:</ElText>
		<ElSlider v-model="value" :min="0" :max="maxPreference" />
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
