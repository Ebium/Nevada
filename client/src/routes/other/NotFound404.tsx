import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { colors } from "../../components/styles/design.config"
import { NVText } from "../../components/styles/NVText"
import { ReactComponent as NevadaLogo } from "../../assets/nevada_logo_1.svg"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVButton } from "../../components/styles/NVButton"

export const NotFound404 = () => {
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <Content>
      <NVText
        text={intl.formatMessage({
          id: "error404.header",
        })}
        textStyle={{ color: "nevadaGold", fontSize: 6, letterSpacing: 2 }}
      />
      <NVSpacer height={3} />

      <NVText
        text={intl.formatMessage({
          id: "error404.text",
        })}
        textStyle={{ color: "nevadaGold", fontSize: 2, letterSpacing: 0.8 }}
      />
      <NVSpacer height={2} />
      <NevadaLogo />
      <NVSpacer height={5} />
      <NVButton
        disabled={false}
        content={intl.formatMessage({
          id: "error404.back-home",
        })}
        colorSchem={"black"}
        onClick={() => {
          navigate("/main/home")
        }}
      />
      <NVSpacer height={5} />
    </Content>
  )
}

const Content = styled.div`
  background-color: ${colors.nevadaBackground};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
