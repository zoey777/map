/*global __dirname*/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		eslintPlugin(),
		AutoImport({
			resolvers: [
				ElementPlusResolver(),
				IconResolver({
					prefix: 'Icon',
				}),
			],
		}),
		Components({
			resolvers: [
				IconResolver({
					enabledCollections: ['ep'],
				}),
				ElementPlusResolver(),
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		extensions: ['.ts', '.js'],
	},
	css: {
		preprocessorOptions: {
			less: {},
		},
	},
	build: {
		rollupOptions: {
			external: '/public/langs/index.js',
		},
	},
})
