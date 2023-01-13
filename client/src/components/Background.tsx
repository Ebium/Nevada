import styled from "styled-components/macro"
import { ReactNode } from "react"
import { colors } from "./styles/design.config"

export interface BackgroundProps {
  children: ReactNode
  centeredTop?: boolean
  padding?: number
}

export const Background = ({
  children,
  centeredTop = true,
  padding = 4,
}: BackgroundProps) => (
  <Absolute>
    <StyledContent padding={padding} centeredTop={centeredTop}>
      {children}
    </StyledContent>
  </Absolute>
)

const Absolute = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

interface WithCenteredTop {
  centeredTop: boolean
  padding: number
}

const StyledContent = styled.div<WithCenteredTop>`
  position: absolute;
  top: ${({ centeredTop }) => (centeredTop ? "24rem" : "0")};
  padding: ${({ centeredTop, padding }) =>
    centeredTop ? "0" : `${padding}rem`};
  height: ${({ centeredTop }) => (centeredTop ? "auto" : "100%")};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: ${({ centeredTop }) => (centeredTop ? "inherit" : "auto")};
  flex-grow: 1;
  background-color: ${colors.nevadaBackground};
`
