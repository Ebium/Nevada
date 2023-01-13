import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { ReactComponent as NevadaLogo } from "../../assets/nevada_logo_2.svg"
import { RulesButton } from "../../components/RulesButton"
import { colors } from "../../components/styles/design.config"
import { NVButton } from "../../components/styles/NVButton"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVText } from "../../components/styles/NVText"

export const Showroom = () => {
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <Content>
      <LeftDiv>
        <NevadaLogo />
      </LeftDiv>
      <RightDiv>
        <RowDiv style={{ width: "40rem" }}>
          <NVText
            text={intl.formatMessage({
              id: "showroom.content",
            })}
            textStyle={{
              color: "nevadaGold",
              textAlign: "center",
              fontSize: 1.5,
            }}
          />
          <NVSpacer width={8} />
        </RowDiv>
        <NVSpacer height={8} />
        <RowDiv>
          <NVButton
            disabled={false}
            content={intl.formatMessage({
              id: "button.home",
            })}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/home")
            }}
          />
          <NVSpacer width={8} />
        </RowDiv>
        <NVSpacer height={4} />
        <RowDiv>
          <RulesButton />
          <NVSpacer width={8} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({
              id: "button.help-us",
            })}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/payment")
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
