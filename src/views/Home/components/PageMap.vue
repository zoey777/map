<script setup lang="ts">
import Map from '@/components/Map/index.vue'
import PicGrid from '@/components/PicGrid/index.vue'
import { useMapGridStore } from '@/store/mapGrid'
import { onMounted, ref } from 'vue'

// 是否折叠
const isCollapse = ref(true)
const { setMouseup } = useMapGridStore()

onMounted(() => {
	document.addEventListener('mouseup', () => {
		setMouseup(true)
	})
})
</script>

<template>
	<el-container class="page-map-container">
		<el-aside
			:style="{
				width: isCollapse ? '30%' : '50%',
			}"
			class="page-map-container__aside"
		>
			<el-space fill direction="vertical" class="page-map-container__aside-left">
				<div>123</div>
				<div>
					<Map />
				</div>
			</el-space>
			<el-button @click="() => (isCollapse = !isCollapse)" class="page-map-container__collaspe_btn">
				折叠/展开
			</el-button>
		</el-aside>
		<el-container>
			<el-main
				:style="{
					'justify-content': 'center',
				}"
			>
				<PicGrid />
			</el-main>
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
		width: 200px;
		transition: all 0.5s ease-in-out;
		overflow: visible;
		position: relative;

		&-left {
			width: 100%;
			height: 100%;
		}
	}

	&__collaspe_btn {
		position: absolute;
		top: 0;
		right: 0;
		// transform: translateX(100%);
	}
}
</style>
