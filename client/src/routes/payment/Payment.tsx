import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { NVButton } from "../../components/styles/NVButton"

export const Payment = () => {
  const navigate = useNavigate()

  return (
    <Content>
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
          navigate("/main/home")
        }}
      />
    </Content>
  )
}

const Content = styled.div`
  height: 100vh;
  width: 100vw;
`
