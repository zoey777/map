import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import parserVue from 'vue-eslint-parser'

export default tsEslint.config({
	extends: [
		pluginJs.configs.recommended,
		...tsEslint.configs.recommended,
		...pluginVue.configs['flat/essential'],
		pluginPrettier,
	],

	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/no-unused-vars': 'error',
		'@typescript-eslint/no-unused-expressions': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	languageOptions: {
		globals: { ...globals.browser, ...globals.node },
		ecmaVersion: 2020,
		parser: parserVue,
		parserOptions: {
			parser: tsEslint.parser,
		},
	},
})
