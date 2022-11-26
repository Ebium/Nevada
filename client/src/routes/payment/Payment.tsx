import styled from "styled-components"
import { NevadaHeader } from "../../components/styles/NevadaHeader"
import { NVButton } from "../../components/styles/NVButton"

export const Payment = () => {
  return (
    <Content>
      <NevadaHeader />
      <NVButton disabled={false} content={"S'abonner"} colorSchem={"black"} />
      a
      <NVButton disabled={false} content={"S'abonner"} colorSchem={"blue"} />
      a
      <NVButton
        disabled={false}
        content={"Page d'accueil"}
        colorSchem={"gold"}
      />
    </Content>
  )
}

const Content = styled.div`
  height: 100vh;
  width: 100vw;
  // background-color: gray;
`
