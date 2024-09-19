<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import Map from '@/components/Map/index.vue'
import PicGrid from '@/components/PicGrid/index.vue'
import CustomSlider from './components/customSlider.vue'

// 是否折叠
const isCollapse = ref(true)
</script>

<template>
	<el-container class="page-map-container">
		<el-aside
			:style="{
				width: isCollapse ? '40%' : '68%',
			}"
			class="page-map-container__aside"
		>
			<div class="page-map-container__aside-left">
				<div class="page-map-container__left-button-container">
					<div class="page-map-container__left-button-container-left">
						<div class="title">街景搜索引擎 —— 香港站</div>
						<div>
							<CustomSlider title="标题" />
							<CustomSlider title="标题" />
							<CustomSlider title="标题" />
							<CustomSlider title="标题" />
							<CustomSlider title="标题" />
							<CustomSlider title="标题" />
						</div>
					</div>

					<el-space class="page-map-container__left-button-container-right" direction="vertical" size="small">
						<el-button>寻址</el-button>
						<el-button>寻址</el-button>
					</el-space>
				</div>
				<div class="page-map-container__left-map-container">
					<Map />
				</div>
			</div>
			<div @click="() => (isCollapse = !isCollapse)" class="page-map-container__collaspe_btn">
				<el-button>
					<el-icon>
						<ArrowRight v-if="isCollapse" />
						<ArrowLeft v-else />
					</el-icon>
				</el-button>
			</div>
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
	height: 100%;
	padding: 4px;
	overflow: auto;
	::v-deep(.amap-container) {
		height: 100% !important;
	}

	position: relative;
	&__aside {
		width: 200px;
		transition: all 0.5s ease-in-out;
		position: relative;
		z-index: 2;
		overflow: visible;
		min-width: 280px;

		&-left {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	}

	// 左侧按钮容器
	&__left-button-container {
		border-radius: 4px;
		padding: 4px;
		width: 100%;
		display: flex;
		height: 52%;
		background-color: #fff;

		&-left {
			flex: 1;
			overflow-x: auto;
			padding-right: 20px;
			padding-left: 8px;
			// 标题
			.title {
				margin-bottom: 12px;
				width: 100%;
				text-align: center;
				font-size: 30px;
				font-family: PingFangSC-Thin;
			}
		}
		&-right {
			overflow: auto;
			justify-content: center;
		}
	}

	// 左侧地图容器
	&__left-map-container {
		flex: 1;
	}

	&__collaspe_btn {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 3;
		width: fit-content;
	}
}
</style>
