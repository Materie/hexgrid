import { styled } from "@linaria/react"
import type { Hex } from "../../types/Hex"
import { SVGMap } from "./SVGMap"
import { useCamera } from "../../hooks/useCamera"
import { usePan } from "../../hooks/usePan"

const hexes = new Map<string, Hex>()

hexes.set("0,0,0", { x: 0, y: 0, layer: 0 })
hexes.set("1,0,0", { x: 1, y: 0, layer: 0 })
hexes.set("0,1,1", { x: 0, y: 1, layer: 1 })
hexes.set("1,1,1", { x: 1, y: 1, layer: 1 })

//const Wrapper = styled.div``

export const Grid = () => {
	//return <div>Sopp</div>
	return <SVGMap hexes={hexes} activeLayer={1} />
}
