import { useRef, useState } from "react"
import type { Camera } from "../types/Camera"
import { useSpaceKey } from "./useSpaceKey"
import type { PanState } from "../types/PanState"

function panCamera(
	setCamera: React.Dispatch<React.SetStateAction<Camera>>,
	dx: number,
	dy: number
) {
	setCamera((cam) => ({
		...cam,
		x: cam.x + dx,
		y: cam.y + dy,
	}))
}

export const usePan = (
	setCamera: React.Dispatch<React.SetStateAction<Camera>>
) => {
	const spaceHeld = useSpaceKey()
	const [panning, setPanning] = useState(false)

	const panRef = useRef<PanState>({
		lastX: 0,
		lastY: 0,
	})

	const onPointerDown = (e: React.PointerEvent) => {
		const target = e.target as Element

		const clickedBackground =
			target.tagName === "svg" || target.tagName === "g"

		const shouldPan = spaceHeld || (!spaceHeld && clickedBackground)

		if (!shouldPan) return

		e.preventDefault()
		e.currentTarget.setPointerCapture(e.pointerId)

		panRef.current = {
			lastX: e.clientX,
			lastY: e.clientY,
		}
		setPanning(true)
	}

	const onPointerMove = (e: React.PointerEvent) => {
		const pan = panRef.current
		if (!panning) return

		const dx = e.clientX - pan.lastX
		const dy = e.clientY - pan.lastY

		pan.lastX = e.clientX
		pan.lastY = e.clientY

		panCamera(setCamera, dx, dy)
	}

	const endPan = (e: React.PointerEvent) => {
		setPanning(false)
		e.currentTarget.releasePointerCapture(e.pointerId)
	}

	return {
		panning,
		onPointerDown,
		onPointerMove,
		endPan,
	}
}
