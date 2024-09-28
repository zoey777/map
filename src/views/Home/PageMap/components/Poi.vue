<script setup lang="ts">
import { useFeatureStore } from '@/store/feature'
import { CheckboxValueType } from 'element-plus'
import { computed } from 'vue'

const featureStore = useFeatureStore()

const poiKeys = computed(() => featureStore.poiKeys)

const emit = defineEmits(['changeCheckbox'])
const handleChangeCheckbox = (key: string, val: CheckboxValueType) => {
	featureStore.checkPoi(key, Boolean(val))
	emit('changeCheckbox')
}
</script>

<template>
	<div v-for="item in poiKeys" :key="item">
		<ElCheckbox
			@change="val => handleChangeCheckbox(item, val)"
			:modelValue="featureStore.selectedPoiKeys.includes(item)"
		>
			<ElText>{{ $t(`page3.${item}`) }}</ElText>
		</ElCheckbox>
	</div>
</template>
