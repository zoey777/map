<script setup lang="ts">
import Map from '@/components/Map.vue'
import { ref } from 'vue'
// 是否折叠
const isCollapse = ref(false)
</script>

<template>
	<el-container class="page-map-container">
		<el-aside
			:style="{
				width: isCollapse ? '200px' : '50%',
			}"
			class="page-map-container__aside"
		>
			<Map />
		</el-aside>
		<el-container>
			<el-main><el-button @click="() => (isCollapse = !isCollapse)">折叠/展开</el-button></el-main>
		</el-container>
	</el-container>
</template>
<style lang="less" scoped>
.page-map-container {
	::v-deep(.amap-container) {
		height: 100% !important;
	}
	height: 100%;
	&__aside {
		transition: all 0.5s ease-in-out;
	}
}
</style>
