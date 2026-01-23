import { styled } from "@linaria/react"
import type { CellType } from "../types/Cell"
import { Cell } from "./Cell"
import { useState } from "react"
import type { Selection } from "../types/Selection"
import { SelectionDetails } from "../SelectionDetails"

const Wrapper = styled.div<{ $height: number }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	height: ${(props) => props.$height};
`

/**
 * Since this is a hexagonal grid, each row needs to be offset by half a hex to fit with the grid pattern
 */
const OffsetRow = styled.div<{ $index: number }>`
	position: absolute;
	top: calc(${(props) => props.$index} * var(--grid-row-height));
`

const getWidth = (rows: CellType[][]) => {
	const furthestLeftRow = rows.findIndex((row) => {
		return
	})
}

interface GridProps {
	rows: CellType[][]
}

export const GridOLD = ({ rows }: GridProps) => {
	const [selected, setSelected] = useState<Selection | null>(null)

	console.log({ selected })

	return (
		<Wrapper data-grid $height={rows.length * 100}>
			{rows.map((row, rowIndex) => {
				return (
					<OffsetRow $index={rowIndex} data-row>
						{row.map((cell, index) => {
							return (
								<Cell
									{...cell}
									row={rowIndex}
									col={index}
									selected={
										selected?.row === rowIndex &&
										selected?.col == index
									}
									setSelected={() => {
										console.log(
											`Selected [${
												rows.length - rowIndex - 1
											}, ${index}]`
										)
										setSelected({ row: rowIndex, col: index })
									}}
								/>
							)
						})}
					</OffsetRow>
				)
			})}
			{selected ? (
				<SelectionDetails rows={rows} selected={selected} />
			) : null}
		</Wrapper>
	)
}
