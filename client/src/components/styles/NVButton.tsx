import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"
import { NVText } from "./NVText"
import { ReactNode } from "react"

interface ButtonProps {
  disabled: boolean
  content: string
  colorSchem: "black" | "blue" | "gold"
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
            fontSize: 1,
            fontWeight: 700,
            letterSpacing: 0.1,
          }}
        />
      </StyledButton>
    </>
  )
}

interface StyledButtonProps {
  disabled: boolean
  colorSchem: "black" | "blue" | "gold"
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
      : colors.nevadaBlack};
  min-width: 14.5rem;
  height: 3.1rem;
  border: none;
  border-radius: 10px;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  :hover {
    box-shadow: 0px 0px 0.3rem
      ${({ colorSchem }) =>
        colorSchem === "gold" ? colors.nevadaBlack : colors.nevadaGold};
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
  colorSchem: "black" | "blue" | "gold"
}

const StyledSvg = styled.div<StyledSvgProps>`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & path {
    stroke: ${({ colorSchem }) =>
      colorSchem === "gold" ? colors.nevadaBlack : colors.nevadaGold};
  }
`
