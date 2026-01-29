export const HEX_SIZE = 32
export const ZOOM_STEP = 1.1
export const MIN_ZOOM = 0.25
export const MAX_ZOOM = 4

export const MAX_WHEEL_ZOOM_STEP = 1.1
export const MAX_BUTTON_ZOOM_STEP = 1.4

const HEX_NEIGHBOR_TOP = { x: 1, y: 0 }
const HEX_NEIGHBOR_BOTTOM = { x: -1, y: 0 }

const HEX_NEIGHBOR_TOP_LEFT = { x: 1, y: -1 }
const HEX_NEIGHBOR_BOTTOM_LEFT = { x: 0, y: -1 }

const HEX_NEIGHBOR_TOP_RIGHT = { x: 0, y: 1 }
const HEX_NEIGHBOR_BOTTOM_RIGHT = { x: -1, y: 1 }

export const NEIGHBOR_OFFSETS = [
	HEX_NEIGHBOR_TOP,
	HEX_NEIGHBOR_TOP_LEFT,
	HEX_NEIGHBOR_BOTTOM_LEFT,
	HEX_NEIGHBOR_BOTTOM,
	HEX_NEIGHBOR_BOTTOM_RIGHT,
	HEX_NEIGHBOR_TOP_RIGHT,
]

export const DEFAULT_FILE_NAME = "Hex-kart.json"
