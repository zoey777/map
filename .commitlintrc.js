/* global module */
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		'header-trim': [2, 'always'], //不能开头和尾随空格
		'scope-empty': [2, 'never'],
		'subject-empty': [2, 'never'],
		'type-empty': [2, 'never'],
	},
	prompt: {
		alias: { fd: 'docs: fix typos' },
		messages: {
			type: '选择你要提交的类型 :',
			scope: '选择一个提交范围（可选）:',
			customScope: '请输入自定义的提交范围 :',
			subject: '填写简短精炼的变更描述 :\n',
			body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			footerPrefixesSelect: '选择关联issue前缀（可选）:',
			customFooterPrefix: '输入自定义issue前缀 :',
			footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
			generatingByAI: '正在通过 AI 生成你的提交简短描述...',
			generatedSelectByAI: '选择一个 AI 生成的简短描述:',
			confirmCommit: '是否提交或修改commit ?',
		},
		types: [
			{ value: 'feat', name: '特性:     新增功能' },
			{ value: 'fix', name: '修复:     修复缺陷' },
			{ value: 'docs', name: '文档:     文档变更' },
			{ value: 'style', name: '格式:     代码格式（不影响功能，例如空格、分号等格式修正）' },
			{ value: 'refactor', name: '重构:     代码重构（不包括 bug 修复、功能新增）' },
			{ value: 'perf', name: '性能:     性能优化' },
			{ value: 'test', name: '测试:     添加疏漏测试或已有测试改动' },
			{ value: 'build', name: '构建:     构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
			{ value: 'script', name: '集成:     修改 CI 配置、脚本' },
			{ value: 'revert', name: '回退:     回滚 commit' },
			{ value: 'other', name: '其他:     对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
		],
		scopes: [
			{
				value: 'config',
				name: 'config:    项目配置文件',
			},
			{
				value: 'construct',
				name: 'construct:    修改项目结构',
			},
			{
				value: 'script',
				name: 'script:   修改脚本',
			},
			{
				value: 'lib',
				name: 'lib:  修改依赖',
			},
			{
				value: 'project',
				name: '项目整体',
			},
		],
		markBreakingChangeMode: false,
		allowBreakingChanges: ['feat', 'fix'],
		breaklineNumber: 100,
		breaklineChar: '|',

		issuePrefixes: [
			// 如果使用 gitee 作为开发管理
			{ value: 'link', name: 'link:     链接 ISSUES 进行中' },
			{ value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
		],
		customIssuePrefixAlign: 'top',
		emptyIssuePrefixAlias: '跳过',
		customIssuePrefixAlias: '自定义前缀',
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
	},
}
