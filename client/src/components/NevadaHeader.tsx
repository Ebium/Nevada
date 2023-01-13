import { useIntl } from "react-intl"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { ReactComponent as NevadaLogo } from "../assets/nevada_logo_1.svg"
import { ReactComponent as LogoutSVG } from "../assets/logout.svg"
import { ReactComponent as LoginSVG } from "../assets/login.svg"
import { useNevadaSelector } from "../store/rootReducer"
import { colors } from "./styles/design.config"
import { NVButton } from "./styles/NVButton"
import { NVText } from "./styles/NVText"
import { userDisconnect } from "../utils/Deconnection"
import { NVSpacer } from "./styles/NVSpacer"

export const NevadaHeader = () => {
  const intl = useIntl()
  const location = useLocation()
  const navigate = useNavigate()

  const userPseudo = useNevadaSelector((state) => state.user.pseudo)

  return (
    <Content>
      <StyledNevadaLogo />
      <NevadaTitle>
        <NVText
          text={intl.formatMessage({ id: "header.title" })}
          textStyle={{
            color: "nevadaGold",
            textTransform: "uppercase",
            fontSize: 4,
            letterSpacing: 2,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/showroom")
          }}
        />
      </NevadaTitle>
      {!location.pathname.includes("login") ? (
        <ButtonsPannel>
          {userPseudo ? (
            <>
              <NVButton
                disabled={true}
                content={userPseudo}
                cursor={"unset"}
                colorSchem={"blue"}
                onClick={() => {
                  navigate("/main/profil")
                }}
              />
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "header.logout" })}
                colorSchem={"gold"}
                onClick={() => {
                  userDisconnect()
                  // navigate("/main/login")
                }}
                svg={<StyledLogoutSVG />}
              />
            </>
          ) : (
            <NVButton
              disabled={false}
              content={intl.formatMessage({ id: "header.loginSignup" })}
              colorSchem={"gold"}
              onClick={() => {
                navigate("/main/login")
              }}
              svg={<StyledLoginSVG />}
            />
          )}
        </ButtonsPannel>
      ) : (
        <>
          <NVSpacer width={15} />
        </>
      )}
    </Content>
  )
}

const Content = styled.div`
  position: relative;
  background-color: ${colors.nevadaBlack};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 3rem;
  height: 10rem;
  box-sizing: border-box;
`
const NevadaTitle = styled.div``
const ButtonsPannel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`

const StyledLogoutSVG = styled(LogoutSVG)`
  & path {
    fill: black;
  }
`
const StyledLoginSVG = styled(LoginSVG)`
  & path {
    fill: black;
  }
`
const StyledNevadaLogo = styled(NevadaLogo)`
  position: relative;
  left: -2.5rem;
  height: 125px;
  width: 260px;
`
