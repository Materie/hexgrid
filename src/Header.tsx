import { styled } from "@linaria/react"
import { useState } from "react"
import { Modal } from "./Modal"
import { ModeSwitchButton } from "./ModeSwitchButton"

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

interface Props {
	toggleTheme: () => void
}

export const Header = ({ toggleTheme }: Props) => {
	const [resetModalOpen, setResetModalOpen] = useState(false)

	return (
		<>
			<Wrapper>
				<Title>HexGrid</Title>
				<Right>
					<Text onClick={() => setResetModalOpen(true)}>Tilbakestill</Text>
					<Text>Eksporter</Text>
					<Text>Importer</Text>
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
