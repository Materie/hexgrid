import type { Hex } from "../types/Hex"
import { getHexNeighbors } from "./getHexNeighbors"

/**
 * Returns all neighbor hexes that are not filled
 * @param hex Hex
 * @param hexMap
 * @returns hexes: Hex[]
 */
export const getAvailableHexNeighbors = (
	hex: Hex,
	hexMap: Map<string, Hex>,
) => {
	const neighbors = getHexNeighbors(hex).filter(
		(hex) => !hexMap.has(`${hex.x},${hex.y},${hex.layer}`),
	)

	return neighbors
}
