import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { ReactComponent as NevadaLogo } from "../../assets/nevada_logo_2.svg"
import { colors } from "../../components/styles/design.config"
import { NVButton } from "../../components/styles/NVButton"
import { NVSpacer } from "../../components/styles/NVSpacer"

export const Showroom = () => {
  const navigate = useNavigate()

  return (
    <Content>
      <LeftDiv>
        <NevadaLogo />
      </LeftDiv>
      <RightDiv>
        <RowDiv>
          <TextDiv> text la</TextDiv>
          <NVSpacer width={8} />
        </RowDiv>
        <NVSpacer height={8} />
        <RowDiv>
          <NVButton
            disabled={false}
            content={"Page d'accueil"}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/home")
            }}
          />
          <NVSpacer width={8} />
        </RowDiv>
        <NVSpacer height={4} />
        <RowDiv>
          <NVButton
            disabled={false}
            content={"Règles du jeu"}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/home")
            }}
          />
          <NVSpacer width={8} />
          <NVButton
            disabled={false}
            content={"Nous soutenir"}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/home")
            }}
          />
          <NVSpacer width={8} />
        </RowDiv>
      </RightDiv>
    </Content>
  )
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.nevadaBackground};
  display: flex;
  flex-direction: row;
`

const LeftDiv = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RightDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const TextDiv = styled.div`
  color: ${colors.nevadaGold};
`
