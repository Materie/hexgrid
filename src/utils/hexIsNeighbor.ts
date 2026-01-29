import type { Hex } from "../types/Hex"

export const isNeighbor = (hex: Hex, neighbors: Hex[]) =>
	neighbors.some(
		(h) => h.x === hex.x && h.y === hex.y && h.layer === hex.layer,
	)
