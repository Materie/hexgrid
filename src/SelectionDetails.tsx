import { styled } from "@linaria/react"
import type { CellType } from "./types/Cell"
import type { Selection } from "./types/Selection"
import { useState } from "react"
import { TextInput } from "./TextInput"
import type { Hex } from "./types/Hex"

const Wrapper = styled.div`
	position: fixed;
	bottom: 80px;
	left: 20px;
	border: 4px solid var(--color-border);
	background-color: var(--color-header);
	padding: 40px;
`

const Title = styled.h2``

interface Props {
	hex: Hex
}

export const SelectionDetails = ({ hex }: Props) => {
	const [icon, setIcon] = useState<string>("")

	return (
		<Wrapper>
			<Title>
				Valgt hex [{hex.x} / {hex.y}] ({hex.layer})
			</Title>
			<TextInput label="Velg ikon" value={icon} setValue={setIcon} />
		</Wrapper>
	)
}
