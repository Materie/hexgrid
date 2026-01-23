import type { Camera } from "./Camera"
import type { Hex } from "./Hex"
import type { Point } from "./Point"

interface Renderer {
	begin(camera: Camera): void
	drawHex(pos: Point, hex: Hex): void
	end(): void
}
