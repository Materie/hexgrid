export const getSvgPoint = (
	svg: SVGSVGElement,
	clientX: number,
	clientY: number
) => {
	const rect = svg.getBoundingClientRect()
	return {
		x: clientX - rect.left,
		y: clientY - rect.top,
	}
}
