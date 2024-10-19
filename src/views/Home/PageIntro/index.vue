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
		title: i18n.t('page2.feat1'),
	},
	{
		path: '/page2-1a.png',
		title: i18n.t('page2.feat4'),
	},
	{
		path: '/page2-2a.png',
		title: i18n.t('page2.feat8'),
	},
])
</script>

<template>
	<div class="page-intro">
		<ChangePage direction="prev" @click="emit('prevPage')" />
		<img class="page-intro__pic-top" src="/pageIntro-hongkong.jpg" />

		<div class="page-intro__main">
			<p class="page-intro__title">{{ $t('page2.title') }}</p>
			<div class="page-intro__video">
				<video src="/TRIAL_myMovie_720p.mp4" controls preload="auto"></video>
			</div>
			<p
				class="page-intro__content"
				:style="{
					marginTop: '15px',
				}"
			>
				{{ $t('page2.text1') }}
			</p>

			<p class="page-intro__content">
				{{ $t('page2.text2') }}
			</p>

			<p class="page-intro__content">
				{{ $t('page2.text3') }}
			</p>
			<Info v-bind="configs[0]" />

			<p class="page-intro__content">
				{{ $t('page2.text4') }}
			</p>
			<Info v-bind="configs[1]" />

			<p class="page-intro__content">
				{{ $t('page2.text5') }}
			</p>
			<Info v-bind="configs[2]" />
			<Info v-bind="configs[3]" />

			<p class="page-intro__content">{{ $t('page2.text7') }}</p>
			<ElLink href="https://linkinghub.elsevier.com/retrieve/pii/S0360132323005760">
				{{ $t('page2.text_paper') }}
			</ElLink>
		</div>
		<ChangePage direction="next" @click="emit('nextPage')" />
	</div>
</template>

<style scoped lang="less">
.page-intro {
	height: 100vh;
	overflow: auto;
	padding: 5px 40px 5px 50px;

	&__main {
		padding: 0 100px 0 100px;
	}

	&__pic-top {
		width: 100%;
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
		word-break: break-word;
		font-size: 16px;
		line-height: 30px;
		color: #444444;
		margin-bottom: 12px;
	}

	&__video {
		width: 48%;
		float: left;
		margin: 0 20px 20px 0;
		margin-top: 10px;
		video {
			margin-top: 10px;
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

			&__main {
				padding: 0 20px 0 20px;
			}
		}
	}
}
</style>
