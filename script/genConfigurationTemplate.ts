/* eslint-disable */
const path = require('path')
import { existsSync, mkdirSync, writeFileSync } from 'fs'

import { defaultConfig } from '../src/store/config'
const dictPath = path.join(__dirname, '../public/configs/template')
const filePath = path.join(dictPath, '/configuration.json')
export default () => {
	if (!existsSync(dictPath)) {
		mkdirSync(dictPath, { recursive: true })
	}
	writeFileSync(filePath, JSON.stringify(defaultConfig))
}
