import styled from "styled-components/macro"
import { colors } from "../../components/styles/design.config"
import { NVText } from "../../components/styles/NVText"
import { ReactComponent as NevadaLogo } from "../../assets/nevada_logo_1.svg"
import { NVLine } from "../../components/styles/NVLine"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { useIntl } from "react-intl"
import { NVButton } from "../../components/styles/NVButton"
import { useNavigate } from "react-router-dom"

export const CGU = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  return (
    <Content>
      <Placedlogo>
        <NevadaLogo width={125} height={125} />
      </Placedlogo>

      <ColumnStyle>
        <NVSpacer height={4} />
        <RowStyle>
          <SizedDiv>
            <NVText
              text={intl.formatMessage({ id: "CGU.text.1.1" })}
              textStyle={{
                color: "nevadaGold",
                lineHeight: 1.5,
                fontSize: 0.7,
              }}
            />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.1.2" })}
              textStyle={{ color: "nevadaGold", lineHeight: 2, fontSize: 0.7 }}
            />
            <NVSpacer height={2} />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.2.1" })}
              textStyle={{
                color: "nevadaGold",
                lineHeight: 1.5,
                fontSize: 0.7,
              }}
            />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.2.2" })}
              textStyle={{ color: "nevadaGold", lineHeight: 2, fontSize: 0.7 }}
            />
          </SizedDiv>
          <NVSpacer width={5} />
          <NVLine height={45} />
          <NVSpacer width={5} />

          <SizedDiv>
            <NVText
              text={intl.formatMessage({ id: "CGU.text.3.1" })}
              textStyle={{
                color: "nevadaGold",
                lineHeight: 1.5,
                fontSize: 0.7,
              }}
            />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.3.2" })}
              textStyle={{ color: "nevadaGold", lineHeight: 2, fontSize: 0.7 }}
            />
            <NVSpacer height={2} />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.4.1" })}
              textStyle={{
                color: "nevadaGold",
                lineHeight: 1.5,
                fontSize: 0.7,
              }}
            />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.4.2" })}
              textStyle={{ color: "nevadaGold", lineHeight: 2, fontSize: 0.7 }}
            />
            <NVSpacer height={2} />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.5.1" })}
              textStyle={{
                color: "nevadaGold",
                lineHeight: 1.5,
                fontSize: 0.7,
              }}
            />
            <NVText
              text={intl.formatMessage({ id: "CGU.text.5.2" })}
              textStyle={{ color: "nevadaGold", lineHeight: 2, fontSize: 0.7 }}
            />
            <NVSpacer height={5} />
            <ToCenter>
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.back" })}
                colorSchem={"black"}
                onClick={() => navigate(-1)}
              />
            </ToCenter>
          </SizedDiv>
        </RowStyle>
        <NVSpacer height={2} />
        <NVText
          text={intl.formatMessage({ id: "CGU.text.no-refund" })}
          textStyle={{ color: "nevadaGold", lineHeight: 2, fontSize: 0.8 }}
        />
      </ColumnStyle>
    </Content>
  )
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.nevadaBackground};
  overflow: auto;
`

const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Placedlogo = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`

const SizedDiv = styled.div`
  width: 45rem;
  display: flex;
  flex-direction: column;
`
const ToCenter = styled.div`
  display: flex;
  justify-content: center;
`
