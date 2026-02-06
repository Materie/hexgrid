import { styled } from "@linaria/react"
import { Header } from "./Header"
import { useReducer, useState, type SetStateAction } from "react"
import type { Hex } from "./types/Hex"
import { SVGMap } from "./components/grid/SVGMap"
import { useAutosave } from "./io/hooks/useAutosave"
import { serializeHexes } from "./io/serializeHexes"

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

const initialHexes = new Map<string, Hex>()

initialHexes.set("0,0,0", { x: 0, y: 0, layer: 0 })

export function App() {
	const [theme, setTheme] = useState("light")
	const [hexMap, setHexMap] = useState<Map<string, Hex>>(initialHexes)
	const [mapChangeIndex, bumpMapChangeIndex] = useReducer((v) => v + 1, 0)

	useAutosave(mapChangeIndex, () => serializeHexes(hexMap), 1500)

	const setHexMapAndIncrementIndex = (
		arg: SetStateAction<Map<string, Hex>>,
	) => {
		setHexMap(arg)
		bumpMapChangeIndex()
	}

	return (
		<Wrapper data-theme={theme}>
			<Header
				toggleTheme={() =>
					setTheme((theme) => (theme === "light" ? "dark" : "light"))
				}
				hexMap={hexMap}
				setHexMap={setHexMap}
			/>
			<Main>
				<SVGMap
					hexMap={hexMap}
					setHexMap={setHexMapAndIncrementIndex}
					activeLayer={0}
				/>
			</Main>
		</Wrapper>
	)
}
