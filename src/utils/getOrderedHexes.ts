import type { Hex } from "../types/Hex"

export const getOrderedHexes = (
	hexes: Iterable<Hex>,
	activeLayer: number | null,
) => {
	//TODO: Refactor to functional
	const base: Hex[] = []
	const active: Hex[] = []

	for (const h of hexes) {
		if (h.layer === activeLayer) active.push(h)
		else base.push(h)
	}

	return [...base, ...active]
}
