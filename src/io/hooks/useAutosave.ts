import { useEffect } from "react"
import { hasSaveTarget, saveJsonFile } from "../saveJsonFile"

/**
 * Autosaves after changes, after a file has been saved once.
 * @param version number updated whenever the map changes
 * @param getData function that returns the map data
 * @param delay How long should we wait after changes before saving?
 */
export const useAutosave = (
	version: number,
	getData: () => unknown,
	delay = 1000,
) => {
	useEffect(() => {
		if (!hasSaveTarget()) return

		const id = setTimeout(() => {
			saveJsonFile(getData())
			console.log("Autosaved data")
		}, delay)

		return () => clearTimeout(id)
	}, [version, getData, delay])
}
