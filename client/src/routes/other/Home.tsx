import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { RulesButton } from "../../components/RulesButton"
import { colors } from "../../components/styles/design.config"
import { NVButton } from "../../components/styles/NVButton"
import { NVLine } from "../../components/styles/NVLine"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVText } from "../../components/styles/NVText"
import { useNevadaSelector } from "../../store/rootReducer"
import { ReactComponent as UserOctagonSVG } from "../../assets/user_octagon.svg"
import {
  StyledPlaySVG,
  StyledNewsSVG,
  StyledRankSVG,
  StyledGamesWinSVG,
  StyledStatsSVG,
  StyledWinSerieSVG,
} from "../../components/styles/CommonSvg"
import { NVInput } from "../../components/styles/NVInput"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { NVAlert } from "../../components/styles/NVAlert"
import { useDispatch } from "react-redux"
import {
  getGamesCounterThunk,
  getPlayersCounterThunk,
  getSpectatorsCounterThunk,
} from "../../store/ducks/General.ducks"
import { getUsersRankingThunk } from "../../store/ducks/User.ducks"
import { createRoom, getServerResponse } from "../../utils/Rooms"
import { socket } from "../../socket-context"

export const Home = () => {
  const navigate = useNavigate()
  const intl = useIntl()
  const dispatch = useDispatch()
  const userPseudo = useNevadaSelector((state) => state.user.pseudo)
  const userSocket = useNevadaSelector((state) => state.user.socketId)
  const userPremium = useNevadaSelector((state) => state.user.isPremium)
  const userGamesPlayed = useNevadaSelector((state) => state.user.nbGames)
  const userGamesWon = useNevadaSelector((state) => state.user.nbGamesWin)
  const userGamesSerie = useNevadaSelector((state) => state.user.winStreak)
  const userCreatedAt = useNevadaSelector((state) => state.user.creationDate)
  const playersCounter = useNevadaSelector((state) => state.general.players)
  const spectatorsCounter = useNevadaSelector(
    (state) => state.general.spectators
  )
  const gamesCounter = useNevadaSelector((state) => state.general.games)
  const playersRanking = useNevadaSelector((state) => state.user.usersRanking)

  const [gameCode, setGameCode] = useState("")
  const [gameCodeAlertDisplayed, setGameCodeAlertDisplayed] = useState(false)

  useEffect(() => {
    dispatch(getPlayersCounterThunk())
    dispatch(getGamesCounterThunk())
    dispatch(getSpectatorsCounterThunk())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSocket])

  useEffect(() => {
    dispatch(getUsersRankingThunk())
    getServerResponse()

    socket.on("Join a room", (joined, roomId) => {
      if (joined && roomId !== "") {
        navigate(`/game/${roomId}`)
      } else alert("An internal problem has occurred.")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CenterCard = (props: {
    children: any
    title: string
    color?: keyof typeof colors
  }) => {
    return (
      <TheCard>
        <TopCard>
          {props.title === "player-stats" ? (
            <>
              <UserOctagonSVG />
              <NVSpacer width={0.5} />
            </>
          ) : props.title === "play" ? (
            <>
              <StyledPlaySVG />
              <NVSpacer width={0.5} />
            </>
          ) : props.title === "news" ? (
            <>
              <StyledNewsSVG />
              <NVSpacer width={0.5} />
            </>
          ) : (
            <>
              <StyledRankSVG />
              <NVSpacer width={0.5} />
            </>
          )}
          <NVText
            text={intl.formatMessage({
              id: `home.center.card.${props.title}.title`,
            })}
            textStyle={{
              color: "white",
              textAlign: "center",
              fontSize: 1,
              fontWeight: 600,
            }}
          />
        </TopCard>
        <NVLine fullWidth={true} height={0.2} color={"nevadaBlack"} />
        <BottomCard color={props.color ? props.color : "backgroundGrey"}>
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
                id:
                  data.schema === 2
                    ? data.text
                    : `home.leftbar.stats.${data.text}`,
              },
              { data: data.data }
            )}
            textStyle={{
              color: data.schema === 1 ? "topGrey" : "midGrey",
              textAlign: "center",
              fontSize: 1,
              fontWeight: 900,
            }}
          />
        </LeftBarRow>
      </>
    )
  }

  const SimpleText = (props: {
    textId: string
    data?: any
    weight?: number
  }) => {
    return (
      <NVText
        text={intl.formatMessage(
          {
            id: props.textId,
          },
          { data: props.data }
        )}
        textStyle={{
          color: "nevadaBlack",
          textAlign: "center",
          fontSize: 0.9,
          fontWeight: 600,
          lineHeight: 2,
        }}
      />
    )
  }

  const handleGameCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGameCode(event.target.value)
  }

  const handleJoinGameWithCodeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!gameCode) setGameCodeAlertDisplayed(true)
    else {
      setGameCodeAlertDisplayed(false)
      socket.emit("Join a room", gameCode)
    }
  }

  return (
    <Content>
      <NVAlert
        isDisplayed={gameCodeAlertDisplayed}
        text={intl.formatMessage({
          id: "home.center.card.play.join.no-code-game-alert",
        })}
        onClose={() => {
          setGameCodeAlertDisplayed(!gameCodeAlertDisplayed)
        }}
      />

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
          <LeftBarLine schema={1} data={playersCounter} text={"players"} />
          <LeftBarLine
            schema={0}
            data={gamesCounter - playersCounter}
            text={"games"}
          />
          <LeftBarLine
            schema={1}
            data={spectatorsCounter}
            text={"spectators"}
          />

          <NVLine width={17} height={0.2} color={"nevadaBlack"} />
        </LeftBarStats>
        {userPseudo ? (
          <>
            <LeftBarSpectateGame>
              <NVText
                text={intl.formatMessage({
                  id: "home.leftbar.spectate.title",
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

              <LeftBarLine schema={2} data={-1} text={"home.leftbar.soon.1"} />
              <LeftBarLine schema={2} data={-1} text={"home.leftbar.soon.2"} />

              <NVLine width={17} height={0.2} color={"nevadaBlack"} />
            </LeftBarSpectateGame>

            <LeftBarTrainingMode>
              <NVText
                text={intl.formatMessage({
                  id: "home.leftbar.training.title",
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

              <LeftBarLine schema={2} data={-1} text={"home.leftbar.soon.1"} />
              <LeftBarLine schema={2} data={-1} text={"home.leftbar.soon.2"} />

              <NVLine width={17} height={0.2} color={"nevadaBlack"} />
            </LeftBarTrainingMode>
          </>
        ) : (
          <></>
        )}
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
        <CenterCard title="news">
          <NVText
            text={intl.formatMessage({
              id: "home.center.card.news.content",
            })}
            textStyle={{
              color: "nevadaBlack",
              textAlign: "center",
              fontSize: 0.9,
              fontWeight: 600,
              lineHeight: 2,
            }}
          />
        </CenterCard>
        <CenterCard title="player-stats">
          {userPseudo ? (
            <>
              <SimpleText
                textId={"home.center.card.online.player-stats.content.pseudo"}
                data={userPseudo}
              />
              <SimpleText
                textId={"home.center.card.online.player-stats.content.premium"}
                data={userPremium ? "oui" : "non"}
              />
              {userPremium ? (
                <></>
              ) : (
                <>
                  <NVSpacer height={1} />
                  <NVButton
                    disabled={false}
                    content={intl.formatMessage({ id: "button.get-premium" })}
                    colorSchem={"blue"}
                    onClick={() => {
                      navigate("/main/payment")
                    }}
                  />
                </>
              )}
              <NVSpacer height={1} />
              <NVLine width={18} height={0.2} color={"nevadaBlack"} />
              <SimpleText
                textId={
                  "home.center.card.online.player-stats.content.games.title"
                }
              />
              <StatCardRow>
                <StyledStatsSVG width={30} />
                <NVSpacer width={1} />
                <SimpleText
                  textId={
                    "home.center.card.online.player-stats.content.games.played"
                  }
                  data={userGamesPlayed}
                />
              </StatCardRow>
              <StatCardRow>
                <StyledGamesWinSVG width={30} />
                <NVSpacer width={1} />
                <SimpleText
                  textId={
                    "home.center.card.online.player-stats.content.games.won"
                  }
                  data={userGamesWon}
                />
              </StatCardRow>
              <StatCardRow>
                <StyledWinSerieSVG width={30} />
                <NVSpacer width={1} />
                <SimpleText
                  textId={
                    "home.center.card.online.player-stats.content.games.serie"
                  }
                  data={userGamesSerie}
                />
              </StatCardRow>
              <NVLine width={18} height={0.2} color={"nevadaBlack"} />
              <SimpleText
                textId={
                  "home.center.card.online.player-stats.content.created-at"
                }
                data={userCreatedAt.slice(0, 10)}
              />
            </>
          ) : (
            <>
              <SimpleText
                textId={"home.center.card.offline.player-stats.content.1"}
              />
              <SimpleText
                textId={"home.center.card.offline.player-stats.content.2"}
              />
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.connect" })}
                colorSchem={"black"}
                onClick={() => {
                  navigate("/main/login")
                }}
              />
            </>
          )}
        </CenterCard>
        <CenterCard title="play">
          {userPseudo ? (
            <>
              <SimpleText textId={"home.center.card.online.play.content"} />
              <form onSubmit={handleJoinGameWithCodeSubmit}>
                <ColumnStyle>
                  <NVInput
                    disabled={false}
                    type={"text"}
                    placeholder={"CODE"}
                    width={8.5}
                    value={gameCode}
                    onChange={(e) => {
                      handleGameCodeChange(e)
                    }}
                  />
                  <NVSpacer height={1} />
                  <NVInput
                    disabled={false}
                    value={intl.formatMessage({
                      id: "button.game.join",
                    })}
                    type={"submit"}
                    colorSchem={"black"}
                  />
                </ColumnStyle>
              </form>
              <NVLine width={18} height={0.2} color={"nevadaBlack"} />
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.game.create" })}
                colorSchem={"black"}
                onClick={() => {
                  createRoom()
                }}
              />
            </>
          ) : (
            <>
              <SimpleText textId={"home.center.card.offline.play.content"} />
              <NVSpacer height={1} />
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.connect" })}
                colorSchem={"black"}
                onClick={() => {
                  navigate("/main/login")
                }}
              />
            </>
          )}
        </CenterCard>
        <CenterCard title="ranking" color="nevadaBlue">
          {playersRanking.length !== 0 ? (
            playersRanking.map((value, index) => (
              <>
                <NVText
                  text={"Place : " + (index + 1)}
                  textStyle={{
                    color: "nevadaGold",
                    fontWeight: 900,
                    fontSize: 1.2,
                  }}
                />
                <NVText
                  text={value.premium ? `👑 ${value.pseudo}` : value.pseudo}
                  textStyle={{ color: "nevadaGold" }}
                />
                <NVText
                  text={value.won + " victoires"}
                  textStyle={{ color: "nevadaGold" }}
                />
                <NVLine width={18} height={0.1} color={"nevadaGold"} />
              </>
            ))
          ) : (
            <></>
          )}
        </CenterCard>
        <NVSpacer width={1} />
      </CenterContent>
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`
const LeftBar = styled.div`
  height: 100%;
  min-width: 17rem;
  background-color: ${colors.backgroundGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: all 0.1s ease-in-out;
  @media (max-width: 670px) {
    min-width: 15rem;
  }
`
const LeftBarButtons = styled.div`
  position: absolute;
  bottom: 0;
  transition: all 0.1s ease-in-out;
  @media (max-height: 530px) {
    position: unset;
    padding-top: 1rem;
  }
`
const CenterContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 20rem);
  grid-template-rows: repeat(auto-fill, 26rem);
  grid-column-gap: 1rem;
  grid-row-gap: 5rem;
  justify-content: center;
  height: 85%;
  overflow-y: auto;
`
const LeftBarStats = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const LeftBarSpectateGame = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 2rem;
  @media (max-height: 670px) {
    display: none;
  }
`
const LeftBarTrainingMode = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 2rem;
  @media (max-height: 830px) {
    display: none;
  }
`
interface LeftBarRowProps {
  text?: string
  schema: number
  data?: number
}
const LeftBarRow = styled.div<LeftBarRowProps>`
  width: 100%;
  background-color: ${({ schema }) =>
    schema === 2
      ? colors.nevadaBlue
      : schema
      ? colors.midGrey
      : colors.topGrey};
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
  color: keyof typeof colors
}
const BottomCard = styled.div<BottomCardProps>`
  background-color: ${({ color }) => colors[color]};
  height: 100%;
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 2px 6px 10px ${colors.nevadaBlack},
    -2px 6px 10px ${colors.nevadaBlack};
`
const BottomCardContent = styled.div`
  height: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const StatCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
  width: 100%;
`
const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
