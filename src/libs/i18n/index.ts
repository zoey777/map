import { en, zhCn } from 'element-plus/es/locales.mjs'
import { createI18n } from 'vue-i18n'
import enConfig from '@/../configs/en.json'
import zhConfig from '@/../configs/zh_CN.json'

const i18n = createI18n({
	legacy: false,
	locale: 'zh',
	fallbackLocale: 'en',
	messages: {
		zh: {
			...zhCn,
			...zhConfig,
		},
		en: {
			...en,
			...enConfig,
		},
	},
})

export default i18n
