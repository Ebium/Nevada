import { useIntl } from "react-intl"
import styled from "styled-components/macro"
import { ReactComponent as NevadaLogo } from "../assets/nevada_logo_1.svg"
import { colors } from "./styles/design.config"
import { NVButton } from "./styles/NVButton"
import { NVSpacer } from "./styles/NVSpacer"
import { NVText } from "./styles/NVText"

export const NevadaHeader = () => {
  const intl = useIntl()

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
      <ButtonsPannel>
        <NVButton
          disabled={false}
          content={intl.formatMessage({ id: "header.log-in" })}
          colorSchem={"gold"}
          onClick={() => {
            console.log("random")
          }}
        />
        <NVButton
          disabled={false}
          content={intl.formatMessage({ id: "header.sign-in" })}
          colorSchem={"gold"}
          onClick={() => {
            console.log("random")
          }}
        />
      </ButtonsPannel>
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
display:flex;
flex-direction: column;
height: 100%;
justify-content: space-evenly;
z-index:2;
`

const CenteredTitle = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`
