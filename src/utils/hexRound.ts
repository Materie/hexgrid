import type { Hex } from "../types/Hex"

export const hexRound = (q: number, r: number): Hex => {
	let x = q
	let z = r
	let y = -x - z

	let rx = Math.round(x)
	let ry = Math.round(y)
	let rz = Math.round(z)

	const dx = Math.abs(rx - x)
	const dy = Math.abs(ry - y)
	const dz = Math.abs(rz - z)

	if (dx > dy && dx > dz) rx = -ry - rz
	else if (dy > dz) ry = -rx - rz
	else rz = -rx - ry

	return {
		x: rx,
		y: rz,
		layer: 0, // keep your layer logic
	}
}
