export const supportsLang = ['zhCn' as const, 'en' as const]

export type LangConfigType = Record<string, Record<string, Record<string, string>>>

export const genLangObj = (defaultConfig: Partial<Record<(typeof supportsLang)[number], string>>) => {
	const obj: Record<string, string> = {}

	supportsLang.forEach(lang => {
		obj[lang] = defaultConfig[lang] ?? ''
	})

	return obj
}

export const i18nLangConfigs: LangConfigType = {
	page1: {},
	page2: {
		title_pic: genLangObj({
			zhCn: '/pageIntro-title-zhCn.png',
			en: '/pageIntro-title-en.png',
		}),
		title: genLangObj({
			zhCn: '基于 视觉复杂度 的 城市街景搜索引擎',
			en: 'Streetscape Search Engine Based on Visual Complexity',
		}),
		text1: genLangObj({
			zhCn: `在数字化与虚拟化的浪潮下，实体已不再是城市存在的唯一方式，城市的定义正在经历着深刻的变革。
				如今，虚拟世界与现实世界越来越融合，人们可以通过互联网和数字技术在无需身临其境的情况下探索城市。
				其中，在线街景应用（谷歌街景、百度街景等）便是探索世界各地城市形象与风貌的有效手段。
				然而，随着智慧城市信息建设进入快车道，人们对城市形象探索有了更高的需求，例如，快速搜索特定街景、智能交互城市环境，明智决策规划发展。
				但现有的在线街景应用却无法摆脱线性单一的探索模式，人们只能被限制在虚拟的街道上单向点击前进，无法对城市形象进行多样化的交互探索体验。
				因此，我们开发了一个“城市街景搜索引擎”应用，通过收集、分析和描述整个城市街景的视觉信息数据流，以达到灵活、多维度、高效地深入挖掘城市视觉环境特征的目的，从而改变现代城市形象的管理与探索的方式。`,
			en: `
            Amidst the trend of digitization and virtulization, physical presence is no longer the exclusive notion of a city, and the very definition of a city is currently undergoing a profound evolution. Nowadays, the virtual world is becoming increasingly intertwined with the physical reality, allowing individuals to explore cities through the internet and digital technologies without the constraints of physical presence. For instance, online street view applications like Google Street View or Baidu Street View serve as effective tools for exploring city images worldwide.

However, with the advancement of information infrastructure in smart cities, the desire for the exploration of city images has surged. This includes the rapid retrieval of specific streetscapes, intelligent interaction with urban environments, and informed decision-making for urban planning and development. But these online street view applications still remain constrained by a "monotonous" exploration mode, where users are limited to one-way clicks, navigating virtual streets without the opportunity for diverse and interactive urban experiences.

Hence, we have introduced an "Urban Streetscape Search Engine" application, which systematically collects, analyzes, and characterize the visual information stream of the city streetscapes. Aiming to achieve a dynamic, multi-dimensional, and efficient exploration of urban streetscapes, ultimately revolutionizing the methods of managing and exploring modern urban images.
`,
		}),
		text2: genLangObj({
			zhCn: '在此“城市街景搜索引擎”中，我们着眼于街景的纹理、形状、色彩这三个基于感知的视觉特征，并以视觉复杂度的方式去度量其视觉信息量。这样做的原因有三：',
			en: `In this "Urban Streetscape Search Engine", we specifically focus on three perception-based visual characteristics: texture, shape, and color of the streetscape, which are quantified using visual complexity as the measurement. There are three compelling reasons behind this approach:`,
		}),
		text3: genLangObj({
			zhCn: '',
			en: '1. In "The Image of the City", Lynch argued that "it is that shape, color, or arrangement which facilitates the making of vividly identified, powerfully structured, highly useful mental images of the environment ... the mental image involves its shape, color, texture, and detail" Various visual impressions, such as the brick walls of old houses, lively markets at the doorstep, and boulevards with lush trees, creating vibrant and vivid mental images. These elements: texture, shape, and color, therefore play a significant role in strengthening the imageability and legibility of the city.',
		}),
		text4: genLangObj({
			zhCn: '',
			en: '2. In previous research exploring the connection between urban street views and human cognition, it becomes apparent that visual complexity can be seen as the foundational logic and descriptive mechanism underlying various cognitive experiences of streetscapes. Consequently, visual complexity serves as an effective quantitative measure of the amount and intensity of visual perception.',
		}),
		text5: genLangObj({
			zhCn: '',
			en: "3. Currently, the digital analysis of streetscapes typically relies on image semantic segmentation, which involves extracting object elements such as the sky, buildings, plants, and roads from the streetscape and quantifying them based on their pixel proportions. However, this method only depicts the object of the streetscape, but fails to capture their impressions. As a result, the visual complexity of streetscape's texture, shape, and color provides a novel perspective for the city image. Simultaneously, it also serves as an effective complement to existing methods, enabling a more comprehensive understanding of the urban streetscape in the digital context.",
		}),
		text6: genLangObj({
			zhCn: '',
			en: `To sum up, the visual complexity of texture, shape, and color encapsulates the volume of information in urban visual perception. Building upon this notion, the "Urban Streetscape Search Engine" seamlessly merges visual perceptual characteristics, treetscapes, and their geographical information, crafting an intriguing approach to the exploration of city images. Click "Next page" to embark on a journey through the city's vibrant visual experiences together! Furthermore, the video on the left provides insights into the application techniques of the "Urban Streetscape Search Engine". This application is developed based on the research paper: `,
		}),
		text_paper: genLangObj({
			zhCn: '',
			en: 'Ma, L., Guo, Z., Lu, M., He, S. & Wang, M. (2023). Developing an urban streetscape indexing based on visual complexity and self-organizing map. Building and Environment, 242, 110549.',
		}),
		text7: genLangObj({
			zhCn: '',
			en: 'This work was supported by the National Social Science Fund of China (No.21BMZ111), the National Natural Science Foundation of China (No.52308015, No.52208014), the Guangdong Basic and Applied Basic Research Foundation (No.2021A1515110546) , and the Guangzhou Science and Technology Planning Project (No.202102020683). Additionally, we extend our appreciation to Chaoyang Deng, an undergraduate student at Guangdong University of Technology, for his valuable contributions in the preliminary research, GIS data analysis, and data organization work.',
		}),
		feat1: genLangObj({
			zhCn: '',
			en: '*街景的纹理特征',
		}),
		feat2: genLangObj({
			zhCn: '',
			en: '*街景的形状特征',
		}),
		feat3: genLangObj({
			zhCn: '',
			en: '*街景的色彩特征',
		}),
		feat4: genLangObj({
			zhCn: '',
			en: '*"安全性”由低到高的街景',
		}),
		feat4_link: genLangObj({
			zhCn: '',
			en: '*（图片来源：Nikhil Naik, et al, 2014）',
		}),
		feat5: genLangObj({
			zhCn: '',
			en: '*"视觉质量”由低到高的街景',
		}),
		feat5_link: genLangObj({
			zhCn: '',
			en: '（图片来源：Yu Ye, et al, 2019）',
		}),
		feat6: genLangObj({
			zhCn: '',
			en: '*"美观性”由低到高的街景',
		}),
		feat6_link: genLangObj({
			zhCn: '',
			en: ' （图片来源：Abhimanyu Dubey, et al, 2016）',
		}),
		feat7: genLangObj({
			zhCn: '',
			en: '*"疗愈性”由低到高的街景',
		}),
		feat7_link: genLangObj({
			zhCn: '',
			en: '（图片来源：徐磊青, 等, 2020）',
		}),
		feat8: genLangObj({
			zhCn: '',
			en: '*物质构成相似的街景却有着完全不同的视觉感受',
		}),
	},
	page3: {},
}
