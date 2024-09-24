## 启动项目
生产模式直接用nginx，开发模式使用serve或者vite等

开发模式serve启动
```cmd
// npm全局安装serve
npm install -g serve

// 进入到dist文件根目录下，执行serve-s
serve-s
``` 

## 语言配置
### 激活语言
langs-locale, 其中有index.json，在其中数组中添加对应的语言缩写，语言文件就被激活。（当前默认激活en, zhCn, zhTw）。关于缩写，在langs文件夹下面的README.md中可以查找。

### 配置语言
在langs下locale文件夹中，zhCn.json和en.json进行配置。**前面的global...不要修改，只能修改最子层级的字符串。** 
```markdown
{
	"global": {
		"pagePrev": "Last page",
		"pageNext": "Next page"
	},
	"page1": {
		"startEn": "EXPLORE(English)",
		"startZhCn": "搜索中文"
	},
}
```

### 模板
项目自动生成的模板在langs-template文件夹下，可参考。（使用前可以先格式化json文件）


## 全局配置
### 全局配置项
configs文件夹，configuration对应开关配置。设置其中true和false即可切换其中的选项。

### features.json
这是地图页面的feature的配置，如果需要添加，则赋值一个{}大括号包裹的对象，修改其中的值即可。 数组下对象的个数会动态修改页面中的feature渲染个数。
```markdown
[
    {
        "title": {
            "zhCn": "feat_1",// 中文下的标题
            "en": "feat_12" // 英文下的标题
        },
        "tip": {
            "zhCn": "test", //中文下 感叹号提示
            "en": "test2"
        },
        "max": 1, // 最大滑动值
        "min": 0, // 最小滑动值
        "defaultMax": 0.9, // 默认最大值
        "defaultMin": 0.2, // 默认最小值
        "dataIndex": "Feature_1" // 对应data文件夹下features_data.json中的key，一定要对应，不然不会渲染。
    }
]
```
