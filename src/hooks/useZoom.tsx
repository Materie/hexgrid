import { type Dispatch, type SetStateAction } from "react"
import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "../constants"
import type { Camera } from "../types/Camera"
import { clamp } from "../utils/clamp"
import { zoomCameraAt } from "../utils/zoomCameraAt"
import { getMouseWorldPoint } from "../utils/getMouseWorldPoint"

export const useZoom = (
	setCamera: Dispatch<SetStateAction<Camera>>,
	setDebugPoint?: any,
) => {
	const onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
		const direction = e.deltaY < 0 ? 1 : -1
		const factor = direction > 0 ? ZOOM_STEP : 1 / ZOOM_STEP

		const svg = e.currentTarget
		const worldPoint = getMouseWorldPoint(svg, e.clientX, e.clientY)
		if (!worldPoint) return

		setDebugPoint?.({ ...worldPoint })
		setCamera((cam) => {
			const nextCamera = zoomCameraAt(
				cam,
				factor,
				worldPoint.x,
				worldPoint.y,
			)
			return {
				...nextCamera,
				zoom: clamp(nextCamera.zoom, MIN_ZOOM, MAX_ZOOM),
			}
		})
	}

	return onWheel
}
