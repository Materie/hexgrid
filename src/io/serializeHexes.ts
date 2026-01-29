import type { Hex } from "../types/Hex"

/**
 * Get hexes formatted for I/O
 * @param hexes Map of hexes
 * @returns Object with hexes array
 */
export const serializeHexes = (hexes: Map<string, Hex>) => {
	return {
		version: 1,
		hexes: [...hexes.values()],
	}
}
