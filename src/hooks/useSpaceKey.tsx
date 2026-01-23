import { useEffect, useState } from "react"

export const useSpaceKey = () => {
	const [space, setSpace] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.code === "Space") {
				e.preventDefault()
				setSpace(true)
			}
		}

		const up = (e: KeyboardEvent) => {
			if (e.code === "Space") {
				setSpace(false)
			}
		}

		window.addEventListener("keydown", down)
		window.addEventListener("keyup", up)

		return () => {
			window.removeEventListener("keydown", down)
			window.removeEventListener("keyup", up)
		}
	}, [])

	return space
}
