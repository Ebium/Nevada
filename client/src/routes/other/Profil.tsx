import styled from "styled-components/macro"
import { CGUButton } from "../../components/CGUButton"
import { ReturnHomeButton } from "../../components/ReturnHomeButton"

export const Profil = () => {
  return (
    <Content>
      <ReturnHomeButton />
      <CGUButton />
    </Content>
  )
}

const Content = styled.div`
  height: 100vh;
`
