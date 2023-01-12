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

export const NevadaHeader = () => {
  const intl = useIntl()
  const location = useLocation()
  const navigate = useNavigate()

  const userPseudo = useNevadaSelector((state) => state.user.pseudo)

  return (
    <Content>
      <NevadaLogo height={125} width={260} />
      <CenteredTitle>
        <NVText
          text={intl.formatMessage({ id: "header.title" })}
          textStyle={{
            color: "nevadaGold",
            textTransform: "uppercase",
            fontSize: 4,
            letterSpacing: 2,
          }}
        />
      </CenteredTitle>

      {!location.pathname.includes("login") && (
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
                navigate("/main/login")
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
      )}
    </Content>
  )
}

const Content = styled.div`
  background-color: ${colors.nevadaBlack};
  height: 11rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonsPannel = styled.div`
  margin-right: 10rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  z-index: 2;
`

const CenteredTitle = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledLogoutSVG= styled(LogoutSVG)`
& path {
  fill: black;
}
`
const StyledLoginSVG= styled(LoginSVG)`
& path {
  fill: black;
}
`