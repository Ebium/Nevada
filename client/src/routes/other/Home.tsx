import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CGUButton } from "../../components/CGUButton"
import { RulesButton } from "../../components/RulesButton"
import { colors } from "../../components/styles/design.config"
import { NVButton } from "../../components/styles/NVButton"
import { NVLine } from "../../components/styles/NVLine"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVText } from "../../components/styles/NVText"
import { useNevadaSelector } from "../../store/rootReducer"

export const Home = () => {
  const navigate = useNavigate()
  const intl = useIntl()
  const userPseudo = useNevadaSelector((state) => state.user.pseudo)

  const CenterCard = (props: {
    children: any
    title: string
    color?: keyof typeof colors
  }) => {
    return (
      <TheCard>
        <TopCard>
          <NVText
            text={intl.formatMessage({
              id: `home.center.card.${props.title}.title`,
            })}
            textStyle={{
              color: "white",
              textAlign: "center",
              fontSize: 1.2,
              fontWeight: 900,
            }}
          />
        </TopCard>
        <NVLine fullWidth={true} height={0.2} color={"nevadaBlack"} />
        <BottomCard color={props.color ? props.color : "midGrey"}>
          <BottomCardContent>
            <NVSpacer height={1} />
            {props.children}
            <NVSpacer height={1} />
          </BottomCardContent>
        </BottomCard>
      </TheCard>
    )
  }

  const LeftBarLine = (data: LeftBarRowProps) => {
    return (
      <>
        <LeftBarRow schema={data.schema}>
          <NVSpacer width={2} />

          <NVText
            text={intl.formatMessage(
              {
                id: `home.leftbar.stats.${data.text}`,
              },
              { data: data.data }
            )}
            textStyle={{
              color: data.schema ? "topGrey" : "midGrey",
              textAlign: "center",
              fontSize: 1,
              fontWeight: 900,
            }}
          />
        </LeftBarRow>
      </>
    )
  }

  return (
    <Content>
      <LeftBar>
        <NVSpacer height={1} />
        <LeftBarStats>
          <NVText
            text={intl.formatMessage({
              id: "home.leftbar.stats.title",
            })}
            textStyle={{
              color: "nevadaBlack",
              textAlign: "center",
              fontSize: 1.2,
              fontWeight: 900,
            }}
          />
          <NVSpacer height={1} />
          <NVLine width={17} height={0.2} color={"nevadaBlack"} />

          <LeftBarLine schema={1} data={0} text={"players"} />
          <LeftBarLine schema={0} data={0} text={"games"} />
          <LeftBarLine schema={1} data={0} text={"spectators"} />

          <NVLine width={17} height={0.2} color={"nevadaBlack"} />
        </LeftBarStats>
        <LeftBarButtons>
          <RulesButton />
          <NVSpacer height={1} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "button.cgu" })}
            colorSchem={"blue"}
            onClick={() => {
              navigate("/CGU")
            }}
          />
          <NVSpacer height={1} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "button.help-us" })}
            colorSchem={"blue"}
            onClick={() => {
              navigate("/main/payment")
            }}
          />
          <NVSpacer height={1} />
        </LeftBarButtons>
      </LeftBar>
      <CenterContent>
        <NVSpacer width={1} />
        <CenterCard title="news">
          <NVText
            text={intl.formatMessage({
              id: "home.center.card.news.content",
            })}
            textStyle={{
              color: "nevadaBlack",
              textAlign: "center",
              fontSize: 0.9,
              fontWeight: 500,
              lineHeight: 2,
            }}
          />
        </CenterCard>
        <CenterCard title="player-stats">
          {userPseudo ? (
            <></>
          ) : (
            <>
              <NVText
                text={intl.formatMessage({
                  id: "home.center.card.player-stats.content.1",
                })}
                textStyle={{
                  color: "nevadaBlack",
                  textAlign: "center",
                  fontSize: 0.9,
                  fontWeight: 500,
                }}
              />
              <NVText
                text={intl.formatMessage({
                  id: "home.center.card.player-stats.content.2",
                })}
                textStyle={{
                  color: "nevadaBlack",
                  textAlign: "center",
                  fontSize: 0.9,
                  fontWeight: 500,
                }}
              />
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.connect" })}
                colorSchem={"black"}
                onClick={() => {
                  navigate("/main/payment")
                }}
              />
            </>
          )}
        </CenterCard>
        <CenterCard title="play">
          {userPseudo ? (
            <></>
          ) : (
            <>
              <NVText
                text={intl.formatMessage({
                  id: "home.center.card.play.content",
                })}
                textStyle={{
                  color: "nevadaBlack",
                  textAlign: "center",
                  fontSize: 0.9,
                  fontWeight: 500,
                }}
              />
              <NVSpacer height={1} />
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.connect" })}
                colorSchem={"black"}
                onClick={() => {
                  navigate("/main/payment")
                }}
              />
            </>
          )}
        </CenterCard>
        <CenterCard title="ranking" color="nevadaBlue">
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "button.help-us" })}
            colorSchem={"blue"}
            onClick={() => {
              navigate("/main/payment")
            }}
          />
        </CenterCard>
        <NVSpacer width={1} />
      </CenterContent>
    </Content>
  )
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const LeftBar = styled.div`
  left: 0;
  height: 100%;
  width: 19rem;
  background-color: ${colors.backgroundGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LeftBarButtons = styled.div`
  position: absolute;
  bottom: 0;
`

const CenterContent = styled.div`
  background-color: ${colors.nevadaBackground};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const LeftBarStats = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

interface LeftBarRowProps {
  text?: string
  schema: number
  data?: number
}

const LeftBarRow = styled.div<LeftBarRowProps>`
  width: 100%;
  background-color: ${({ schema }) =>
    schema ? colors.midGrey : colors.topGrey};
  display: flex;
  align-items: center;
  height: 2.5rem;
`

const TheCard = styled.div`
  width: 18rem;
  height: 25rem;
`
const TopCard = styled.div`
  background-color: ${colors.topGrey};
  height: 4rem;
  color: white;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
interface BottomCardProps {
  color?: keyof typeof colors
}
const BottomCard = styled.div<BottomCardProps>`
  background-color: ${({ color }) => (color ? colors[color] : colors.midGrey)};
  height: 100%;
  width: 100%;
  border-radius: 0 0 1rem 1rem;
`

const BottomCardContent = styled.div`
  height: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
