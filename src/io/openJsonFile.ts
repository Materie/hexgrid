export const openJsonFile = async <T = unknown>(): Promise<T | null> => {
	// Modern browsers
	if ("showOpenFilePicker" in window) {
		const [handle] = await (window as any).showOpenFilePicker({
			types: [
				{
					description: "JSON Files",
					accept: { "application/json": [".json"] },
				},
			],
			multiple: false,
		})

		const file = await handle.getFile()
		const text = await file.text()

		return JSON.parse(text) as T
	}

	// Fallback (Firefox/Safari)
	return new Promise((resolve) => {
		const input = document.createElement("input")
		input.type = "file"
		input.accept = "application/json"

		input.onchange = () => {
			const file = input.files?.[0]
			if (!file) return resolve(null)

			file.text().then((text) => resolve(JSON.parse(text)))
		}

		input.click()
	})
}
