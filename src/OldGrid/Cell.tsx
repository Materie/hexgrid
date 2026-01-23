import { styled } from "@linaria/react"
import type { CellType } from "../types/Cell"
import { Hex } from "./Hex"

const getOffsetRow = (rawIndex?: number) => {
	const index = rawIndex ?? 0
	const shouldOffset = index % 2 === 1
	return shouldOffset ? 1 : 0
}

const Wrapper = styled.div<{ $index: number; $selected?: boolean }>`
	pointer-events: none;
	z-index: ${(props) => (props.$selected ? 20 : 0)};
	height: 100px;
	&:has(svg path:hover) {
		z-index: 10;
	}

	position: absolute;
	left: calc(${(props) => props.$index} * var(--grid-offset-col));
	top: calc(${(props) => getOffsetRow(props.$index)} * var(--grid-offset-row));
`

interface CellProps extends CellType {
	row: number
	col: number
	setSelected: () => void
	selected?: boolean
}

export const Cell = ({ col, selected, setSelected }: CellProps) => {
	return (
		<Wrapper $index={col} $selected={selected}>
			<Hex data-selected={selected} onClick={setSelected} />
		</Wrapper>
	)
}
