import { useIntl } from "react-intl"
import styled from "styled-components"
import { colors } from "../../components/styles/design.config"
import { NVText } from "../../components/styles/NVText"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVButton } from "../../components/styles/NVButton"
import { CGUButton } from "../../components/CGUButton"
import { socket } from "../../socket-context"

export const PaymentAccepted = () => {
  const intl = useIntl()

  socket.emit("User become premium")

  return (
    <Content>
      <NVText
        text={intl.formatMessage({
          id: "payment.accepted.text",
        })}
        textStyle={{ color: "nevadaGold", fontSize: 1.75, letterSpacing: 0.3 }}
      />
      <NVSpacer height={10} />
      <RowDiv>
        <NVButton
          disabled={false}
          content={intl.formatMessage({
            id: "button.profil",
          })}
          colorSchem={"black"}
          onClick={() => {
            window.location.assign("/nevada/main/profil")
          }}
        />
        <NVSpacer width={10} />
        <NVButton
          disabled={false}
          content={intl.formatMessage({
            id: "button.home",
          })}
          colorSchem={"black"}
          onClick={() => {
            window.location.assign("/nevada/main/home")
          }}
        />
      </RowDiv>
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

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`
