import { DEFAULT_FILE_NAME } from "../constants"

export const saveJsonToFile = async (
	data: unknown,
	defaultName: string = DEFAULT_FILE_NAME,
) => {
	const json = JSON.stringify(data, null, 2)

	// ✅ Modern browsers (Chrome, Edge, etc.)
	if ("showSaveFilePicker" in window) {
		const handle = await (window as any).showSaveFilePicker({
			suggestedName: defaultName,
			types: [
				{
					description: "JSON Files",
					accept: { "application/json": [".json"] },
				},
			],
		})

		const writable = await handle.createWritable()
		await writable.write(json)
		await writable.close()
		return
	}

	// ✅ Fallback (Firefox/Safari)
	const blob = new Blob([json], { type: "application/json" })
	const url = URL.createObjectURL(blob)

	const a = document.createElement("a")
	a.href = url
	a.download = defaultName
	a.click()

	URL.revokeObjectURL(url)
}
