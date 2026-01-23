import type { Dispatch, SetStateAction } from "react"
import type { Camera } from "../types/Camera"
import { MAX_BUTTON_ZOOM_STEP, MAX_ZOOM, MIN_ZOOM } from "../constants"
import { zoomCameraAt } from "./zoomCameraAt"
import { computeZoomStep } from "./computeZoomStep"
import type { Point } from "../types/Point"

export const zoomAtCenter = (
	direction: "in" | "out",
	setCamera: Dispatch<SetStateAction<Camera>>,
	center: Point,
	setDebugPoint?: Dispatch<SetStateAction<Point | null>>,
) => {
	console.log("zoomAtCenter", { center })
	setCamera((cam) => {
		const factor = computeZoomStep(
			cam.zoom,
			direction,
			MAX_BUTTON_ZOOM_STEP,
			MIN_ZOOM,
			MAX_ZOOM,
		)

		if (factor === 1) {
			console.log("Factor is 1, returning cam", cam)
			return cam
		}

		return zoomCameraAt(cam, factor, center.x, center.y, setDebugPoint)
	})
}
