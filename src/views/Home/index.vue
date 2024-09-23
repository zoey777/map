<script lang="ts" setup>
import PageCover from './PageCover/index.vue'
import PageIntro from './PageIntro/index.vue'
import PageMap from './PageMap/index.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const swiperRef = ref()
const i18n = useI18n()

const handlePrev = () => {
	swiperRef.value.$el.swiper.slidePrev()
}
const handleNext = (lang?: 'zhCn' | 'en') => {
	if (lang) {
		i18n.locale.value = lang
	}
	swiperRef.value.$el.swiper.slideNext()
}
export type Lang = Parameters<typeof handleNext>[0]
</script>

<template>
	<Swiper ref="swiperRef" :slidesPerView="1" direction="vertical" :allowTouchMove="false">
		<SwiperSlide>
			<PageCover @nextPage="handleNext"></PageCover>
		</SwiperSlide>
		<SwiperSlide>
			<PageIntro @prevPage="handlePrev" @nextPage="handleNext"></PageIntro>
		</SwiperSlide>
		<SwiperSlide>
			<PageMap @prevPage="handlePrev" @nextPage="handleNext"></PageMap>
		</SwiperSlide>
	</Swiper>
</template>

<style lang="less" scoped>
.swiper {
	height: 100vh;
}
</style>
