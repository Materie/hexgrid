import type { Point } from "../types/Point"

export function clientToWorld(
	group: SVGGElement,
	clientX: number,
	clientY: number,
): Point | null {
	const pt = new DOMPoint(clientX, clientY)

	const ctm = group.getScreenCTM()
	if (!ctm) return null

	const world = pt.matrixTransform(ctm.inverse())

	return { x: world.x, y: world.y }
}
