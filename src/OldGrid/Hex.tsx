import { styled } from "@linaria/react"
import type { SVGProps } from "react"

const Svg = styled.svg<{ $hover?: boolean }>`
	pointer-events: none;
	overflow: visible;
	path {
		pointer-events: fill;
		stroke-width: 1;
		stroke: var(--color-border);
		&:hover {
			z-index: 100;
			cursor: pointer;
			stroke-width: 2;
		}
	}
	/* &:hover {
		cursor: pointer;
		path {
			stroke-width: 2;
		}
	} */

	&[data-selected="true"] {
		path {
			stroke-width: 3;
			stroke: red;
		}
	}
`

interface HexProps extends SVGProps<SVGSVGElement> {
	hover?: boolean
	onClick: () => void
}

export const Hex = ({ hover, onClick, ...rest }: HexProps) => {
	return (
		<Svg
			width="116"
			height="100"
			viewBox="0 0 116 100"
			xmlns="http://www.w3.org/2000/svg"
			$hover={hover}
			{...rest}
		>
			<path
				d="
               M 29.63248654 0.5
               L 86.36751346 0.5
               L 115.23502692 50
               L 86.36751346 99.5
               L 29.63248654 99.5
               L 0.76497308 50
               Z
            "
				fill="transparent"
				onClick={() => onClick && onClick()}
				// {...(onClick ? onClick : {})}
			/>
		</Svg>
	)
}
