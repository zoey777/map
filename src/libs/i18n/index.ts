import { createI18n } from 'vue-i18n'

const getI18nPluginAsync = async () => {
	return fetch('/langs/locale/index.json')
		.then(res => res.json())

		.then(async (res: string[]) => {
			// 生成{zh:{}, en:{} } 的对象
			const configs: Record<string, Record<string, string>> = res.reduce((pre, cur) => {
				return Object.assign(pre, { [cur]: {} })
			}, {})

			const langKeys = Object.keys(configs)

			// 注入自定义语言到上面生成的对象中
			await Promise.all(
				langKeys.map(async lang => {
					const langModule = await fetch(`/langs/locale/${lang}.json`)
					const json = await langModule.json()

					Object.assign(configs[lang], json)
				})
			).catch(() => {
				console.log('请检查语言文检查index.json中的配置和语言文件是否对应。')
			})

			console.log(langKeys)
			return createI18n({
				legacy: false,
				locale: (langKeys[0] as string) || 'en',
				fallbackLocale: 'en',
				messages: configs,
			})
		})
}
export { getI18nPluginAsync }
