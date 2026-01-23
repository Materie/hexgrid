import type { Camera } from "../types/Camera"

export const pan = (camera: Camera, dx: number, dy: number) => {
	camera.x += dx
	camera.y += dy
}
