export const computeZoomStep = (
	zoom: number,
	direction: "in" | "out",
	maxFactor: number,
	minZoom: number,
	maxZoom: number
): number => {
	if (direction === "in") {
		const remaining = maxZoom / zoom
		if (remaining <= 1) return 1

		const steps = Math.ceil(Math.log(remaining) / Math.log(maxFactor))
		return Math.pow(remaining, 1 / steps)
	} else {
		const remaining = zoom / minZoom
		if (remaining <= 1) return 1

		const steps = Math.ceil(Math.log(remaining) / Math.log(maxFactor))

		return 1 / Math.pow(remaining, 1 / steps)
	}
}
