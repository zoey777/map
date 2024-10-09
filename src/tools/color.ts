import chroma from 'chroma-js'

/** VIRIDIS渐变色系 */
export const genVIRIDIS = () => {
	const color = chroma.scale(['#FDE725', '#5EC962', '#21918C', '#3B528B', '#440154'])

	const getHex = (ratio: number) => color(ratio).hex()

	return {
		_color: color,
		getHex,
	}
}
