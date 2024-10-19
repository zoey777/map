## 项目启动环境

```
// nodejs环境 在官网下载https://nodejs.org/
nodejs 18+
```

## 启动项目

启动项目可以使用npm或者pnpm，pnpm的使用方法在官网有说明。

### 使用npm执行

注意，可以百度搜索如何替换最新国内代理，搜索：npm替换阿里镜像最新版

```
// 安装依赖
npm install

// 本地服务启动项目
npm run dev
```

### （或者）使用pnpm执行

把上述npm换成

### 项目打包

项目本地服务改动没问题后，打包成html,css,js的文件。执行

```
npm run build
```

打包完成后，找到dist文件夹就是打包的文件夹

### 预览打包后的文件（注意是临时预览，正常服务器上部署是用nginx等服务）

可以使用serve服务来执行

```
npm install -g serve

安装完成后在当前文件路径下执行（就是保证-s后面的路径是绝对路径，指向dist文件夹的）

serve -s ./dist
```

或者使用本项目中的工具来启动

```
npm run preview

控制台中会出现路径http://localhost:4173，浏览器访问即可
```

## 其他打包后的内容

**找到public/README.md，其中有介绍**
