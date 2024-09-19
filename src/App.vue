<script setup lang="ts"></script>

<template>
	<el-config-provider
		:button="{
			autoInsertSpace: true,
		}"
	>
		<RouterView />
	</el-config-provider>
</template>

<style lang="less">
@import '@/styles/vars.less';
@import '@/styles/global.less';

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	font-family: PingFangSC-Regular;
}

html,
body,
#app {
	width: 100%;
	height: 100%;
	background-color: @bg;
	overflow: hidden;
}
</style>
