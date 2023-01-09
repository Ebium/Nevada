import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"
import { ReactNode } from "react"

interface InputProps {
  disabled: boolean
  value?: string
  onChange?: (arg0?: any) => void
  type: string
  placeholder?: string
  svg?: ReactNode
  colorSchem?: "black" | "blue" | "gold"
  required?: boolean
}

export const NVInput = ({
  disabled,
  value,
  onChange,
  type,
  placeholder,
  svg,
  required,
  colorSchem,
}: InputProps) => {
  const hasSvg = svg ? true : false

  return (
    <RowContent>
      {svg && type !== "submit" ? <StyledSvg>{svg}</StyledSvg> : <></>}
      <StyledInput
        colorSchem={colorSchem ? colorSchem : ""}
        isSubmit={type === "submit"}
        disabled={disabled}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        hasSvg={hasSvg}
        required={required}
      />
    </RowContent>
  )
}

interface StyledInputProps {
  disabled: boolean
  hasSvg: boolean
  isSubmit: boolean
  colorSchem: "black" | "blue" | "gold" | ""
}

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledInput = styled.input<StyledInputProps>`
  cursor: ${({ disabled, isSubmit }) =>
    disabled ? "not-allowed" : isSubmit ? "pointer" : "unset"};
  background-color: ${({ colorSchem }) =>
    colorSchem === ""
      ? "white"
      : colorSchem === "gold"
      ? colors.nevadaGold
      : colorSchem === "blue"
      ? colors.nevadaBlue
      : colors.nevadaBlack};
  width: ${({ hasSvg }) => (hasSvg ? "14rem" : "14.5rem")};
  height: ${({ isSubmit }) => (isSubmit ? "3rem" : "1rem")};
  border: none;
  border-radius: ${({ hasSvg }) => (hasSvg ? "0 10px 10px 0" : "10px")};
  padding: ${({ hasSvg }) => (hasSvg ? "1rem 3rem 1rem 1rem" : "1rem 3rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  font-size: ${({ isSubmit }) => (isSubmit ? "1rem" : "0.9rem")};
  font-weight: ${({ isSubmit }) => (isSubmit ? "600" : "unset")};
  font-family: "Inter";
  color: ${({ colorSchem }) =>
    colorSchem === "black" || colorSchem === "blue"
      ? colors.nevadaGold
      : colors.nevadaBlack};

  ::placeholder {
    color: ${colors.midGrey};
  }

  :hover {
    box-shadow: ${({ isSubmit, colorSchem }) =>
      !isSubmit
        ? "unset"
        : `0px 0px 0.3rem ${
            colorSchem === "gold" ? colors.nevadaBlack : colors.nevadaGold
          }`};
  }
`

const StyledSvg = styled.div`
  background-color: ${colors.midGrey};
  width: 2.5rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 0 0 10px;
`
