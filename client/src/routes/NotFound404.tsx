import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export const NotFound404 = () => {
  const navigate = useNavigate()

  return (
    <Content>
      error 404
      <StyledButton
        onClick={() => {
          navigate("/home")
        }}
      >
        Home
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/game")
        }}
      >
        Game
      </StyledButton>
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
