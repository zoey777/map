export default (color: string, alpha?: number) => {
	const svg = `
    <svg t="1692813506367" class="icon" viewBox="0 0 1064 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1440" width="200" height="200"><path d="M512 0c282.781538 0 512 229.218462 512 512S794.781538 1024 512 1024s-512-229.218462-512-512S229.218462 0 512 0z" fill="${color}" fill-opacity="${alpha ?? 1}"  p-id="1441"></path></svg>
    `

	// 转换为data URI
	return 'data:image/svg+xml;base64,' + btoa(svg)
}
