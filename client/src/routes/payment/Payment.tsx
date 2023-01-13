import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CGUButton } from "../../components/CGUButton"
import { ReturnHomeButton } from "../../components/ReturnHomeButton"
import { colors } from "../../components/styles/design.config"
import { NVButton } from "../../components/styles/NVButton"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVText } from "../../components/styles/NVText"
import { useNevadaSelector } from "../../store/rootReducer"
import { getDonateAmountUrl } from "../../utils/Donation"
import {
  getPremiumSubscriptionUrl,
  getPremiumLifeSubscriptionUrl,
  requestPremiumUnsubscription,
} from "../../utils/Subscription"

export const Payment = () => {
  const navigate = useNavigate()
  const intl = useIntl()
  const userPseudo = useNevadaSelector((state) => state.user.pseudo)
  const isUserPremium = useNevadaSelector((state) => state.user.isPremium)
  const isUserPremiumLifeTime = useNevadaSelector(
    (state) => state.user.isPremiumLifeTime
  )

  return (
    <Content>
      {isUserPremiumLifeTime ? (
        <>
          <NVText
            text={intl.formatMessage({ id: "payment.isPremiumLifeTime.title" })}
            textStyle={{
              color: "nevadaGold",
              fontSize: 1.2,
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: 0.2,
              lineHeight: 1.8,
            }}
          />
          <NVSpacer height={4} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({
              id: "button.profil",
            })}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/profil")
            }}
          />
        </>
      ) : !isUserPremium ? (
        <>
          <NVText
            text={intl.formatMessage({ id: "payment.benefit.title" })}
            textStyle={{
              color: "nevadaGold",
              fontSize: 1.2,
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: 0.2,
              lineHeight: 1.8,
            }}
          />
          <NVSpacer height={3} />
          <RowDiv>
            <Card>
              <NVText
                text={intl.formatMessage({ id: "payment.benefit.1" })}
                textStyle={{
                  color: "nevadaGold",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 0.2,
                  lineHeight: 1.8,
                }}
              />
              <NVSpacer height={2} />
              <RowDiv>
                <ColoredCircle color="red" />
                <NVSpacer width={1} />
                <ColoredCircle color="brown" />
                <NVSpacer width={1} />
                <ColoredCircle color="yellow" />
                <NVSpacer width={1} />
                <ColoredCircle color="lime" />
                <NVSpacer width={1} />
                <ColoredCircle color="darkblue" />
                <NVSpacer width={1} />
                <ColoredCircle color="cyan" />
                <NVSpacer width={1} />
                <ColoredCircle color="magenta" />
              </RowDiv>
              <NVSpacer height={1} />
              <NVText
                text={intl.formatMessage({ id: "payment.benefit.1.2" })}
                textStyle={{
                  color: "nevadaGold",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 0.2,
                  lineHeight: 1.8,
                }}
              />
            </Card>
            <NVSpacer width={10} />
            <Card>
              <NVSpacer height={3} />
              <NVText
                text={intl.formatMessage({ id: "payment.benefit.2" })}
                textStyle={{
                  color: "nevadaGold",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 0.2,
                  lineHeight: 1.8,
                }}
              />
              <NVSpacer height={1} />
              {userPseudo ? (
                <>
                  <NVText
                    text={"👑 " + userPseudo}
                    textStyle={{
                      color: "nevadaGold",
                      fontWeight: 700,
                      textAlign: "center",
                      letterSpacing: 0.2,
                      lineHeight: 1.8,
                    }}
                  />
                </>
              ) : (
                <>👑</>
              )}
            </Card>
            <NVSpacer width={10} />
            <Card>
              <NVText
                text={intl.formatMessage({ id: "payment.benefit.3" })}
                textStyle={{
                  color: "nevadaGold",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 0.2,
                  lineHeight: 1.8,
                }}
              />
              <NVSpacer height={2} />
              <NVText
                text={intl.formatMessage({ id: "payment.benefit.4" })}
                textStyle={{
                  color: "midGrey",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 0.2,
                  lineHeight: 1.8,
                }}
              />
            </Card>
          </RowDiv>
          <NVSpacer height={4} />
          <AsizedDiv>
            <NVText
              text={intl.formatMessage({ id: "payment.benefit.promotion" })}
              textStyle={{
                color: "nevadaGold",
                fontWeight: 500,
                letterSpacing: 0.2,
                lineHeight: 1.8,
              }}
            />
          </AsizedDiv>
          <NVSpacer height={4} />
          <RowDiv>
            <NVButton
              disabled={!userPseudo}
              content={intl.formatMessage({ id: "payment.choice.1" })}
              colorSchem={"black"}
              onClick={() => {
                getPremiumSubscriptionUrl(199)
              }}
            />

            <NVSpacer width={6} />

            <NVButton
              disabled={!userPseudo}
              content={intl.formatMessage({ id: "payment.choice.2" })}
              colorSchem={"black"}
              onClick={() => {
                getPremiumLifeSubscriptionUrl(1999)
              }}
            />

            <NVSpacer width={6} />

            <NVButton
              disabled={!userPseudo}
              content={intl.formatMessage({ id: "payment.choice.3" })}
              colorSchem={"black"}
              onClick={() => {
                getDonateAmountUrl()
              }}
            />
          </RowDiv>
        </>
      ) : (
        <>
          <NVText
            text={intl.formatMessage({ id: "payment.isPremium.title" })}
            textStyle={{
              color: "nevadaGold",
              fontSize: 1.2,
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: 0.2,
              lineHeight: 1.8,
            }}
          />
          <NVSpacer height={4} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({
              id: "payment.isPremium.unsubscribe",
            })}
            colorSchem={"black"}
            onClick={() => {
              requestPremiumUnsubscription()
            }}
          />
        </>
      )}
      <ReturnHomeButton />
      <CGUButton />
    </Content>
  )
}

const Content = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${colors.nevadaBackground};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const Card = styled.div`
  background-color: ${colors.nevadaBlue};
  width: 18rem;
  height: 12rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-radius: 9px;
`

interface ColoredCircleProps {
  color: string
}

const ColoredCircle = styled.div<ColoredCircleProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`

const AsizedDiv = styled.div`
  width: 50rem;
  text-align: center;
`
