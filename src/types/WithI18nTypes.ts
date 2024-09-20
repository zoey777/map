/** 提供本地化支持 */
export type WithI18nString<T extends 'zh' | 'en'> = {
	[k in T]: string
}
