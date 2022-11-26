import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"

interface ButtonProps {
  disabled: boolean
  content: string
  colorSchem: "black" | "blue" | "gold"
}

export const NVButton = ({ disabled, content, colorSchem }: ButtonProps) => {
  return (
    <>
      <StyledButton
        colorSchem={colorSchem}
        disabled={disabled}
        onClick={() => {
          console.log("button")
        }}
      >
        <StyledFont colorSchem={colorSchem} disabled={disabled}>
          {content}
        </StyledFont>
      </StyledButton>
    </>
  )
}

interface StyledButtonProps {
  disabled: boolean
  colorSchem: "black" | "blue" | "gold"
}

const StyledButton = styled.button<StyledButtonProps>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ colorSchem }) =>
    colorSchem === "gold"
      ? colors.nevadaGold
      : colorSchem === "blue"
      ? colors.nevadaBlue
      : colors.nevadaBlack};
  min-width: 14.5rem;
  height: 3.1rem;
  border: none;
  border-radius: 10px;
  margin-left: 50rem;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface StyledFontProps {
  disabled: boolean
  colorSchem: "black" | "blue" | "gold"
}

const StyledFont = styled.div<StyledFontProps>`
  color: ${({ colorSchem, disabled }) =>
    disabled
      ? "grey"
      : colorSchem === "gold"
      ? colors.nevadaBlack
      : colors.nevadaGold};
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 32px;
`
