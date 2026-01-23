import { styled } from "@linaria/react"
import type { CellType } from "./types/Cell"
import type { Selection } from "./types/Selection"
import { useState } from "react"
import { TextInput } from "./TextInput"

const Wrapper = styled.div`
	position: fixed;
	top: 80px;
	right: 20px;
	border: 4px solid var(--color-border);
	background-color: var(--color-header);
	padding: 40px;
`

const Title = styled.h2``

interface Props {
	rows: CellType[][]
	selected: Selection
}

export const SelectionDetails = ({ rows, selected }: Props) => {
	const selectedItem = rows[selected.row][selected.row]

	const [icon, setIcon] = useState<string>("")

	return (
		<Wrapper>
			<Title>
				Valgt hex ({rows.length - 1 - selected.row} / {selected.col})
			</Title>
			<TextInput label="Velg ikon" value={icon} setValue={setIcon} />
		</Wrapper>
	)
}
