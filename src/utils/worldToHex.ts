import { HEX_SIZE } from "../constants"
import type { Hex } from "../types/Hex"
import type { Point } from "../types/Point"
import { hexRound } from "./hexRound"

export const worldToHex = (p: Point, size: number = HEX_SIZE): Hex => {
	const q = -p.y / (Math.sqrt(3) * size) - p.x / (3 * size)
	const r = (2 / 3) * (p.x / size)

	return hexRound(q, r)
}
