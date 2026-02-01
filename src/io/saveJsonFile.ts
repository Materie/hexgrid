let currentFileHandle: any | null = null

export const hasSaveTarget = () => currentFileHandle !== null

const writeToHandle = async (handle: any, data: unknown) => {
	const writable = await handle.createWritable()
	await writable.write(JSON.stringify(data, null, 2))
	await writable.close()
}

export const saveAsJsonFile = async (
	data: unknown,
	name: string,
): Promise<boolean> => {
	if (!("showSaveFilePicker" in window)) return false

	currentFileHandle = await (window as any).showSaveFilePicker({
		suggestedName: name,
		types: [
			{
				description: "JSON Files",
				accept: { "application/json": [".json"] },
			},
		],
	})

	await writeToHandle(currentFileHandle, data)
	return true
}

export const saveJsonFile = async (
	data: unknown,
	name = "map.json",
): Promise<boolean> => {
	if (currentFileHandle) {
		await writeToHandle(currentFileHandle, data)
		return true
	}

	return saveAsJsonFile(data, name)
}
