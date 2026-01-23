import { styled } from "@linaria/react"

const Wrapper = styled.div``

const Label = styled.label``

const Input = styled.input``

interface Props {
	label: string
	value: string
	setValue: (value: string) => void
}

export const TextInput = ({ label, value, setValue }: Props) => {
	return (
		<Wrapper>
			<Label>
				{label}
				<Input value={value} onChange={(e) => setValue(e.target.value)} />
			</Label>
		</Wrapper>
	)
}
