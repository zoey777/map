/* eslint-disable */
const path = require('path')
import { writeFile, writeFileSync } from 'fs'
import { genAllConfigFileContents } from '../src/libs/i18n/genConfig'

writeFileSync(path.join(__dirname, '../public/langs/template.json'), JSON.stringify(genAllConfigFileContents()), {
	encoding: 'utf-8',
	flush: true,
})

const langModules = genAllConfigFileContents()

Object.keys(langModules).forEach(item => {
	return writeFile(
		path.join(__dirname, `../public/langs/template/${item}.json`),
		JSON.stringify(langModules[item]),
		err => {
			console.log(err)
		}
	)
})
