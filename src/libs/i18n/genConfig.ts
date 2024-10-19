import { i18nLangConfigs, supportsLang } from './configs'

export const genAllConfigFileContents = () => {
	const pages = Object.keys(i18nLangConfigs)

	const langs = supportsLang.map(lang => {
		const obj: Record<string, Record<string, string>> = {}

		pages.forEach(pageKey => {
			const pageVars: Record<string, string> = {}

			Object.entries(i18nLangConfigs[pageKey]).forEach(([key, value]) => {
				pageVars[key] = value[lang]
			})

			obj[pageKey] = pageVars
		})

		return [lang, obj]
	})

	const resultObj: Record<string, Record<string, Record<string, string>>> = {}

	langs.forEach(item => {
		resultObj[item[0] as string] = item[1] as unknown as Record<string, Record<string, string>>
	})
	return resultObj
}
