import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CGUButton } from "../../components/CGUButton"
import { NVButton } from "../../components/styles/NVButton"
import { NVText } from "../../components/styles/NVText"
import { useNevadaSelector } from "../../store/rootReducer"

export const Temp = () => {
  const navigate = useNavigate()
  const sockID = useNevadaSelector((state) => state.user.socketId)
  const intl = useIntl()

  return (
    <Content>
      Home page
      <StyledButton
        onClick={() => {
          navigate("/main/game")
        }}
      >
        Game
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/main/pay")
        }}
      >
        Pay
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/main/payment")
        }}
      >
        Payment page
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/main/login")
        }}
      >
        Login
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/main/createroom")
        }}
      >
        Create Room
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/NotFound404")
        }}
      >
        Error 404
      </StyledButton>
      <StyledButton
        onClick={() => {
          navigate("/showroom")
        }}
      >
        showroom (main page en gros)
      </StyledButton>
      Socket id for current connection = {sockID}
      <CGUButton />
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

const StyledLink = styled.a`
  text-decoration: none;
`
