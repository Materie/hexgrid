import type { Hex } from "./Hex"

export interface World {
	hexes: Map<string, Hex>
}
