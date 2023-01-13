import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"
import { ReactNode } from "react"
import { NVText } from "./NVText"
import { ReactComponent as DefaultSVG } from "../../assets/game_code.svg"
import { useIntl } from "react-intl"

interface InputProps {
  svg?: ReactNode
  fillsvg?: keyof typeof colors
  width?: number
  text: string
  data?: any
  clickable?: boolean
  onClick?: () => void
  toprightB?: number
  topleftB?: number
  bottomrightB?: number
  bottomleftB?: number
}

export const NVBar = ({
  svg,
  width,
  text,
  data,
  onClick,
  clickable,
  toprightB = 10,
  topleftB = 10,
  bottomrightB = 10,
  bottomleftB = 10,
  fillsvg,
}: InputProps) => {
  const hasSvg = svg ? true : false
  const intl = useIntl()

  return (
    <RowContent clickable={clickable}>
      <StyledSvg
        topleftB={topleftB}
        bottomleftB={bottomleftB}
        fillsvg={fillsvg}
      >
        {svg ? svg : <DefaultSVG />}
      </StyledSvg>
      <StyledDiv
        toprightB={toprightB}
        bottomrightB={bottomrightB}
        clickable={clickable}
        width={width}
        hasSvg={hasSvg}
        onClick={() => {
          clickable && onClick && onClick()
        }}
      >
        <NVText
          text={intl.formatMessage({ id: text }, { data: data })}
          textStyle={{
            color: "topGrey",
            fontWeight: 600,
            fontSize: 0.9,
            cursor: clickable
              ? "pointer"
              : clickable === undefined
              ? "default"
              : "not-allowed",
          }}
        />
      </StyledDiv>
    </RowContent>
  )
}

interface StyledDivProps {
  hasSvg?: boolean
  width?: number
  clickable?: boolean
  toprightB?: number
  topleftB?: number
  bottomrightB?: number
  bottomleftB?: number
  fillsvg?: keyof typeof colors
}

const RowContent = styled.div<StyledDivProps>`
  cursor: ${({ clickable }) =>
    clickable
      ? "pointer"
      : clickable === undefined
      ? "default"
      : "not-allowed"};
  display: flex;
  flex-direction: row;
  height: box-content;

  border-radius: 10px;
`

const StyledDiv = styled.div<StyledDivProps>`
  background-color: ${colors.white};
  min-width: ${({ width }) => (width ? width + "rem" : "2rem")};
  height: 2.5rem;
  border: none;
  border-radius: ${({ bottomrightB, toprightB }) =>
    `0 ${toprightB}px ${bottomrightB}px 0`};
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  font-size: 0.9rem;
  font-family: "Inter";
  color: ${colors.topGrey};
`

const StyledSvg = styled.div<StyledDivProps>`
  background-color: ${colors.topGrey};
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ bottomleftB, topleftB }) =>
    `${topleftB}px 0 0 ${bottomleftB}px`};
  & path {
    fill: ${({ fillsvg }) => (fillsvg ? colors[fillsvg] : "white")};
  }
`
