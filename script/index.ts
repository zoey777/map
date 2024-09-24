import genConfig from './genConfigurationTemplate'

import genLang from './genLangTemplate'

export default function genTemplate() {
	console.log('开始生成配置模板')
	genLang()
	genConfig()
	console.log('生成配置模板完成')
}

genTemplate()
