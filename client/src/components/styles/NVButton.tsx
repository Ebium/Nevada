import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"
import { NVText } from "./NVText"
import { ReactNode } from "react"

interface ButtonProps {
  disabled: boolean
  content: string
  colorSchem: "black" | "blue" | "gold" | "red"
  onClick: () => void
  cursor?: string
  svg?: ReactNode
}

export const NVButton = ({
  disabled,
  content,
  colorSchem,
  onClick,
  cursor,
  svg,
}: ButtonProps) => {
  const hasSvg = svg ? true : false

  return (
    <>
      <StyledButton
        hasSvg={hasSvg}
        colorSchem={colorSchem}
        disabled={disabled}
        onClick={onClick}
        cursor={cursor}
      >
        {svg ? <StyledSvg colorSchem={colorSchem}>{svg}</StyledSvg> : <></>}

        <StyledNVText
          disabled={disabled}
          text={content}
          cursor={cursor}
          textStyle={{
            color: colorSchem === "gold" ? "nevadaBlack" : "nevadaGold",
            fontSize: 0.8,
            fontWeight: 700,
          }}
        />
      </StyledButton>
    </>
  )
}

interface StyledButtonProps {
  disabled: boolean
  colorSchem: "black" | "blue" | "gold" | "red"
  cursor?: string
  hasSvg: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  cursor: ${({ disabled, cursor }) =>
    cursor ? cursor : disabled ? "not-allowed" : "pointer"};
  background-color: ${({ colorSchem }) =>
    colorSchem === "gold"
      ? colors.nevadaGold
      : colorSchem === "blue"
      ? colors.nevadaBlue
      : colorSchem === "red"
      ? colors.nevadaRed
      : colors.nevadaBlack};
  min-width: 12rem;
  min-height: 2.5rem;
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  box-shadow: 0 6px 0 0
    ${({ colorSchem }) =>
      colorSchem === "gold"
        ? colors.nevadaGoldLess
        : colorSchem === "blue"
        ? colors.nevadaBlueLess
        : colorSchem === "red"
        ? colors.nevadaRedLess
        : "black"};
  :hover {
    box-shadow: 0 4px 0 0
      ${({ colorSchem }) =>
        colorSchem === "gold"
          ? colors.nevadaGoldLess
          : colorSchem === "blue"
          ? colors.nevadaBlueLess
          : colorSchem === "red"
          ? colors.nevadaRedLess
          : "black"};
  }
`

interface StyledFontProps {
  disabled: boolean
  cursor?: string
}

const StyledNVText = styled(NVText)<StyledFontProps>`
  cursor: ${({ disabled, cursor }) =>
    cursor ? cursor : disabled ? "not-allowed" : "pointer"};
`

interface StyledSvgProps {
  colorSchem: "black" | "blue" | "gold" | "red"
}

const StyledSvg = styled.div<StyledSvgProps>`
  margin-right: 6px;
  margin-left: -1rem;
display: flex;
  align-items: center;
  justify-content: center;
  
  & path {
    stroke: ${({ colorSchem }) =>
      colorSchem === "gold" ? colors.nevadaBlack : colors.nevadaGold};
  }
`
