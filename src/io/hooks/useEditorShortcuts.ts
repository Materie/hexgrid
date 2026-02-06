import { useEffect } from "react"
import { saveJsonFile, saveAsJsonFile } from "../saveJsonFile"
import { openJsonFile } from "../openJsonFile"

type Options = {
	getSaveData: () => unknown
	onImport: (data: any) => void
	onClearSelection: () => void
	onDeleteSelection: () => void
}

export const useEditorShortcuts = ({
	getSaveData,
	onImport,
	onClearSelection,
	onDeleteSelection,
}: Options) => {
	useEffect(() => {
		const onKeyDown = async (e: KeyboardEvent) => {
			const ctrl = e.ctrlKey || e.metaKey // mac support

			// -----------------
			// Save + Save As
			// -----------------
			if (ctrl && e.key === "s") {
				e.preventDefault()

				if (e.shiftKey) {
					await saveAsJsonFile(getSaveData(), "map.json")
				} else {
					await saveJsonFile(getSaveData())
				}
				return
			}

			// -----------------
			// Open / Import
			// -----------------
			if (ctrl && e.key === "o") {
				e.preventDefault()

				const data = await openJsonFile()
				if (data) onImport(data)
				return
			}

			// -----------------
			// Clear selection
			// -----------------
			if (e.key === "Escape") {
				onClearSelection()
				return
			}

			// -----------------
			// Delete selection
			// -----------------
			if (e.key === "Delete" || e.key === "Backspace") {
				onDeleteSelection()
				return
			}
		}

		window.addEventListener("keydown", onKeyDown)
		return () => window.removeEventListener("keydown", onKeyDown)
	}, [getSaveData, onImport, onClearSelection, onDeleteSelection])
}
