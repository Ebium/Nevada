import styled from "styled-components/macro"
import { ReactComponent as NevadaLogo } from "../assets/nevada_logo_1.svg"
import { colors } from "./styles/design.config"

export const NevadaHeader = () => {
  return (
    <Content>
      {" "}
      <NevadaLogo height={150} />{" "}
    </Content>
  )
}

const Content = styled.div`
  background-color: ${colors.nevadaGold};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
