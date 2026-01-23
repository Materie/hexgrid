import { styled } from "@linaria/react"
import { Header } from "./Header"
import type { CellType } from "./types/Cell"
import { useState } from "react"
import { Grid } from "./components/grid/Grid"

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: var(--color-bg);

	display: flex;
	flex-direction: column;
	align-items: stretch;
`

const Main = styled.main`
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 0;
	display: flex;
	justify-content: stretch;
	align-items: stretch;
`

const ViewArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Div = styled.div``

const Text = styled.p``

const testRows: CellType[][] = [
	[{}, {}, {}, {}],
	[{}, {}, {}, {}],
	[{}, {}, {}, {}],
	[{}, {}, {}, {}],
]

export function App() {
	const [theme, setTheme] = useState("light")
	const [grid, setGrid] = useState([[{}]])

	return (
		<Wrapper data-theme={theme}>
			<Header
				toggleTheme={() =>
					setTheme((theme) => (theme === "light" ? "dark" : "light"))
				}
			/>
			<Main>
				<Grid />
			</Main>
		</Wrapper>
	)
}
