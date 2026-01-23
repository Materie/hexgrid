import {
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react"
import type { Camera } from "../types/Camera"

const getInitialCamera = (svg: SVGSVGElement | null) => {
	return {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
		zoom: 1,
	}
}

export const useCamera = (
	svg: SVGSVGElement | null,
): [Camera, Dispatch<SetStateAction<Camera>>] => {
	const [camera, setCamera] = useState<Camera>(() => ({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
		zoom: 1,
	}))

	const sizeRef = useRef({
		width: window.innerWidth,
		height: window.innerHeight,
	})

	useEffect(() => {
		const onResize = () => {
			const prevSize = sizeRef.current
			const nextSize = {
				width: window.innerWidth,
				height: window.innerHeight,
			}

			setCamera((cam) => {
				const safeZoom = cam.zoom > 0 ? cam.zoom : 1

				// compute world coords at old screen center safely
				const worldX = (prevSize.width / 2 - cam.x) / safeZoom
				const worldY = (prevSize.height / 2 - cam.y) / safeZoom

				// new camera position
				let x = nextSize.width / 2 - worldX * safeZoom
				let y = nextSize.height / 2 - worldY * safeZoom

				if (!isFinite(x)) x = cam.x
				if (!isFinite(y)) y = cam.y

				return { ...cam, x, y }
			})

			sizeRef.current = nextSize
		}

		window.addEventListener("resize", onResize)
		return () => window.removeEventListener("resize", onResize)
	}, [])

	return [camera, setCamera]
}
