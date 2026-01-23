import { styled } from "@linaria/react"
import { HEX_SIZE } from "../../constants"
import type { Hex } from "../../types/Hex"
import type { Point } from "../../types/Point"
import { hexPointsFlat } from "../../utils/hexPointsFlat"

const Polygon = styled.polygon``

interface Props {
	hex: Hex
	pos: Point
	active: boolean
}

export const HexSVG = ({ hex, pos, active }: Props) => {
	const points = hexPointsFlat(HEX_SIZE)
		.map(([x, y]) => `${x + pos.x},${y + pos.y}`)
		.join(" ")

	return (
		<Polygon
			points={points}
			fill={active ? "#4da3ff" : "#cfd8dc"} //TODO: Fix colors
			stroke="#455a64" //TODO: Fix colors
			strokeWidth={1}
			opacity={active ? 1 : 0.4}
		/>
	)
}
