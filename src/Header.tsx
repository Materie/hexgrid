import { styled } from "@linaria/react"
import { useState, type Dispatch, type SetStateAction } from "react"
import { Modal } from "./Modal"
import { ModeSwitchButton } from "./ModeSwitchButton"
import { serializeHexes } from "./io/serializeHexes"
import type { Hex } from "./types/Hex"
import { saveJsonToFile } from "./io/saveJsonToFile"
import { openJsonFile } from "./io/openJsonFile"

const Wrapper = styled.header`
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	padding-inline: 40px;
	padding-block: 10px;
	background-color: var(--color-header);
`

const Right = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`

const Title = styled.h1`
	margin: 0;
`

const Text = styled.p`
	margin: 0;
`

const Button = styled.button`
	background: transparent;
	border: none;
`

interface Props {
	toggleTheme: () => void
	hexMap: Map<string, Hex>
	setHexMap: Dispatch<SetStateAction<Map<string, Hex>>>
}

export const Header = ({ toggleTheme, hexMap, setHexMap }: Props) => {
	const [resetModalOpen, setResetModalOpen] = useState(false)

	const handleImport = async () => {
		const data = await openJsonFile<{ hexes: Hex[] }>()
		if (!data) return

		const map = new Map<string, Hex>()
		data.hexes.forEach((h) => map.set(`${h.x},${h.y},${h.layer}`, h))

		setHexMap(map)
	}

	return (
		<>
			<Wrapper>
				<Title>HexGrid</Title>
				<Right>
					<Text onClick={() => setResetModalOpen(true)}>Tilbakestill</Text>
					<Button
						onClick={
							async () => await saveJsonToFile(serializeHexes(hexMap))
							/**
							 * Kan sende inn filnavnet brukeren importerte her. Hvis brukeren ikke har importert, men har endret filnavnet i headeren, kan vi også konvertere det til en trygg streng og slenge på .json på slutten. Ellers brukes default, som er 'Hex-kart.json'.
							 */
						}
					>
						Eksporter
					</Button>
					<Button onClick={handleImport}>Importer</Button>
					<ModeSwitchButton mode="dark" toggleTheme={toggleTheme} />
				</Right>
			</Wrapper>
			<Modal
				isOpen={resetModalOpen}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				onRequestClose={() => setResetModalOpen(false)}
			>
				<button onClick={() => setResetModalOpen(false)}>Lukk</button>
			</Modal>
		</>
	)
}
