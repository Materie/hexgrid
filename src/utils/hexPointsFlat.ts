export const hexPointsFlat = (size: number) => {
	const h = (Math.sqrt(3) * size) / 2

	return [
		[size, 0],
		[size / 2, h],
		[-size / 2, h],
		[-size, 0],
		[-size / 2, -h],
		[size / 2, -h],
	]
}
