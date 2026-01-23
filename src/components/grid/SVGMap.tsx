import type { Camera } from "../../types/Camera"
import { styled } from "@linaria/react"
import { hexToWorld } from "../../utils/hexToWorld"
import { HEX_SIZE } from "../../constants"
import { getOrderedHexes } from "../../utils/getOrderedHexes"
import type { Hex } from "../../types/Hex"
import { HexSVG } from "./HexSVG"
import { usePan } from "../../hooks/usePan"
import { useCamera } from "../../hooks/useCamera"
import { useZoom } from "../../hooks/useZoom"
import { ZoomButtons } from "../ZoomButtons"
import { useRef, useState } from "react"
import type { Point } from "../../types/Point"
import { useBounds } from "../../hooks/useBounds"

const SVG = styled.svg<{ $panning: boolean }>`
	width: 100%;
	height: 100%;
	touch-action: none;

	cursor: ${(props) => (props.$panning ? "grabbing" : "grab")};
`

interface Props {
	hexes: Map<string, Hex>
	activeLayer: number | null
}

export const SVGMap = ({ hexes, activeLayer }: Props) => {
	const svgRef = useRef<SVGSVGElement>(null)
	const [debugPoint, setDebugPoint] = useState<Point | null>(null)
	const [camera, setCamera] = useCamera(svgRef.current)

	const { width, height } = useBounds(svgRef)

	const svgCenter = {
		x: width / 2,
		y: height / 2,
	}

	const { panning, onPointerDown, onPointerMove, endPan } = usePan(setCamera)
	const onWheel = useZoom(setCamera)

	return (
		<>
			<ZoomButtons
				setCamera={setCamera}
				center={svgCenter}
				//setDebugPoint={setDebugPoint}
			/>
			<SVG
				ref={svgRef}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={endPan}
				onPointerCancel={endPan}
				onWheel={onWheel}
				$panning={panning}
			>
				<g
					transform={`translate(${camera.x} ${camera.y}) scale(${camera.zoom})`}
				>
					{getOrderedHexes(hexes.values(), activeLayer).map((hex) => {
						const pos = hexToWorld(hex, HEX_SIZE)
						return (
							<HexSVG
								key={`${hex.x},${hex.y},${hex.layer}`}
								hex={hex}
								pos={pos}
								active={hex.layer === activeLayer}
							/>
						)
					})}
				</g>
				{debugPoint && (
					<circle
						cx={debugPoint.x}
						cy={debugPoint.y}
						r={4}
						fill="red"
						pointerEvents="none"
					/>
				)}
			</SVG>
		</>
	)
}
