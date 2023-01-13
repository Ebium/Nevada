import styled from "styled-components"

interface SpacerProps {
  height?: number
  width?: number
}

export const NVSpacer = ({ height = 2, width = 2 }: SpacerProps) => (
  <StyledSpacer height={height} width={width} />
)

const StyledSpacer = styled.div<SpacerProps>`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  flex-shrink: 0;
`
