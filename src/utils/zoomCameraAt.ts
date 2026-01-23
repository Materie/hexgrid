import type { Dispatch, SetStateAction } from "react"
import { MAX_ZOOM, MIN_ZOOM } from "../constants"
import type { Camera } from "../types/Camera"
import type { Point } from "../types/Point"
import { clamp } from "./clamp"

export const zoomCameraAt = (
	camera: Camera,
	factor: number,
	anchorX: number,
	anchorY: number,
	setDebugPoint?: Dispatch<SetStateAction<Point | null>>,
): Camera => {
	const safeZoom = camera.zoom > 0 ? camera.zoom : 1

	const wx = (anchorX - camera.x) / safeZoom
	const wy = (anchorY - camera.y) / safeZoom

	let nextZoom = safeZoom * factor
	nextZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)

	const effectiveFactor = nextZoom / safeZoom

	let x = anchorX - wx * safeZoom * effectiveFactor
	let y = anchorY - wy * safeZoom * effectiveFactor

	if (!isFinite(x)) x = camera.x
	if (!isFinite(y)) y = camera.y
	if (!isFinite(nextZoom)) nextZoom = safeZoom

	// Optional debug point
	if (setDebugPoint) {
		console.log(`Set debug point to [${anchorX},${anchorY}]`)
		setDebugPoint({ x: anchorX, y: anchorY })
	}

	return { ...camera, x, y, zoom: nextZoom }
}
