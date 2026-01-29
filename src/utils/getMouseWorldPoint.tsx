import type { Point } from "../types/Point"

/**
 * Converts a WheelEvent (or mouse event) to world coordinates on the SVG.
 */
// export const getMouseWorldPoint = (
// 	svgElement: SVGSVGElement,
// 	clientX: number,
// 	clientY: number,
// ): Point | null => {
// 	const pt = svgElement.createSVGPoint()
// 	pt.x = clientX
// 	pt.y = clientY

// 	const ctm = svgElement.getScreenCTM()
// 	if (!ctm) return null

// 	const world = pt.matrixTransform(ctm.inverse())
// 	return { x: world.x, y: world.y }
// }

// export function getMouseWorldPoint(
// 	svg: SVGSVGElement,
// 	clientX: number,
// 	clientY: number,
// ): Point | null {
// 	const rect = svg.getBoundingClientRect()

// 	const pt = svg.createSVGPoint()

// 	// ✅ convert page → svg viewport
// 	pt.x = clientX - rect.left
// 	pt.y = clientY - rect.top

// 	const ctm = svg.getScreenCTM()
// 	if (!ctm) return null

// 	const world = pt.matrixTransform(ctm.inverse())

// 	if (!isFinite(world.x) || !isFinite(world.y)) return null

// 	return { x: world.x, y: world.y }
// }

export function getMouseWorldPoint(
	svg: SVGSVGElement,
	clientX: number,
	clientY: number,
): Point | null {
	const pt = svg.createSVGPoint()

	// ✅ raw client coords ONLY
	pt.x = clientX
	pt.y = clientY

	const ctm = svg.getScreenCTM()
	if (!ctm) return null

	const world = pt.matrixTransform(ctm.inverse())

	if (!isFinite(world.x) || !isFinite(world.y)) return null

	return { x: world.x, y: world.y }
}
