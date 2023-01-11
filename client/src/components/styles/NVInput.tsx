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
  width?: number
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
  width,
}: InputProps) => {
  const hasSvg = svg ? true : false

  return (
    <RowContent>
      {svg && type !== "submit" ? <StyledSvg>{svg}</StyledSvg> : <></>}
      <StyledInput
        width={width}
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
  width?: number
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
  width: ${({ hasSvg, width }) =>
    hasSvg ? "14rem" : width ? width + "rem" : "12rem"};
  min-height: ${({ isSubmit }) => (isSubmit ? "2.5rem" : "1rem")};
  border: none;
  border-radius: ${({ hasSvg }) => (hasSvg ? "0 10px 10px 0" : "10px")};
  padding: ${({ hasSvg }) => (hasSvg ? "1rem 3rem 1rem 1rem" : "1rem 3rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  font-size: ${({ isSubmit }) => (isSubmit ? "0.8rem" : "0.9rem")};
  font-weight: ${({ isSubmit }) => (isSubmit ? "600" : "unset")};
  font-family: "Inter";
  color: ${({ colorSchem }) =>
    colorSchem === "black" || colorSchem === "blue"
      ? colors.nevadaGold
      : colors.nevadaBlack};

  ::placeholder {
    color: ${colors.backgroundGrey};
  }

  box-shadow: 0 6px 0 0
    ${({ colorSchem, isSubmit }) =>
      !isSubmit
        ? "unset"
        : colorSchem === "gold"
        ? colors.nevadaGoldLess
        : colorSchem === "blue"
        ? colors.nevadaBlueLess
        : colorSchem === "black"
        ? "black"
        : colors.midGrey};

  :hover {
    box-shadow: ${({ isSubmit, colorSchem }) =>
      !isSubmit
        ? "unset"
        : `0 4px 0 0
        ${
          colorSchem === "gold"
            ? colors.nevadaGoldLess
            : colorSchem === "blue"
            ? colors.nevadaBlueLess
            : "black"
        }`};
  }
`

const StyledSvg = styled.div`
  background-color: ${colors.midGrey};
  width: 2.5rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 0 0 10px;
`
