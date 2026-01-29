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
import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import type { Point } from "../../types/Point"
import { useBounds } from "../../hooks/useBounds"
import { worldToHex } from "../../utils/worldToHex"
import { SelectionDetails } from "../../SelectionDetails"
import { clientToWorld } from "../../utils/clientToWorld"
import { getAvailableHexNeighbors } from "../../utils/getAvailableHexNeighbors"
import { getHexPoints } from "../../utils/gertHexPoints"
import { isNeighbor } from "../../utils/hexIsNeighbor"
import { SelectedHexOutline } from "./SelectedHexOutline"

const SVG = styled.svg<{ $panning: boolean }>`
	width: 100%;
	height: 100%;
	touch-action: none;

	cursor: ${(props) => (props.$panning ? "grabbing" : "grab")};
`

const GhostHex = styled.polygon`
	stroke-opacity: 0;
	animation: previewFade 120ms ease-out forwards;

	@keyframes previewFade {
		to {
			stroke-opacity: 0.7;
		}
	}

	&:hover {
		stroke: red;
		stroke-width: 3;
	}
`

interface Props {
	hexMap: Map<string, Hex>
	setHexMap: Dispatch<SetStateAction<Map<string, Hex>>>
	activeLayer: number | null
}

export const SVGMap = ({ hexMap, setHexMap, activeLayer }: Props) => {
	const svgRef = useRef<SVGSVGElement>(null)
	const cameraRef = useRef<SVGGElement>(null)
	const [debugPoint, setDebugPoint] = useState<Point | null>(null)
	const [worldDebugPoint, setWorldDebugPoint] = useState<Point | null>(null)
	const [selectedHex, setSelectedHex] = useState<Hex | null>(null)
	//const [hexMap, setHexMap] = useState<Map<string, Hex>>(initialHexes)

	const [camera, setCamera] = useCamera(svgRef.current)

	const { width, height } = useBounds(svgRef)

	const svgCenter = {
		x: width / 2,
		y: height / 2,
	}

	const {
		panning,
		onPointerDown: panHandlePointerDown,
		onPointerMove,
		endPan,
	} = usePan(setCamera)
	const onWheel = useZoom(setCamera)

	const onClick = (e: React.PointerEvent<SVGSVGElement>) => {
		if (panning) return

		const world = clientToWorld(cameraRef.current!, e.clientX, e.clientY)
		if (!world) return

		setWorldDebugPoint(world)

		const hex = worldToHex(world, HEX_SIZE)
		const key = `${hex.x},${hex.y},${hex.layer}`

		if (hexMap.has(key)) {
			setSelectedHex(hex)
		} else if (isNeighbor(hex, neighbors)) {
			addHex(hex)
		} else {
			setSelectedHex(null)
		}
	}

	const neighbors = selectedHex
		? getAvailableHexNeighbors(selectedHex, hexMap)
		: []

	const addHex = (hex: Hex) => {
		setHexMap((prev) => {
			const newMap = new Map(prev)
			newMap.set(`${hex.x},${hex.y},${hex.layer}`, hex)
			return newMap
		})
		setSelectedHex(hex)
	}

	const pointerDownHandler = (e: React.PointerEvent<SVGSVGElement>) => {
		if (panning) return
		panHandlePointerDown(e)
		// const world = clientToWorld(cameraRef.current!, e.clientX, e.clientY)
		// if (!world) return

		// const hex = worldToHex(world, HEX_SIZE)
		// const key = `${hex.x},${hex.y},${hex.layer}`

		// if (hexMap.has(key)) {
		// 	setSelectedHex(hex)
		// } else if (isNeighbor(hex, neighbors)) {
		// 	addHex(hex)
		// }
	}

	console.log({ neighbors })

	return (
		<>
			<ZoomButtons
				setCamera={setCamera}
				center={svgCenter}
				//setDebugPoint={setDebugPoint}
			/>
			<SVG
				ref={svgRef}
				onPointerDown={pointerDownHandler}
				onPointerMove={onPointerMove}
				onPointerUp={endPan}
				onPointerCancel={endPan}
				onWheel={onWheel}
				onClick={onClick}
				$panning={panning}
			>
				<g
					ref={cameraRef}
					transform={`translate(${camera.x} ${camera.y}) scale(${camera.zoom})`}
				>
					{/* Real hexes in inactive layers - low priority, displays below everything else */}

					{/* Preview ghosts - medium priority, displays below the active layer */}
					{neighbors.map((hex) => {
						const pos = hexToWorld(hex, HEX_SIZE)
						return (
							<GhostHex
								key={`ghost-${hex.x},${hex.y},${hex.layer}`}
								points={getHexPoints(pos, HEX_SIZE)}
								fill="none"
								stroke="dodgerBlue"
								strokeWidth={2}
								opacity={1}
								pointerEvents="none"
								//style={{ cursor: "pointer" }}
								//onClick={() => addHex(hex)}
							/>
						)
					})}
					{/* Real hexes in the active layer - high priority, above most things */}
					{getOrderedHexes(hexMap.values(), activeLayer).map((hex) => {
						const pos = hexToWorld(hex, HEX_SIZE)
						const selected =
							selectedHex &&
							hex.x === selectedHex.x &&
							hex.y === selectedHex.y &&
							hex.layer === selectedHex.layer

						return (
							<HexSVG
								key={`${hex.x},${hex.y},${hex.layer}`}
								hex={hex}
								pos={pos}
								active={hex.layer === activeLayer}
								selected={selected ?? false}
							/>
						)
					})}
					{/* Active selection - very high priority, above almost everything */}
					{selectedHex && (
						<SelectedHexOutline hex={selectedHex} zoom={camera.zoom} />
					)}

					{/* Debug points - top priority, displays over everything else */}
					{worldDebugPoint && (
						<circle
							cx={worldDebugPoint.x}
							cy={worldDebugPoint.y}
							r={4}
							fill="red"
							pointerEvents="none"
						/>
					)}
				</g>
				{/* External debug points - Beyond top priority, displays over the entire map */}
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
			{selectedHex && <SelectionDetails hex={selectedHex} />}
		</>
	)
}
