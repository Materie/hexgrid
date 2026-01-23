import { styled } from "@linaria/react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

const Wrapper = styled.button`
	cursor: pointer;
	border: 2px solid var(--color-border);
	background-color: var(--color-bg);
	border-radius: 50%;
	height: 40px;
	width: 40px;

	color: var(--color-border);

	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		display: none;
	}

	*[data-theme="dark"] & {
		svg[data-mode="dark"] {
			display: block;
		}
	}

	*[data-theme="light"] & {
		svg[data-mode="light"] {
			display: block;
		}
	}
`

interface Props {
	mode: "dark" | "light"
	toggleTheme: () => void
}

export const ModeSwitchButton = ({ mode, toggleTheme }: Props) => {
	return (
		<Wrapper onClick={toggleTheme}>
			<MdDarkMode data-mode="dark" />
			<MdLightMode data-mode="light" />
		</Wrapper>
	)
}
