import styled from "styled-components"
import { colors } from "./design.config"
import "@fontsource/inter"

export const NVText = (props: TextProps) => {
  return <StyledText {...props}>{props.text}</StyledText>
}
export interface TextProps {
  text: string
  textStyle?: {
    color?: keyof typeof colors
    fontSize?: number
    lineHeight?: number
    underline?: boolean
    fontStyle?: "normal" | "italic"
    fontWeight?: number
    textTransform?: "uppercase" | "lowercase" | "capitalize" | "initial"
    cursor?: "pointer" | "auto" | "default" | "not-allowed"
    textAlign?: "center" | "justify"
    letterSpacing?: number
  }
  onClick?: () => void
  width?: number
}

const StyledText = styled.span<TextProps>`
  font-family: "Inter";
  font-weight: ${({ textStyle }) =>
    textStyle && textStyle.fontWeight ? textStyle.fontWeight : 400};
  color: ${({ textStyle }) =>
    textStyle && textStyle.color
      ? colors[textStyle.color]
      : colors.nevadaBlack};
  line-height: ${({ textStyle }) =>
    textStyle && textStyle.lineHeight ? `${textStyle.lineHeight}rem` : "auto"};
  font-size: ${({ textStyle }) =>
    textStyle && textStyle.fontSize ? `${textStyle.fontSize}rem` : "1rem"};
  text-decoration: ${({ textStyle }) =>
    textStyle && textStyle.underline ? "underline" : "none"};
  cursor: ${({ textStyle }) =>
    textStyle && textStyle.underline
      ? "pointer"
      : textStyle?.cursor
      ? textStyle.cursor
      : "auto"};
  text-transform: ${({ textStyle }) =>
    textStyle && textStyle.textTransform ? textStyle.textTransform : "initial"};
  text-align: ${({ textStyle }) =>
    textStyle && textStyle.textAlign ? textStyle.textAlign : "start"};
  font-style: ${({ textStyle }) =>
    textStyle && textStyle.fontStyle ? textStyle.fontStyle : "normal"};
  letter-spacing: ${({ textStyle }) =>
    textStyle && textStyle.letterSpacing
      ? `${textStyle.letterSpacing}rem`
      : "1px"};
  width: ${({ width }) => width + "rem"};
`
