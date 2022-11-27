import styled from "styled-components"
import { NevadaHeader } from "../../components/styles/NevadaHeader"
import { NVButton } from "../../components/styles/NVButton"

export const Payment = () => {
  return (
    <Content>
      <NevadaHeader />
      <NVButton
        disabled={false}
        content={"S'abonner"}
        colorSchem={"black"}
        onClick={() => {
          console.log("random")
        }}
      />
      a
      <NVButton
        disabled={false}
        content={"S'abonner"}
        colorSchem={"blue"}
        onClick={() => {
          console.log("random")
        }}
      />
      a
      <NVButton
        disabled={false}
        content={"Page d'accueil"}
        colorSchem={"gold"}
        onClick={() => {
          console.log("random")
        }}
      />
    </Content>
  )
}

const Content = styled.div`
  height: 100vh;
  width: 100vw;
  // background-color: gray;
`
