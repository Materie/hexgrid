import { NEIGHBOR_OFFSETS } from "../constants"
import type { Hex } from "../types/Hex"

/**
 * Returns all hexes around a given hex
 * @param hex Hex
 * @returns hexes: Hex[]
 */
export const getHexNeighbors = (hex: Hex) => {
	const neighbors = NEIGHBOR_OFFSETS.map((offset) => {
		return {
			x: hex.x + offset.x,
			y: hex.y + offset.y,
			layer: hex.layer,
		}
	})

	return neighbors
}
