import type { Point } from "../types/Point"

export const getHexPoints = (center: Point, size: number): string => {
	const points: string[] = []

	for (let i = 0; i < 6; i++) {
		const angle = (Math.PI / 3) * i // 60° steps
		const x = center.x + size * Math.cos(angle)
		const y = center.y + size * Math.sin(angle)
		points.push(`${x},${y}`)
	}

	return points.join(" ")
}
