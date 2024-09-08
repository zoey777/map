export default {
	nextMenu: {
		zh: '下一页',
		en: 'Next Page',
	},
	TitlePic: {
		zh: 'static/page2-title.png',
		en: 'static/page2-title-en.png',
	},
	contentTitle: {
		zh: `基于 视觉复杂度 的 城市街景搜索引擎`,
		en: 'Streetscape Search Engine <br />Based on Visual Complexity',
	},
	contentText_1: {
		zh: `
			在数字化与虚拟化的浪潮下，实体已不再是城市存在的唯一方式，城市的定义正在经历着深刻的变革。
			如今，虚拟世界与现实世界越来越融合，人们可以通过互联网和数字技术在无需身临其境的情况下探索城市。
			其中，在线街景应用（谷歌街景、百度街景等）便是探索世界各地城市形象与风貌的有效手段。
			然而，随着智慧城市信息建设进入快车道，人们对城市形象探索有了更高的需求，例如，快速搜索特定街景、智能交互城市环境，明智决策规划发展。 
			但现有的在线街景应用却无法摆脱线性单一的探索模式，人们只能被限制在虚拟的街道上单向点击前进，无法对城市形象进行多样化的交互探索体验。 
			因此，我们开发了一个“城市街景搜索引擎”应用，通过收集、分析和描述整个城市街景的视觉信息数据流，以达到灵活、多维度、高效地深入挖掘城市视觉环境特征的目的，从而改变现代城市形象的管理与探索的方式。
			<br /><br />在此“城市街景搜索引擎”中，我们着眼于街景的纹理、形状、色彩这三个基于感知的视觉特征，并以视觉复杂度的方式去度量其视觉信息量。这样做的原因有三：
			<br /><br />1. 凯文林奇在《城市意象》中提出，沿街的砖墙老屋、门前的热闹集市、街边的葱郁大树等，这些具有不同纹理、形状、色彩与组合模式的视觉肌理，往往会形成生动、强烈的心理图像，
			是强化城市意象性(imageability)与易辨性(legibility)的感知方式。因此，纹理、形状、色彩是认识城市意象、印象、风貌形象的典型视觉特征。
			`,
		en: `
			Amidst the trend of digitization and virtulization, physical presence is no longer the exclusive notion of a city, and the very definition of a city is currently undergoing a profound evolution. 
			Nowadays, the virtual world is becoming increasingly intertwined with the physical reality, allowing individuals to explore cities through the internet and digital technologies without the constraints of physical presence.
			For instance, online street view applications like Google Street View or Baidu Street View serve as effective tools for exploring city images worldwide.
			<br/><br/>
			However, with the advancement of information infrastructure in smart cities, the desire for the exploration of city images has surged. 
			This includes the rapid retrieval of specific streetscapes, intelligent interaction with urban environments, and informed decision-making for urban planning and development.
			But these online street view applications still remain constrained by a "monotonous" exploration mode, where users are limited to one-way clicks, navigating virtual streets without the opportunity for
			diverse and interactive urban experiences.
			<br/><br/>

			Hence, we have introduced an "Urban Streetscape Search Engine" application, which systematically collects, analyzes, and characterize the visual information stream of the city streetscapes. 
			Aiming to achieve a dynamic, multi-dimensional, and efficient exploration of urban streetscapes, ultimately revolutionizing the methods of managing and exploring modern urban images.
			<br/><br/>

			In this "Urban Streetscape Search Engine", we specifically focus on three perception-based visual characteristics: texture, shape, and color of the streetscape, which are quantified using visual complexity as the measurement. There are
			three compelling reasons behind this approach:
			<br/><br/>

			1. In "The Image of the City", Lynch argued that "it is that shape, color, or arrangement which facilitates the making of vividly identified, powerfully
			structured, highly useful mental images of the environment ... the mental image involves its shape, color, texture, and detail" Various visual impressions, such as
			the brick walls of old houses, lively markets at the doorstep, and boulevards with lush trees, creating vibrant and vivid mental images. These elements: texture,
			shape, and color, therefore play a significant role in strengthening the imageability and legibility of the city.			
		`,
	},
	contentText_2: {
		zh: `<br />2. 在以往对城市街景与人类认知的耦合研究中，不难发现“视觉复杂度”可被看作是街景多种认知体验的底层逻辑与描述机制。因此，视觉复杂度是视觉信息传递中数量与能量的有效量化方式。`,
		en: '<br />2. In previous research exploring the connection between urban street views and human cognition, it becomes apparent that visual complexity can be seen as the foundational logic and descriptive mechanism underlying various cognitive experiences of streetscapes. Consequently, visual complexity serves as an effective quantitative measure of the amount and intensity of visual perception.',
	},
	contentText_3: {
		zh: `<br />3. 目前，街景的数字解析通常依靠语义分割技术，即提取街景的天空、建筑、植物、道路等物质构成特征，并测算其各自的像素占比。但这种方法只能描述街景的“形态”，却并不能抓住街景的“神韵”，街景往往拥有相似的物质元素构成，却给人完全不同的视觉感受。
		对此，街景纹理、形状、色彩特征的视觉复杂度为城市形象认知提供了一个新颖的探索角度。同时，也可作为现有方法的有效补充，在数字语境下更全面的掌握城市街景形象。`,
		en: `<br />3. Currently, the digital analysis of streetscapes typically relies on image semantic segmentation, which involves extracting object elements such
			as the sky, buildings, plants, and roads from the streetscape and quantifying them based on their pixel proportions. However, this method only depicts the object of
			the streetscape, but fails to capture their impressions. As a result, the visual complexity of streetscape's texture, shape, and color provides a novel perspective for
			the city image. Simultaneously, it also serves as an effective complement to existing methods, enabling a more comprehensive understanding of the urban streetscape in
			the digital context.
			`,
	},
	contentText_4: {
		zh: `<br />综上，纹理、形状、颜色的视觉复杂度代表了城市视觉感知的信息量，基于此的“城市街景搜索引擎”将视觉感知特征、街景及其地理信息融合，创造了一个有趣的城市探索方式。点击“下一页”，让我们一同来探索城市丰富的视觉体验吧！
		<br />同时，在左侧的视频中，您可以了解有关“城市街景搜索引擎”的应用方法。此应用是基于以下论文而开发的：`,
		en: `<br />To sum up, the visual complexity of texture, shape, and color encapsulates the volume of information in urban visual perception. 
		Building upon this notion, the "Urban Streetscape Search Engine" seamlessly merges visual perceptual characteristics,  treetscapes, and their geographical information, crafting an intriguing approach to the exploration of city images.
		Click "Next page" to embark on a journey through the city's vibrant visual experiences together!
		<br />Furthermore, the video on the left provides insights into the application techniques of the "Urban Streetscape Search Engine". This application is developed based on the research paper:`,
	},
	contentText_5: {
		zh: `<br />Ma, L., Guo, Z., Lu, M., He, S. & Wang, M. (2023). Developing an urban streetscape indexing based on visual complexity and self-organizing map. Building and Environment, 242, 110549.`,
		en: `<br />Ma, L., Guo, Z., Lu, M., He, S. & Wang, M. (2023). Developing an urban streetscape indexing based on visual complexity and self-organizing map. Building and Environment, 242, 110549.`,
	},
	contentText_6: {
		zh: `<br />此研究受支持于国家社会科学基金(No.21BMZ111)、国家自然科学基金(No.52308015, No.52208014)、广东省基础与应用基础研究基金(No. 2021A1515110546)、广州市科技计划项目(No. 202102020683)。另外，感谢广东工业大学本科生邓朝阳同学前期的调研、GIS数据分析、与数据整理工作。`,
		en: `<br />This work was supported by the National Social Science Fund of China (No.21BMZ111), the National Natural Science Foundation of China (No.52308015, No.52208014), the Guangdong Basic and Applied Basic Research Foundation (No.2021A1515110546) , and the Guangzhou Science and Technology Planning Project (No.202102020683).
		Additionally, we extend our appreciation to Chaoyang Deng, an undergraduate student at Guangdong University of Technology, for his valuable contributions in the preliminary research, GIS data analysis, and data organization work.`,
	},
	picText_0a: {
		zh: `*街景的纹理特征`,
		en: `*The texture characteristics of streetscapes`,
	},
	picText_0b: {
		zh: `*街景的形状特征`,
		en: `*The shape characteristics of streetscapes`,
	},
	picText_0c: {
		zh: `*街景的色彩特征`,
		en: `*The color characteristics of streetscapes`,
	},
	picText_1: {
		zh: `*"安全性”由低到高的街景`,
		en: `*Streetscapes graded from low to high on the scale of "sefety"`,
	},
	picText_2: {
		zh: '（图片来源：Nikhil Naik, et al, 2014）',
		en: '(image courtesy: Nikhil Naik, et al, 2014)',
	},
	picText_3: {
		zh: `*"视觉质量”由低到高的街景`,
		en: `*Streetscapes graded from low to high on the scale of "visual quality"`,
	},
	picText_4: {
		zh: '（图片来源：Yu Ye, et al, 2019）',
		en: '(image courtesy: Yu Ye, et al, 2019)',
	},
	picText_5: {
		zh: `*"美观性”由低到高的街景`,
		en: `*Streetscapes graded from low to high on the scale of "beauty"`,
	},
	picText_6: {
		zh: '（图片来源：Abhimanyu Dubey, et al, 2016）',
		en: '(image courtesy: Abhimanyu Dubey, et al, 2016)',
	},
	picText_7: {
		zh: `*"疗愈性”由低到高的街景`,
		en: `*Streetscapes graded from low to high on the scale of "healing perception"`,
	},
	picText_8: {
		zh: '（图片来源：徐磊青, 等, 2020）',
		en: '(image courtesy: Leiqing Xu, et al, 2020)',
	},
	picText_9: {
		zh: '*物质构成相似的街景却有着完全不同的视觉感受',
		en: '*Streetscapes share similar object-based configurations but exhibit distinct visual perceptions',
	},
	page_change_1: {
		zh: `上一页`,
		en: `Last page`,
	},
	page_change_2: {
		zh: `下一页`,
		en: `Next page`,
	},

	feature_1: {
		zh: '纹理复杂度：',
		en: 'Texture:',
	},

	feature_2: {
		zh: '形状复杂度：',
		en: 'Pattern:',
	},

	feature_3: {
		zh: '色彩复杂度：',
		en: 'Color:',
	},

	feature_4: {
		zh: '构筑物：',
		en: 'Built construction:',
	},
	feature_5: {
		zh: `街道基础设施：`,
		en: `Infrastructure:`,
	},
	feature_6: {
		zh: '开敞度：',
		en: 'Openness:',
	},

	feature_7: {
		zh: '绿视度：',
		en: 'Greenery:',
	},

	feature_8: {
		zh: '人行路：',
		en: 'Pedestrian pathway:',
	},

	feature_9: {
		zh: '车行路：',
		en: 'Vehicular pathway:',
	},

	feature_10: {
		zh: '多功能场地：',
		en: 'Multi-use site:',
	},

	feature_11: {
		zh: '人类活动：',
		en: 'Human activity:',
	},

	feature_12: {
		zh: '机动车流量：',
		en: 'Mobility vividness:',
	},

	feature_13: {
		zh: '风景：',
		en: 'Scenery:',
	},

	feature_14: {
		zh: '视域面积：',
		en: 'Visual area:',
	},

	feature_15: {
		zh: '视域周长：',
		en: 'Visual perimeter:',
	},

	feature_16: {
		zh: '视域紧凑度：',
		en: 'Visual compactness:',
	},

	feature_17: {
		zh: '视域封闭度：',
		en: 'Visual occlusivity:',
	},

	feature_18: {
		zh: '视线差异度：',
		en: 'Visual skewness:',
	},

	feature_19: {
		zh: '视域偏移度：',
		en: 'Visual drift:',
	},

	feature_1_tip: {
		zh: ``,
		en: ``,
	},
	feature_2_tip: {
		zh: ' ',
		en: ' ',
	},
	feature_3_tip: {
		zh: ` `,
		en: ` `,
	},
	default: {
		zh: '清 空',
		en: 'Default',
	},
	find_1: {
		zh: '寻 址',
		en: 'Find Geo-location',
	},
	find_2: {
		zh: '寻 景',
		en: 'Find Streetscapes',
	},
	show_hide: {
		zh: '隐藏/显示',
		en: 'Hide / Show',
	},
	location_streetscape: {
		zh: '地景关系',
		en: 'Streetscape Dynamic',
	},
	fold_unfold: {
		zh: '- 展开/折叠 -',
		en: '- Unfold / Fold -',
	},
	range_btn_low: {
		zh: '低',
		en: 'low',
	},
	range_btn_hign: {
		zh: '高',
		en: 'high',
	},
	indexing: {
		zh: `街 景 搜 索 引 擎 — 香 港 站`,
		en: `Streetscape Searching Engine - HongKong`,
	},
	indexing_intro_1: {
		zh: `以下“特征地图”通过分析街景中纹理、形状、颜色，将香港全境街景按“视觉感知相似性”重新排列。
		相较于“地理地图”，“特征地图”是一种全新的城市形象呈现逻辑。因此，我们对城市形象的探索将变得更加灵活与有趣！现在，你可以尝试以下操作来进行街景信息的搜索：`,
		en: `The presented "Feature Map" re-organizes the spectrum of Hong Kong's streetscapes based on their "visual perceptual similarity", 
		achieved through an analysis of textures, shapes, and colors quantified within the street scenes. 
		In comparison with a "geographic map", this "Feature Map" presents urban streetscapes in a novel alternative logic. 
		Consequently, our exploration of the city image gains flexibility and fun! Now, feel free to begin your serch of streescapes by engaging with the following actions:`,
	},
	indexing_intro_2: {
		zh: `1. 寻址：根据街景，迅速定位其在城市中的地理位置。`,
		en: `1. Find Geo-location: efficiently pinpoint the geo-location within the city according to selected streetscapes.`,
	},
	indexing_intro_3: {
		zh: `· 拖动左边的量值滑动条，看看“纹理”、“形状”、“颜色”的视觉复杂度变化，会在特征地图中形成怎样的街景？点击左侧“寻址”按键，进一步发现这些街景在“地理地图”中的分布。
		这项操作可应用于：城市色彩研究或艺术家寻找城市中色彩组合丰富的场址，城市驾驶导航中选择视觉体验简洁的道路，等场景。
		<br />·  按照你的喜好与想法，在“特征地图”中选择街景，点击“寻址”，发现这些街景在“地理地图”中分布。
		这项操作可应用于：城市热岛效应研究中定位城市高密度建筑街区，旅游者在城市中搜寻自然风光地带，等场景。`,
		en: `· Slide the bars on the left to witness the effect of the visual complexity level of "texture", "shape", and "color" in formalizing various streetscapes in the "Feature Map".
		Furthermore, Click on the left-side "Find geo-location" to explore where these streetscapes are positioned on the left "geo-map". 
		This action can be useful in different situations, like seeking locations with vibrant color combinations for urban color planners or art painters, choosing visually simple routes for city navigation, and more.
		<br />· Based on your preferences and ideas, handpick streetscapes within the "feature map", then click "Find geo-location" to uncover how these chosen streetscapes are distributed on the "geo-map".
		This action can be useful in identifying high-density urban areas for urban heat studies, or assisting tourists in discovering natural scenic spots within the city.`,
	},
	indexing_intro_4: {
		zh: `2. 寻景：根据地理位置，了解其所包含街景的类型与特征。`,
		en: `2. Find Streetscapes: gain insights into the types and features of the included streetscapes based on selected geo-location.`,
	},
	indexing_intro_5: {
		zh: `· 在“地理地图”中以多段线选择目标区域位置，点击“寻景”，“特征地图”中便以颜色标记的热力图表示区域内街景的组成类型与数量，颜色越深表明此类型街景越多。这项操作可应用于：某区域街景形象的快速审计、区域内街景环境的异质性评估，街道视觉感受的节奏控制，等场景。
		“隐藏/显示”按键有助于更方便的查看对应街景类型。`,
		en: `· Within the "Geo-map," delineate your desired area using polylines. Click "Find Streetscapes", the "Feature Map" will unveil a color-coded heat map that showcases the types and quantities of streetscapes in that region. 
		Darker hues indicate a greater prevalence of a specific type of streetscapes. This functionality finds utility in swiftly auditing street images in specific zones, evaluating the heterogeneity of street environments, controlling the visual rhythm of a street, and more. 
		The "Hide/Show" button enhances the convenience of viewing the respective streetscape types.`,
	},
	indexing_intro_6: {
		zh: `3. 地景关系：以色彩标记连接城市“特征地图”与“地理地图”，展现城市街景分布特征。`,
		en: `3. Ground-streetscape dynamic: utilizing color spectrum markers, "Feature Map" and "Geo-map" are seamlessly linked, presenting distinct distribution patterns of the city.`,
	},
	indexing_intro_7: {
		zh: `3. 点击“地景关系”，“特征地图”被色谱标记，细粒度区分不同街景类型；同时，“地理地图”中相应以色彩点展示了城市街景分布。“隐藏/显示”按键有助于更方便的查看对应街景类型。`,
		en: `3. Clicking on "Ground-streetscape dynamic" triggers the color mask of "Feature Map", allowing for a fine-grained distinction of various streetscape types; 
		Simultaneously, the distribution of streetscapes is vividly illustrated on "Geo-map" through using corresponding color-marked dots.  
		The "Hide/Show" button enhances the convenience of viewing the respective streetscape types.`,
	},
	sub_title_1: {
		zh: `-- 街 景 “特 征 地 图” --`,
		en: `-- "Feature map" of streetscapes --`,
	},
	sub_title_2: {
		zh: `-- 街 景 “地 理 地 图” --`,
		en: `-- "Geo-map" of streetscapes --`,
	},
	'poi-0': {
		zh: '餐饮',
		en: 'dining',
	},
	'poi-1': {
		zh: '风景名胜',
		en: 'scenic attraction',
	},
	'poi-2': {
		zh: '公司企业',
		en: 'business compary',
	},
	'poi-3': {
		zh: '购物',
		en: 'shopping',
	},
	'poi-4': {
		zh: '交通服务',
		en: 'transportation service',
	},
	'poi-5': {
		zh: '金融',
		en: 'finance',
	},
	'poi-6': {
		zh: '科教文化',
		en: 'education',
	},
	'poi-7': {
		zh: '住宅',
		en: 'residence',
	},
	'poi-8': {
		zh: '生活服务',
		en: 'public service',
	},
	'poi-9': {
		zh: '体育休闲',
		en: 'sport and leisure',
	},
	'poi-10': {
		zh: '医疗保健',
		en: 'health service',
	},
	'poi-11': {
		zh: '住宿服务',
		en: 'hotel',
	},
}
