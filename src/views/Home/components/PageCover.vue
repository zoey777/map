<script lang="ts" setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

console.log('加载语言', ...i18n.availableLocales)
watch(
	() => i18n,
	newVal => {
		console.log('当前语言：', newVal?.locale?.value)
	},
	{
		deep: true,
		immediate: true,
	}
)
</script>

<template>
	<ElButton @click="() => (i18n.locale.value = 'en')" />
	{{ $t('test') }}
</template>
