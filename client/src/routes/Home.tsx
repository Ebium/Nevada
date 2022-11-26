import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useNevadaSelector } from "../store/rootReducer"

export const Home = () => {
  const navigate = useNavigate()
  const sockID = useNevadaSelector((state) => state.user.socketId)

  return (
    <Content>
      Home page
      <StyledButton
        onClick={() => {
          navigate("/game")
        }}
      >
        Game
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/pay")
        }}
      >
        Pay
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/NotFound404")
        }}
      >
        Error 404
      </StyledButton>
      Socket id for current connection = {sockID}
    </Content>
  )
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled.button`
  margin-top: 2rem;
`
