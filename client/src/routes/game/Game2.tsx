import { ReactNode, useEffect, useState } from "react"
import styled from "styled-components/macro"
import { colors } from "../../components/styles/design.config"
import { ReactComponent as MenuCollapseSVG } from "../../assets/menu.svg"
import { ReactComponent as NevadaLogo } from "../../assets/nevada_logo_1.svg"
import { ReactComponent as Preset1SVG } from "../../assets/board_preset_1.svg"
import { ReactComponent as Preset2SVG } from "../../assets/board_preset_2.svg"
import { ReactComponent as Preset3SVG } from "../../assets/board_preset_3.svg"
import { ReactComponent as PresetSVG } from "../../assets/board_preset.svg"
import { ReactComponent as BoardBuildSVG } from "../../assets/board_build.svg"
import { ReactComponent as UndoSVG } from "../../assets/undo.svg"
import { ReactComponent as ResetSVG } from "../../assets/board_reset.svg"
import { ReactComponent as PadRotateSVG } from "../../assets/pad_rotate.svg"
import { ReactComponent as GameStartSVG } from "../../assets/game_start.svg"
import { ReactComponent as Pad2SVG } from "../../assets/pad_2.svg"
import { ReactComponent as Pad3SVG } from "../../assets/pad_3.svg"
import { ReactComponent as Pad4SVG } from "../../assets/pad_4.svg"
import { ReactComponent as Pad6SVG } from "../../assets/pad_6.svg"
import { ReactComponent as UserOctagonSVG } from "../../assets/user_octagon.svg"
import { ReactComponent as PionSVG } from "../../assets/pion.svg"

import { NVButton } from "../../components/styles/NVButton"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { RulesButton } from "../../components/RulesButton"
import { NVBar } from "../../components/styles/NVBar"
import { NVText } from "../../components/styles/NVText"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVLine } from "../../components/styles/NVLine"
import {
  StyledGamesLostSVG,
  StyledGamesWinSVG,
  StyledStatsSVG,
  StyledWinSerieSVG,
} from "../../components/styles/CommonSvg"
import { Board } from "../../components/Board"
import { EndGameModal } from "../../components/EndGameModal"
import { useDispatch } from "react-redux"
import { useNevadaSelector } from "../../store/rootReducer"
import {
  GamePhaseType,
  updateGamePhase,
  updateGameStarted,
  updatePads,
  updatePlayerId,
  updatePlayersInfos,
} from "../../store/ducks/Game.ducks"
import { socket } from "../../socket-context"
import {
  resetPadStore,
  updateCurrentPad,
  updateDroppedCounter,
  updatePadStore,
} from "../../store/ducks/Pad.ducks"
import * as R from "ramda"

import {
  initialeBoardArray,
  resetBoardArray,
  updateBoardArray,
  updateHistoryBoard,
  updateGraphicPads,
} from "../../store/ducks/Board.ducks"

interface GameProps {
  gameCode: string
}

export const Game2 = ({ gameCode }: GameProps) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const droppedCounter = useNevadaSelector((state) => state.pad.droppedCounter)
  const currentPad = useNevadaSelector((state) => state.pad.current)
  const padHistory = useNevadaSelector((state) => state.board.history)
  const board = useNevadaSelector((state) => state.board.array)
  const padStore = useNevadaSelector((state) => state.pad.padStore)
  const gameStarted = useNevadaSelector((state) => state.game.started)
  const movesCount = useNevadaSelector((state) => state.game.movesCount)
  const pads = useNevadaSelector((state) => state.game.pads)
  const gamePhase = useNevadaSelector((state) => state.game.gamePhase)
  const graphicPads = useNevadaSelector((state) => state.board.graphicPads)
  const player1Infos = useNevadaSelector((state) => state.game.player1)
  const player2Infos = useNevadaSelector((state) => state.game.player2)

  const playerId = useNevadaSelector((state) => state.game.playerId)

  const [leftBarCollapsed, setLeftBarCollapsed] = useState(false)
  const [displayed, setDisplayed] = useState(false)
  const [winner, setWinner] = useState("")

  const [currentBuildingPad, setCurrentBuildingPad] = useState<ReactNode>(<></>)
  const [currentPadOrientation, setCurrentPadOrientation] =
    useState<boolean>(false)

  useEffect(() => {
    if (droppedCounter === 17) {
      socket.emit("GameStarted")
      // dispatch(updateGameStarted(true))
    } else {
      if (gameStarted) {
        dispatch(updateGameStarted(false))
      }
    }
    socket.on("Winner user", (pseudoWinner) => {
      setWinner(pseudoWinner)
      setDisplayed(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droppedCounter])

  socket.on("update playerId", (playId) => {
    dispatch(updatePlayerId(playId))
  })

  useEffect(() => {
    socket.on("emitGameStarted", () => {
      dispatch(updateGameStarted(true))
    })

    socket.on("emit update game phase", (phase) => {
      dispatch(updateGamePhase(phase))
    })

    socket.on(
      "undo board",
      (historyBoard, pads, graphicPads, updatedBoard, updatedPadStore) => {
        dispatch(updateHistoryBoard(historyBoard))
        dispatch(updatePads(pads))
        dispatch(updateGraphicPads(graphicPads))
        dispatch(updateBoardArray(updatedBoard))
        dispatch(updatePadStore(updatedPadStore))
        dispatch(updateDroppedCounter(droppedCounter - 1))
      }
    )

    socket.on("reset board", () => {
      dispatch(resetBoardArray())
      dispatch(resetPadStore())
      dispatch(updateDroppedCounter(0))
      dispatch(updateHistoryBoard([]))
    })

    socket.on("players info", (user1, user2) => {
      dispatch(updatePlayersInfos(user1, user2))
    })

    socket.on("emit update current pad", (pad) => {
      setCurrentBuildingPad(
        pad === "pad2" ? (
          <StyledPad2SVG rotation={currentPadOrientation ? 1 : 0} />
        ) : pad === "pad3" ? (
          <StyledPad3SVG rotation={currentPadOrientation ? 1 : 0} />
        ) : pad === "pad4" ? (
          <StyledPad4SVG rotation={currentPadOrientation ? 1 : 0} />
        ) : pad === "pad6" ? (
          <StyledPad6SVG rotation={currentPadOrientation ? 1 : 0} />
        ) : (
          <></>
        )
      )
    })

    socket.on("emit pad rotated", () => {
      setCurrentPadOrientation(!currentPadOrientation)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, droppedCounter, displayed])

  const changeCurrentPad = (
    nbTrous: number,
    orientation: number,
    color: string
  ) => {
    dispatch(
      updateCurrentPad({
        label: 0,
        nbHole: nbTrous,
        orientation: orientation,
        color: color,
      })
    )
  }

  const changeOrientation = () => {
    const setOrientation =
      currentPad.orientation === 1 ? 0 : currentPad.orientation + 1
    dispatch(
      updateCurrentPad({
        label: currentPad.label,
        nbHole: currentPad.nbHole,
        orientation: setOrientation,
        color: currentPad.color,
      })
    )
    socket.emit("pad rotated")
    socket.emit("update current pad", `pad${currentPad.nbHole}`)
  }

  const resetBoard = () => {
    socket.emit("reset board")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameCode)
  }

  const handlePadChoiceClick = (pad: ReactNode, nbHole: number) => {
    if (playerId !== -1 && movesCount % 2 === playerId) {
      setCurrentBuildingPad(pad)

      socket.emit("pad rotated")
      socket.emit("update current pad", `pad${nbHole}`)
    }
  }

  const undoBoard = () => {
    if (padHistory.length === 0) return
    if (!gameStarted) {
      const updatedBoard = R.clone(board)
      let updatedHistory = R.clone(padHistory)
      let updatedDesignPads = R.clone(graphicPads)
      let updatedPads = R.clone(pads)
      let updatedPadStore = R.clone(padStore)
      padHistory[padHistory.length - 1].coord.map(
        (cell) =>
          (updatedBoard[cell[0]][cell[1]] =
            initialeBoardArray[cell[0]][cell[1]])
      )

      updatedPadStore[
        padHistory[padHistory.length - 1].coord.length - 1
      ].remaining =
        updatedPadStore[padHistory[padHistory.length - 1].coord.length - 1]
          .remaining + 1

      updatedHistory.pop()
      updatedDesignPads.pop()
      updatedPads.pop()

      socket.emit(
        "undo pad",
        updatedHistory,
        updatedPads,
        updatedDesignPads,
        updatedBoard,
        updatedPadStore
      )
    }
  }

  const UserInfoRow = (svg: ReactNode, text: string, data: any) => {
    return (
      <UserInfosRow>
        {svg}

        <NVSpacer width={1} />
        <NVText
          text={intl.formatMessage(
            {
              id: text,
            },
            { data: data }
          )}
          textStyle={{
            color: "white",
          }}
        />
      </UserInfosRow>
    )
  }

  const handleUpdateGamePhase = (phase: GamePhaseType) => {
    if (phase === "playing" && !gameStarted) socket.emit("GameStarted")

    socket.emit("update game phase", phase)
  }

  useEffect(() => {
    if (player1Infos.pseudo && player2Infos.pseudo) {
      if (playerId === 0) {
        socket.emit("update game phase", "boarding")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player1Infos, player2Infos])

  return (
    <Content>
      <EndGameModal
        isDisplayed={displayed}
        onClose={() => {
          navigate("/main")
          window.location.reload()
        }}
        winner={winner}
      />
      <LeftBar leftbarcollapsed={leftBarCollapsed ? 1 : 0}>
        <StyledMenuCollapseSVG
          leftbarcollapsed={leftBarCollapsed ? 1 : 0}
          onClick={() => {
            setLeftBarCollapsed(!leftBarCollapsed)
          }}
        />
        <LeftBarContent leftbarcollapsed={leftBarCollapsed ? 1 : 0}>
          <LeftBarTopBlock>
            <StyledNevadaLogo leftbarcollapsed={leftBarCollapsed ? 1 : 0} />
          </LeftBarTopBlock>

          {gamePhase === "playing" ? (
            <>
              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.game.forfait" })}
                colorSchem={"red"}
                onClick={() => {
                  navigate("/main")
                  window.location.reload()
                }}
              />
            </>
          ) : (
            <>
              <NVSpacer height={1} />

              <NVButton
                disabled={false}
                content={intl.formatMessage({ id: "button.game.leave" })}
                colorSchem={"blue"}
                onClick={() => {
                  navigate("/main")
                }}
              />
            </>
          )}

          <LeftBarButtons>
            <RulesButton />
          </LeftBarButtons>
        </LeftBarContent>
      </LeftBar>
      <MidDiv leftbarcollapsed={leftBarCollapsed ? 1 : 0}>
        <MidDivTopBar>
          <NVBar
            text="game.code"
            data={gameCode}
            clickable
            onClick={copyToClipboard}
          />
          {gamePhase === "building" && playerId !== 0 && (
            <>
              <NVText
                text={intl.formatMessage({
                  id: "game.building.building",
                })}
                textStyle={{
                  color: "nevadaGold",
                  fontSize: 1.4,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              />
              <NVSpacer width={30} />
            </>
          )}
        </MidDivTopBar>
        <MidDivGame centered={gamePhase === "waiting"}>
          {gamePhase === "waiting" ? (
            <>
              <NVText
                text={intl.formatMessage({
                  id: "game.wait-2-users",
                })}
                textStyle={{
                  color: "nevadaGold",
                  fontSize: 1.5,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              />
            </>
          ) : gamePhase === "boarding" ? (
            <>
              <BoardingDiv>
                <MarginAutoDiv>
                  <NVText
                    text={intl.formatMessage({
                      id:
                        movesCount % 2 === playerId
                          ? "game.boarding.title1"
                          : "game.boarding.title2",
                    })}
                    textStyle={{
                      color: "nevadaGold",
                      fontSize: 1.5,
                      textAlign: "center",
                      fontWeight: 900,
                    }}
                    width={50}
                  />
                </MarginAutoDiv>
                <MarginAutoDiv>
                  <NVBar
                    text="game.boarding.build"
                    data={gameCode}
                    clickable={playerId !== -1 && movesCount % 2 === playerId}
                    onClick={() => {
                      handleUpdateGamePhase("building")
                    }}
                    svg={<BoardBuildSVG />}
                  />
                </MarginAutoDiv>
                <MarginAutoDiv>
                  <NVBar
                    text="game.boarding.preset"
                    data={gameCode}
                    svg={<PresetSVG />}
                  />
                </MarginAutoDiv>
                <MarginAutoDiv></MarginAutoDiv>
                <PresetsDiv>
                  <Preset1SVG
                    onClick={() => {}}
                    cursor={
                      playerId !== -1 && movesCount % 2 === playerId
                        ? "pointer"
                        : "default"
                    }
                    height={336}
                    width={336}
                  />
                  <Preset2SVG
                    onClick={() => {}}
                    cursor={
                      playerId !== -1 && movesCount % 2 === playerId
                        ? "pointer"
                        : "default"
                    }
                    height={336}
                    width={336}
                  />
                  <Preset3SVG
                    onClick={() => {}}
                    cursor={
                      playerId !== -1 && movesCount % 2 === playerId
                        ? "pointer"
                        : "default"
                    }
                    height={336}
                    width={336}
                  />
                </PresetsDiv>
              </BoardingDiv>
            </>
          ) : (
            <>
              <MidDivMidSection>
                <Board />
              </MidDivMidSection>
              <NVSpacer width={4} />

              <MidDivRightSection>
                {gamePhase === "building" ? (
                  <>
                    <RowStyle>
                      <NVBar
                        text="game.building.reset"
                        svg={<ResetSVG />}
                        width={9}
                        clickable={
                          droppedCounter !== 0 &&
                          playerId !== -1 &&
                          movesCount % 2 === playerId
                        }
                        onClick={() => {
                          resetBoard()
                        }}
                        fillsvg={droppedCounter === 0 ? "red" : "green"}
                      />
                      <NVSpacer width={1} />
                      <NVBar
                        text="game.building.undo"
                        svg={<UndoSVG />}
                        width={9}
                        clickable={
                          droppedCounter !== 0 &&
                          playerId !== -1 &&
                          movesCount % 2 === playerId
                        }
                        onClick={() => {
                          undoBoard()
                        }}
                        fillsvg={droppedCounter === 0 ? "red" : "green"}
                      />
                    </RowStyle>
                    <NVSpacer height={1} />
                    <RowStyle>
                      <NVBar
                        text="game.building.rotate-pad"
                        svg={<PadRotateSVG />}
                        width={9}
                        clickable={
                          droppedCounter !== 0 &&
                          playerId !== -1 &&
                          movesCount % 2 === playerId
                        }
                        onClick={() => changeOrientation()}
                        fillsvg={
                          droppedCounter === 17 || droppedCounter === 0
                            ? "red"
                            : "green"
                        }
                      />
                      <NVBar
                        text="game.building.start-game"
                        svg={<GameStartSVG />}
                        width={9}
                        clickable={
                          droppedCounter === 17 &&
                          playerId !== -1 &&
                          movesCount % 2 === playerId
                        }
                        fillsvg={droppedCounter === 17 ? "green" : "red"}
                        onClick={() => {
                          handleUpdateGamePhase("playing")
                        }}
                      />
                    </RowStyle>
                    <NVSpacer height={1} />
                    <NVText
                      text={intl.formatMessage({
                        id: "game.building.pad.preview",
                      })}
                      textStyle={{
                        color: "white",
                      }}
                    />
                    <NVSpacer height={1} />
                    <PadPreview>{currentBuildingPad}</PadPreview>
                    <NVSpacer height={1} />
                    <NVText
                      text={intl.formatMessage({
                        id: "game.building.pad.select",
                      })}
                      textStyle={{
                        color: "white",
                      }}
                    />
                    <NVSpacer height={1} />
                    <PadsDiv>
                      <PadRow>
                        <StyledPad2SVG
                          onClick={() => {
                            handlePadChoiceClick(
                              <StyledPad2SVG
                                rotation={currentPadOrientation ? 1 : 0}
                              />,
                              2
                            )
                            changeCurrentPad(2, 1, "green")
                          }}
                          cursor={
                            playerId !== -1 && movesCount % 2 === playerId
                              ? "pointer"
                              : "default"
                          }
                          rotation={0}
                        />
                        <NVText
                          text={intl.formatMessage(
                            {
                              id: "game.building.pad.remaining",
                            },
                            { data: padStore[1].remaining }
                          )}
                          textStyle={{
                            color: "white",
                          }}
                        />
                      </PadRow>
                      <PadRow>
                        <StyledPad4SVG
                          onClick={() => {
                            handlePadChoiceClick(
                              <StyledPad4SVG
                                rotation={currentPadOrientation ? 1 : 0}
                              />,
                              4
                            )
                            changeCurrentPad(4, 1, "green")
                          }}
                          cursor={
                            playerId !== -1 && movesCount % 2 === playerId
                              ? "pointer"
                              : "default"
                          }
                          rotation={0}
                        />
                        <NVText
                          text={intl.formatMessage(
                            {
                              id: "game.building.pad.remaining",
                            },
                            { data: padStore[3].remaining }
                          )}
                          textStyle={{
                            color: "white",
                          }}
                        />
                      </PadRow>
                      <PadRow>
                        <StyledPad3SVG
                          onClick={() => {
                            handlePadChoiceClick(
                              <StyledPad3SVG
                                rotation={currentPadOrientation ? 1 : 0}
                              />,
                              3
                            )
                            changeCurrentPad(3, 1, "green")
                          }}
                          cursor={
                            playerId !== -1 && movesCount % 2 === playerId
                              ? "pointer"
                              : "default"
                          }
                          rotation={0}
                        />
                        <NVText
                          text={intl.formatMessage(
                            {
                              id: "game.building.pad.remaining",
                            },
                            { data: padStore[2].remaining }
                          )}
                          textStyle={{
                            color: "white",
                          }}
                        />
                      </PadRow>
                      <PadRow>
                        <StyledPad6SVG
                          onClick={() => {
                            handlePadChoiceClick(
                              <StyledPad6SVG
                                rotation={currentPadOrientation ? 1 : 0}
                              />,
                              6
                            )
                            changeCurrentPad(6, 1, "green")
                          }}
                          cursor={
                            playerId !== -1 && movesCount % 2 === playerId
                              ? "pointer"
                              : "default"
                          }
                          rotation={0}
                        />
                        <NVText
                          text={intl.formatMessage(
                            {
                              id: "game.building.pad.remaining",
                            },
                            { data: padStore[5].remaining }
                          )}
                          textStyle={{
                            color: "white",
                          }}
                        />
                      </PadRow>
                    </PadsDiv>
                  </>
                ) : gamePhase === "playing" ? (
                  <>
                    <NVText
                      text={intl.formatMessage(
                        {
                          id: "game.playing.actual-turn",
                        },
                        {
                          data:
                            movesCount % 2 === 0
                              ? player1Infos.pseudo
                              : player2Infos.pseudo,
                        }
                      )}
                      textStyle={{
                        color: "nevadaGold",
                        fontSize: 1.8,
                      }}
                    />
                    <NVSpacer height={2} />
                    <NVLine width={17} />
                    <NVSpacer height={1} />
                    <NVBar
                      text={
                        playerId === -1
                          ? "game.playing.player.1"
                          : playerId === 0
                          ? "game.playing.player.me"
                          : "game.playing.player.ennemy"
                      }
                      svg={<UserOctagonSVG />}
                      bottomrightB={0}
                      topleftB={0}
                    />
                    <NVSpacer height={0.5} />
                    <NVText
                      text={player1Infos.pseudo}
                      textStyle={{
                        color: "white",
                        fontSize: 1.2,
                        fontWeight: 800,
                      }}
                    />
                    <NVSpacer height={0.5} />

                    {UserInfoRow(
                      <StyledStatsSVG />,
                      "game.playing.games.played",
                      player1Infos.nbPlayed
                    )}
                    {UserInfoRow(
                      <StyledGamesWinSVG />,
                      "game.playing.games.won",
                      player1Infos.won
                    )}
                    {UserInfoRow(
                      <StyledGamesLostSVG />,
                      "game.playing.games.lost",
                      player1Infos.lost
                    )}
                    {UserInfoRow(
                      <StyledWinSerieSVG />,
                      "game.playing.games.serie",
                      player1Infos.winStreak
                    )}
                    <NVBar
                      text="game.playing.remaining"
                      data={-1}
                      svg={<PionSVG />}
                      bottomleftB={0}
                      toprightB={0}
                    />

                    <NVSpacer height={1} />
                    <NVLine width={17} />
                    <NVSpacer height={1} />

                    <NVBar
                      text={
                        playerId === -1
                          ? "game.playing.player.2"
                          : playerId === 0
                          ? "game.playing.player.ennemy"
                          : "game.playing.player.me"
                      }
                      svg={<UserOctagonSVG />}
                      bottomrightB={0}
                    />
                    <NVSpacer height={0.5} />
                    <NVText
                      text={player2Infos.pseudo}
                      textStyle={{
                        color: "white",
                        fontSize: 1.2,
                        fontWeight: 800,
                      }}
                    />
                    <NVSpacer height={0.5} />
                    {UserInfoRow(
                      <StyledStatsSVG />,
                      "game.playing.games.played",
                      player2Infos.nbPlayed
                    )}
                    {UserInfoRow(
                      <StyledGamesWinSVG />,
                      "game.playing.games.won",
                      player2Infos.won
                    )}
                    {UserInfoRow(
                      <StyledGamesLostSVG />,
                      "game.playing.games.lost",
                      player2Infos.lost
                    )}
                    {UserInfoRow(
                      <StyledWinSerieSVG />,
                      "game.playing.games.serie",
                      player2Infos.winStreak
                    )}
                    <NVBar
                      text="game.playing.remaining"
                      data={-1}
                      svg={<PionSVG />}
                      bottomleftB={0}
                      toprightB={0}
                    />
                    <NVSpacer height={1} />
                    <NVLine width={17} />
                  </>
                ) : (
                  <></>
                )}
              </MidDivRightSection>
            </>
          )}
        </MidDivGame>
      </MidDiv>
    </Content>
  )
}

interface LeftBarProps {
  leftbarcollapsed: number
}

const Content = styled.div`
  background-color: ${colors.nevadaBackground};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
`
const LeftBar = styled.div<LeftBarProps>`
  width: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "0" : "15rem")};
  transition: 0.1s all ease-in-out 0.1s;
  height: 100%;
  background-color: ${colors.topGrey};
`
const LeftBarContent = styled.div<LeftBarProps>`
  transition: 0.1s all ease-in-out 0.1s;
  display: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "none" : "flex")};
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
const LeftBarTopBlock = styled.div`
  width: 100%;
  height: 10rem;
  background-color: ${colors.nevadaBlack};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`
const StyledMenuCollapseSVG = styled(MenuCollapseSVG)<LeftBarProps>`
  cursor: pointer;
  position: absolute;
  left: 0.5rem;
  transition: all 0.1s ease-in-out;
  top: 0.5rem;
  & path {
    transition: all 0.1s ease-in-out;
    fill: ${({ leftbarcollapsed }) =>
      leftbarcollapsed ? colors.backgroundGrey : colors.white};
  }
  :hover {
    & path {
      fill: ${({ leftbarcollapsed }) =>
        leftbarcollapsed ? colors.white : colors.backgroundGrey};
    }
  }
`
const StyledNevadaLogo = styled(NevadaLogo)<LeftBarProps>`
  width: 8rem;
  height: 8rem;
  & path {
    transition: all 0.1s ease-in-out;
  }
`
const LeftBarButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  @media (max-height: 320px) {
    position: unset;
    padding-top: 1rem;
  }
`
const MidDiv = styled.div<LeftBarProps>`
  transition: all 0.1s ease-in-out;
  width: 100%;
  height: 96%;
  margin: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "3rem" : "1rem")};
  display: flex;
  flex-direction: column;
`
const MidDivTopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1rem;
  align-items: center;
`

interface MidDivGameProps {
  centered: boolean
}

const MidDivGame = styled.div<MidDivGameProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-y: auto;
  align-items: ${({ centered }) => (centered ? "center" : "unset")};
`
const BoardingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  width: 90%;
`
const PresetsDiv = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 21rem);
  grid-template-rows: repeat(auto-fill, 21rem);
  grid-column-gap: 3rem;
  grid-row-gap: 1rem;
  justify-content: center;
  margin: auto;
`
const MidDivMidSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: fit-content;
  margin: auto;
`
const MidDivRightSection = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

const PadPreview = styled.div`
  border: 2px solid ${colors.nevadaGold};
  box-shadow: 0px 0px 10px 2px ${colors.nevadaGold};
  min-height: 13rem;
  min-width: 17rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PadsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const PadRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
`

interface SvgsPreviewProps {
  rotation: number
}

const StyledPad2SVG = styled(Pad2SVG)<SvgsPreviewProps>`
  width: 100px;
  height: 50px;
  transition-duration: 0.2s;
  transform: ${({ rotation }) => (rotation ? "rotate(90deg)" : ``)};
`
const StyledPad3SVG = styled(Pad3SVG)<SvgsPreviewProps>`
  width: 150px;
  height: 50px;
  transition-duration: 0.2s;
  transform: ${({ rotation }) => (rotation ? "rotate(90deg)" : ``)};
`
const StyledPad4SVG = styled(Pad4SVG)<SvgsPreviewProps>`
  width: 100px;
  height: 100px;
  transition-duration: 0.2s;
  transform: ${({ rotation }) => (rotation ? "rotate(90deg)" : ``)};
`
const StyledPad6SVG = styled(Pad6SVG)<SvgsPreviewProps>`
  width: 150px;
  height: 100px;
  transition-duration: 0.2s;
  transform: ${({ rotation }) => (rotation ? "rotate(90deg)" : ``)};
`
const UserInfosRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 13px;
  align-items: center;
  width: 90%;
`

const MarginAutoDiv = styled.div`
  margin: auto;
  text-align: center;
  @media (max-height: 1050px) {
    margin: 1rem;
  }
`
const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
