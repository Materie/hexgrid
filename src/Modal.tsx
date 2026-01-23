import { css } from "@linaria/core"
import ReactModal from "react-modal"

const OverlayCSS = css`
	z-index: 1000;
	position: fixed;
	inset: 0px;
	background-color: rgba(255, 255, 255, 0.75);

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;
`

const ModalCSS = css`
	position: absolute;
	inset: 40px;
	border: 1px solid rgb(204, 204, 204);
	background: rgb(255, 255, 255);
	overflow: auto;
	border-radius: 4px;
	outline: none;
	padding: 20px;

	cursor: default;

	/* width: min(350px, 100vw);
	height: min(250px, 100vh); */
`

export const Modal = (props: ReactModal.Props) => {
	return (
		<ReactModal
			{...props}
			overlayClassName={OverlayCSS}
			className={ModalCSS}
		/>
	)
}
