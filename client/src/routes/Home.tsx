import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export const Home = () => {
  const navigate = useNavigate()
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
          navigate("/NotFound404")
        }}
      >
        Error 404
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
