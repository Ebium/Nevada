import styled from "styled-components"
import { colors } from "./design.config"

interface LineProps {
  height?: number
  width?: number
  color?: keyof typeof colors
  fullWidth?: boolean
  fullHeight?: boolean
}

export const NVLine = ({ height = 0.1, width = 0.1, color }: LineProps) => (
  <StyledLine height={height} width={width} color={color} />
)

const StyledLine = styled.div<LineProps>`
  width: ${({ width, fullWidth }) => (fullWidth ? "100%" : `${width}rem`)};
  height: ${({ height, fullHeight }) => (fullHeight ? "100%" : `${height}rem`)};
  flex-shrink: 0;
  background-color: ${({ color }) =>
    color ? colors[color] : colors.nevadaGold};
`
