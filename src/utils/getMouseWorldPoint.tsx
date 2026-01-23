import type { Point } from "../types/Point"

/**
 * Converts a WheelEvent (or mouse event) to world coordinates on the SVG.
 */
export const getMouseWorldPoint = (
	svgElement: SVGSVGElement,
	clientX: number,
	clientY: number,
): Point | null => {
	const pt = svgElement.createSVGPoint()
	pt.x = clientX
	pt.y = clientY

	const ctm = svgElement.getScreenCTM()
	if (!ctm) return null

	const world = pt.matrixTransform(ctm.inverse())
	return { x: world.x, y: world.y }
}
