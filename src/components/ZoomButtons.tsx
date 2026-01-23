import { styled } from "@linaria/react"
import type { Dispatch, SetStateAction } from "react"
import type { Camera } from "../types/Camera"
import { ZOOM_STEP } from "../constants"
import { zoomAtCenter } from "../utils/zoomAtCenter"
import type { Point } from "../types/Point"

const Wrapper = styled.div`
	position: absolute;
	top: 16px;
	right: 16px;

	display: flex;

	background: white;
	border-radius: 6px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	overflow: hidden;
`

const Button = styled.button`
	all: unset;
	width: 36px;
	height: 36px;

	display: grid;
	place-items: center;

	font-size: 20px;
	cursor: pointer;
	&:hover {
		background: #f0f0f0;
	}
`

const Divider = styled.hr`
	width: 1px;
	background: #ccc;
	margin: 0;
	border: 0;
`

interface Props {
	setCamera: Dispatch<SetStateAction<Camera>>
	center: Point
	setDebugPoint?: Dispatch<SetStateAction<Point | null>>
}

export const ZoomButtons = ({ setCamera, center, setDebugPoint }: Props) => {
	const zoomIn = () => zoomAtCenter("in", setCamera, center, setDebugPoint)

	const zoomOut = () => zoomAtCenter("out", setCamera, center, setDebugPoint)
	return (
		<Wrapper>
			<Button onClick={zoomIn} aria-label="Zoom inn">
				+
			</Button>
			<Divider />
			<Button onClick={zoomOut} aria-label="Zoom ut">
				-
			</Button>
		</Wrapper>
	)
}
