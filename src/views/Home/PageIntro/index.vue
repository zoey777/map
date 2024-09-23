<script setup lang="ts">
import Info from './components/Info.vue'
import ChangePage from '@/components/ChangePage/index.vue'

const emit = defineEmits(['prevPage', 'nextPage'])

const configs = [
	{
		path: '/page2-0a.png',
		title: '*街景的纹理特征',
	},
	{
		path: '/page2-0b.png',
		title: '*街景的纹理特征',
	},
	{
		path: '/page2-0c.png',
		title: '*街景的纹理特征',
	},
	{
		path: '/page2-1a.png',
		title: '*街景的纹理特征',
		link: {
			title: '（图片来源：Nikhil Naik, et al, 2014）',
			path: 'https://ieeexplore.ieee.org/document/6910072',
		},
	},
	{
		path: '/page2-1b.png',
		title: '*街景的纹理特征',
		link: {
			title: '（图片来源：Yu Ye, et al, 2019）',
			path: 'https://journals.sagepub.com/doi/10.1177/2399808319828734',
		},
	},
	{
		path: '/page2-1c.png',
		title: '*街景的纹理特征',
		link: {
			title: '（图片来源：Abhimanyu Dubey, et al, 2016）',
			path: 'https://link.springer.com/chapter/10.1007/978-3-319-46448-0_12',
		},
	},
	{
		path: '/page2-1d.png',
		title: '*街景的纹理特征',
		link: {
			title: '（图片来源：徐磊青, 等, 2020）',
			path: 'https://link.springer.com/chapter/10.1007/978-3-319-46448-0_12',
		},
	},
	{
		path: '/page2-2a.png',
	},
	{
		path: '/page2-2b.png',
		title: '*街景的纹理特征',
	},
]
</script>

<template>
	<div class="page-intro">
		<ChangePage direction="prev" @click="emit('prevPage')" />
		<img class="page-intro__pic-top" src="/pageIntro-hongkong.jpg" />

		<div class="page-intro__main">
			<div class="page-intro__pic-title">
				<img src="/pageIntro-title-zhCn.png" />
			</div>
			<p class="page-intro__title">基于 视觉复杂度 的 城市街景搜索引擎</p>
			<p
				class="page-intro__content"
				:style="{
					marginTop: '15px',
				}"
			>
				在数字化与虚拟化的浪潮下，实体已不再是城市存在的唯一方式，城市的定义正在经历着深刻的变革。
				如今，虚拟世界与现实世界越来越融合，人们可以通过互联网和数字技术在无需身临其境的情况下探索城市。
				其中，在线街景应用（谷歌街景、百度街景等）便是探索世界各地城市形象与风貌的有效手段。
				然而，随着智慧城市信息建设进入快车道，人们对城市形象探索有了更高的需求，例如，快速搜索特定街景、智能交互城市环境，明智决策规划发展。
				但现有的在线街景应用却无法摆脱线性单一的探索模式，人们只能被限制在虚拟的街道上单向点击前进，无法对城市形象进行多样化的交互探索体验。
				因此，我们开发了一个“城市街景搜索引擎”应用，通过收集、分析和描述整个城市街景的视觉信息数据流，以达到灵活、多维度、高效地深入挖掘城市视觉环境特征的目的，从而改变现代城市形象的管理与探索的方式。
			</p>
			<br />
			<br />
			<p class="page-intro__content">
				在此“城市街景搜索引擎”中，我们着眼于街景的纹理、形状、色彩这三个基于感知的视觉特征，并以视觉复杂度的方式去度量其视觉信息量。这样做的原因有三：
			</p>
			<br />
			<br />
			<p class="page-intro__content">
				1.
				凯文林奇在《城市意象》中提出，沿街的砖墙老屋、门前的热闹集市、街边的葱郁大树等，这些具有不同纹理、形状、色彩与组合模式的视觉肌理，往往会形成生动、强烈的心理图像，
				是强化城市意象性(imageability)与易辨性(legibility)的感知方式。因此，纹理、形状、色彩是认识城市意象、印象、风貌形象的典型视觉特征。
			</p>
			<Info v-bind="configs[0]" />
			<Info v-bind="configs[1]" />
			<Info v-bind="configs[2]" />
			<p class="page-intro__content">
				2.
				在以往对城市街景与人类认知的耦合研究中，不难发现“视觉复杂度”可被看作是街景多种认知体验的底层逻辑与描述机制。因此，视觉复杂度是视觉信息传递中数量与能量的有效量化方式。
			</p>
			<Info v-bind="configs[3]" />
			<Info v-bind="configs[4]" />
			<Info v-bind="configs[5]" />
			<Info v-bind="configs[6]" />
			<p class="page-intro__content">
				3.
				目前，街景的数字解析通常依靠语义分割技术，即提取街景的天空、建筑、植物、道路等物质构成特征，并测算其各自的像素占比。但这种方法只能描述街景的“形态”，却并不能抓住街景的“神韵”，街景往往拥有相似的物质元素构成，却给人完全不同的视觉感受。
				对此，街景纹理、形状、色彩特征的视觉复杂度为城市形象认知提供了一个新颖的探索角度。同时，也可作为现有方法的有效补充，在数字语境下更全面的掌握城市街景形象。
			</p>
			<Info v-bind="configs[7]" />
			<Info v-bind="configs[8]" />
			<div class="page-intro__video">
				<video src="/TRIAL_myMovie_720p.mp4" controls></video>
			</div>
			<p class="page-intro__content">
				综上，纹理、形状、颜色的视觉复杂度代表了城市视觉感知的信息量，基于此的“城市街景搜索引擎”将视觉感知特征、街景及其地理信息融合，创造了一个有趣的城市探索方式。点击“下一页”，让我们一同来探索城市丰富的视觉体验吧！
				同时，在左侧的视频中，您可以了解有关“城市街景搜索引擎”的应用方法。此应用是基于以下论文而开发的： Ma, L.,
				Guo, Z., Lu, M., He, S. & Wang, M. (2023). Developing an urban streetscape indexing based on visual
				complexity and self-organizing map. Building and Environment, 242, 110549.
				此研究受支持于国家社会科学基金(No.21BMZ111)、国家自然科学基金(No.52308015,
				No.52208014)、广东省基础与应用基础研究基金(No. 2021A1515110546)、广州市科技计划项目(No.
				202102020683)。另外，感谢广东工业大学本科生邓朝阳同学前期的调研、GIS数据分析、与数据整理工作。
			</p>
		</div>
		<ChangePage direction="next" @click="emit('nextPage')" />
	</div>
</template>

<style scoped lang="less">
.page-intro {
	height: 100vh;
	overflow: auto;
	font-family: 'HarmonyOS_Sans_Thin';
	padding: 5px 40px 5px 50px;

	&__main {
		padding: 0 100px 0 100px;
	}

	&__pic-top {
		width: 100%;
	}

	&__pic-title {
		float: left;
		transition: all ease-in-out 0.2s;
		img {
			transition: all ease-in-out 0.2s;
			position: relative;
			width: 400px;
			margin-top: -130px;
		}
	}

	&__title {
		text-align: center;
		font-size: 30px;
		font-weight: bold;
		line-height: 60px;
		color: #444444;
		margin-top: 20px;
	}

	&__content {
		font-size: 16px;
		line-height: 30px;
		color: #444444;
		margin-bottom: 4px;
	}

	&__video {
		width: 50%;
		float: left;
		margin: 0 20px 20px 0;
		video {
			width: 100%;
		}
	}

	@media screen and (max-width: 768px) {
		.page-intro {
			&__pic-title {
				float: none;
				text-align: center;
				img {
					position: relative;
					width: 200px;
					margin-top: -80px;
				}
			}
		}
	}
}
</style>
