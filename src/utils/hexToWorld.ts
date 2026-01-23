import { HEX_SIZE } from "../constants"
import type { Hex } from "../types/Hex"
import type { Point } from "../types/Point"

export const hexToWorld = (hex: Hex, size: number = HEX_SIZE): Point => {
	return {
		x: size * 1.5 * hex.y,
		y: size * Math.sqrt(3) * (hex.x + hex.y / 2),
	}
}
