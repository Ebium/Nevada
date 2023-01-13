import * as React from "react"
import styled from "styled-components"

type SpacingUnit =
  | 0
  | 0.25
  | 0.5
  | 1
  | 1.25
  | 1.5
  | 1.75
  | 2
  | 2.25
  | 2.5
  | 3
  | 3.75
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12

interface SpacerProps {
  height?: SpacingUnit
  width?: SpacingUnit
}

export const NVSpacer = ({ height = 2, width = 2 }: SpacerProps) => (
  <StyledSpacer height={height} width={width} />
)

const StyledSpacer = styled.div<SpacerProps>`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  flex-shrink: 0;
`
