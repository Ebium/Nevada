import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"
import { ReactNode } from "react"

interface InputProps {
  disabled: boolean
  value: string
  onChange: () => void
  type: string
  placeholder: string
  svg?: ReactNode
}

export const NVInput = ({
  disabled,
  value,
  onChange,
  type,
  placeholder,
  svg,
}: InputProps) => {
  const hasSvg = svg ? true : false

  return (
    <RowContent>
      {svg ? <BlueBg>{svg}</BlueBg> : <></>}
      <StyledInput
        disabled={disabled}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        hasSvg={hasSvg}
      />
    </RowContent>
  )
}

interface StyledInputProps {
  disabled: boolean
  hasSvg: boolean
}

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledInput = styled.input<StyledInputProps>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "unset")};
  background-color: white;
  width: 14rem;
  height: 1rem;
  border: none;
  border-radius: ${({ hasSvg }) => (hasSvg ? "0 10px 10px 0" : "10px")};
  padding: ${({ hasSvg }) => (hasSvg ? "1rem 3rem 1rem 1rem" : "1rem 3rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  font-size: 0.9rem;

  ::placeholder {
    color: ${colors.midGrey};
    font-family: "Inter";
  }
`

const BlueBg = styled.div`
  background-color: ${colors.midGrey};
  width: 2.5rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 0 0 10px;
`
