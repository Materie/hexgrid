import { styled } from "@linaria/react"
import { HEX_SIZE } from "../../constants"
import type { Hex } from "../../types/Hex"
import { getHexPoints } from "../../utils/gertHexPoints"
import { hexToWorld } from "../../utils/hexToWorld"

const Polygon = styled.polygon`
	transform-box: fill-box;
	transform-origin: center;
	animation: hexPulse 2s ease-in-out infinite;

	@keyframes hexPulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.04);
		}
	}
`

interface Props {
	hex: Hex
	zoom: number
}

export const SelectedHexOutline = ({ hex, zoom = 1 }: Props) => {
	const pos = hexToWorld(hex, HEX_SIZE)

	return (
		<Polygon
			points={getHexPoints(pos, HEX_SIZE + 2)} // slightly bigger
			fill="none"
			stroke="orange"
			strokeWidth={3 / Math.min(zoom, 1)}
			pointerEvents="none"
		/>
	)
}
