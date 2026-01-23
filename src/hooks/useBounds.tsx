import { useLayoutEffect, useState } from "react"

export const useBounds = <T extends Element>(
	ref: React.RefObject<T | null>,
) => {
	const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 })

	useLayoutEffect(() => {
		if (!ref.current) return

		const element = ref.current

		const update = () => {
			const rect = element.getBoundingClientRect()
			setSize({
				width: rect.width,
				height: rect.height,
				top: rect.top,
				left: rect.left,
			})
		}

		update()

		const observer = new ResizeObserver(update)
		observer.observe(element)

		return () => observer.disconnect()
	}, [ref])

	return size
}
