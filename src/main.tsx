import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Modal from "react-modal"

import { App } from "./App.tsx"

Modal.setAppElement("#root")

import "./main.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
