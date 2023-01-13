import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { colors } from "../../components/styles/design.config"
import { NVText } from "../../components/styles/NVText"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVButton } from "../../components/styles/NVButton"
import { CGUButton } from "../../components/CGUButton"

export const PaymentRefused = () => {
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <Content>
      <NVText
        text={intl.formatMessage({
          id: "payment.refused.header",
        })}
        textStyle={{ color: "nevadaGold", fontSize: 4, letterSpacing: 1 }}
      />
      <NVSpacer height={3} />

      <NVText
        text={intl.formatMessage({
          id: "payment.refused.text",
        })}
        textStyle={{ color: "nevadaGold", fontSize: 1.75, letterSpacing: 0.5 }}
      />
      <NVSpacer height={10} />
      <NVButton
        disabled={false}
        content={intl.formatMessage({
          id: "payment.refused.back-home",
        })}
        colorSchem={"black"}
        onClick={() => {
          navigate("/main/payment")
        }}
      />
      <NVSpacer height={5} />
      <CGUButton />
    </Content>
  )
}

const Content = styled.div`
  background-color: ${colors.nevadaBackground};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
