/* eslint-disable */

const path = require('path')
import { readFileSync, writeFile, writeFileSync } from 'fs'
import { genAllConfigFileContents } from '../src/libs/i18n/genConfig'

const basePath = '../public/langs'
export default () => {
	console.log('开始生成本地化文件')

	writeFileSync(
		path.join(__dirname, basePath, 'template', 'template.json'),
		JSON.stringify(genAllConfigFileContents()),
		{
			encoding: 'utf-8',
			flush: true,
		}
	)

	const langModules = genAllConfigFileContents()

	// 读取已有内容
	let existLangObj: Record<string, Record<string, Record<string, string>>> = {}
	Object.keys(langModules).forEach(item => {
		const langOjb = JSON.parse(readFileSync(path.join(__dirname, basePath, 'locale', `${item}.json`), 'utf-8'))
		existLangObj[item] = langOjb
	})
	// 写入内容
	Object.keys(langModules).forEach(langKey => {
		const langObj = langModules[langKey]

		Object.keys(langObj).forEach(pageModule => {
			Object.keys(langObj[pageModule]).forEach(key => {
				langObj[pageModule]
				if (key in langObj[pageModule]) {
					langObj[pageModule][key] = existLangObj[langKey][pageModule][key]
				}
			})
		})

		return writeFile(
			path.join(__dirname, `../public/langs/template/${langKey}.json`),
			JSON.stringify(langObj, null, '\t'),
			err => {
				if (err) {
					console.log(err)
				}
			}
		)
	})

	console.log('生成本地化文件完成')
}
