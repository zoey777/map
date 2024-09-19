<script lang="ts" setup>
import PageCover from './PageCover/index.vue'
import PageIntro from './PageIntro/index.vue'
import PageMap from './PageMap/index.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ElBacktop } from 'element-plus'
import { ref } from 'vue'

const swiperRef = ref()

const handleNext = () => {
	swiperRef.value.$el.swiper.slideNext()
}
</script>

<template>
	<Swiper ref="swiperRef" :slidesPerView="1" direction="vertical" :allowTouchMove="false">
		<SwiperSlide>
			<PageCover></PageCover>
		</SwiperSlide>
		<SwiperSlide>
			<PageIntro></PageIntro>
		</SwiperSlide>
		<SwiperSlide class="page page_map">
			<PageMap></PageMap>
		</SwiperSlide>
		<ElBacktop @click="handleNext()" :visibilityHeight="0">next</ElBacktop>
	</Swiper>
</template>

<style lang="less" scoped>
.swiper {
	height: 100vh;
}
</style>
