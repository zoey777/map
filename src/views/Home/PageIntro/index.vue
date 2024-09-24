<script setup lang="ts">
import { computed } from 'vue'
import Info from './components/Info.vue'
import ChangePage from '@/components/ChangePage/index.vue'
import { useI18n } from 'vue-i18n'
import { ElLink } from 'element-plus'

const emit = defineEmits(['prevPage', 'nextPage'])
const i18n = useI18n()

const configs = computed(() => [
	{
		path: '/page2-0a.png',
		title: i18n.t('page1.btn'),
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
])
const titlePic = computed(() => i18n.t('page2.title_pic'))
</script>

<template>
	<div class="page-intro">
		<ChangePage direction="prev" @click="emit('prevPage')" />
		<img class="page-intro__pic-top" src="/pageIntro-hongkong.jpg" />

		<div class="page-intro__main">
			<div class="page-intro__pic-title">
				<img :src="titlePic" />
			</div>
			<p class="page-intro__title">{{ $t('page2.title') }}</p>
			<p
				class="page-intro__content"
				:style="{
					marginTop: '15px',
				}"
			>
				{{ $t('page2.text1') }}
			</p>
			<br />
			<br />
			<p class="page-intro__content">
				{{ $t('page2.text2') }}
			</p>
			<br />
			<br />
			<p class="page-intro__content">
				{{ $t('page2.text3') }}
			</p>
			<Info v-bind="configs[0]" />
			<Info v-bind="configs[1]" />
			<Info v-bind="configs[2]" />
			<p class="page-intro__content">
				{{ $t('page2.text4') }}
			</p>
			<Info v-bind="configs[3]" />
			<Info v-bind="configs[4]" />
			<Info v-bind="configs[5]" />
			<Info v-bind="configs[6]" />
			<p class="page-intro__content">
				{{ $t('page2.text5') }}
			</p>
			<Info v-bind="configs[7]" />
			<Info v-bind="configs[8]" />
			<div class="page-intro__video">
				<video src="/TRIAL_myMovie_720p.mp4" controls></video>
			</div>
			<p class="page-intro__content">
				{{ $t('page2.text6') }}
				<ElLink :underline="false" href="https://linkinghub.elsevier.com/retrieve/pii/S0360132323005760">
					{{ $t('page2.paper') }}
				</ElLink>
				{{ $t('page2.text7') }}
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
