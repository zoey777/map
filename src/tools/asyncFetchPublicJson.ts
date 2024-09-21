/**
 * 异步获取public路径下的json文件。路径采用/开头，以public文件夹作为根路径。例如/configs/index.json，则获取的是根路径public/config/index.json
 */
export default async <T>(path: string, errorMsg?: string) => {
	const data: T = await fetch(path)
		.then(res => res.json())
		.catch(() => {
			console.error(errorMsg ? errorMsg : `请检查${path}文件格式是否正确`)
		})

	return data
}
