import { ReactNode, useState } from "react"
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

export const Game2 = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const [leftBarCollapsed, setLeftBarCollapsed] = useState(false)

  const gameCode = "randomCode"
  const [gameType, setGameType] = useState<
    "boarding" | "building" | "playing" | "test" | "finished"
  >("boarding")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameCode)
  }

  const pickBoardPreset = (presetNum: number) => {
    console.log("random preset = ", presetNum)
  }

  const [currentPad, setCurrentPad] = useState<ReactNode>(<></>)
  const [nbPad, setNbPad] = useState(17)

  const handlePadChoiceClick = (pad: ReactNode) => {
    setCurrentPad(pad)
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

  return (
    <Content>
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

          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "button.game.forfait" })}
            colorSchem={"red"}
            onClick={() => {
              navigate("/main")
            }}
          />

          <NVSpacer height={3} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "reset to boarding" })}
            colorSchem={"gold"}
            onClick={() => {
              setGameType("boarding")
            }}
          />
          <NVSpacer height={1} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "reset to building" })}
            colorSchem={"gold"}
            onClick={() => {
              setGameType("building")
            }}
          />
          <NVSpacer height={1} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "reset to playing" })}
            colorSchem={"gold"}
            onClick={() => {
              setGameType("playing")
            }}
          />
          <NVSpacer height={1} />
          <NVButton
            disabled={false}
            content={intl.formatMessage({ id: "reset to test" })}
            colorSchem={"gold"}
            onClick={() => {
              setGameType("test")
            }}
          />
          <LeftBarButtons>
            <RulesButton />
          </LeftBarButtons>
        </LeftBarContent>
      </LeftBar>
      <MidDiv leftbarcollapsed={leftBarCollapsed ? 1 : 0}>
        <MidDivContent leftbarcollapsed={leftBarCollapsed ? 1 : 0}>
          <MidDivTopBar>
            <NVBar
              text="game.code"
              data={gameCode}
              clickable
              onClick={copyToClipboard}
            />
          </MidDivTopBar>
          <MidDivGame>
            {gameType === "boarding" ? (
              <>
                <BoardingDiv>
                  <NVSpacer height={3} />
                  <NVText
                    text={intl.formatMessage({ id: "game.boarding.title" })}
                    textStyle={{
                      color: "nevadaGold",
                      fontSize: 1.5,
                      textAlign: "center",
                      fontWeight: 900,
                    }}
                    width={50}
                  />
                  <NVSpacer height={5} />
                  <NVBar
                    text="game.boarding.build"
                    data={gameCode}
                    clickable
                    onClick={() => {
                      setGameType("building")
                    }}
                    svg={<BoardBuildSVG />}
                  />
                  <NVSpacer height={2} />
                  <NVBar
                    text="game.boarding.preset"
                    data={gameCode}
                    svg={<PresetSVG />}
                  />
                  <NVSpacer height={4} />
                  <NVLine width={80} height={0.15} />
                  <NVSpacer height={4} />
                  <PresetsDiv>
                    <Preset1SVG
                      onClick={() => {
                        pickBoardPreset(1)
                      }}
                      cursor={"pointer"}
                    />
                    <Preset2SVG
                      onClick={() => {
                        pickBoardPreset(2)
                      }}
                      cursor={"pointer"}
                    />
                    <Preset3SVG
                      onClick={() => {
                        pickBoardPreset(3)
                      }}
                      cursor={"pointer"}
                    />
                  </PresetsDiv>
                </BoardingDiv>
              </>
            ) : gameType === "building" ? (
              <>
                <MidDivMidSection>
                  <BoardDiv />
                </MidDivMidSection>
                <NVSpacer width={4} />

                <MidDivRightSection>
                  <NVBar
                    text="game.building.reset"
                    data={gameCode}
                    svg={<ResetSVG />}
                    clickable={nbPad !== 17}
                    fillsvg={nbPad === 17 ? "red" : "green"}
                  />
                  <NVSpacer height={1} />
                  <NVBar
                    text="game.building.undo"
                    data={gameCode}
                    svg={<UndoSVG />}
                    clickable={nbPad !== 17}
                    fillsvg={nbPad === 17 ? "red" : "green"}
                  />
                  <NVSpacer height={1} />
                  <NVBar
                    text="game.building.rotate-pad"
                    data={gameCode}
                    svg={<PadRotateSVG />}
                    clickable={nbPad !== 17}
                    fillsvg={nbPad === 17 || nbPad === 0 ? "red" : "green"}
                  />
                  <NVSpacer height={1} />
                  <NVBar
                    text="game.building.start-game"
                    data={gameCode}
                    svg={<GameStartSVG />}
                    clickable={nbPad === 0}
                    fillsvg={nbPad === 0 ? "green" : "red"}
                    onClick={() => {
                      setGameType("playing")
                      console.log(nbPad)
                    }}
                  />
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
                  <PadPreview>{currentPad}</PadPreview>
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
                          handlePadChoiceClick(<StyledPad2SVG />)
                        }}
                      />
                      <NVText
                        text={intl.formatMessage(
                          {
                            id: "game.building.pad.remaining",
                          },
                          { data: -1 }
                        )}
                        textStyle={{
                          color: "white",
                        }}
                      />
                    </PadRow>
                    <PadRow>
                      <StyledPad4SVG
                        onClick={() => {
                          handlePadChoiceClick(<StyledPad4SVG />)
                        }}
                      />
                      <NVText
                        text={intl.formatMessage(
                          {
                            id: "game.building.pad.remaining",
                          },
                          { data: -1 }
                        )}
                        textStyle={{
                          color: "white",
                        }}
                      />
                    </PadRow>
                    <PadRow>
                      <StyledPad3SVG
                        onClick={() => {
                          handlePadChoiceClick(<StyledPad3SVG />)
                          setNbPad(nbPad - 1)
                        }}
                      />
                      <NVText
                        text={intl.formatMessage(
                          {
                            id: "game.building.pad.remaining",
                          },
                          { data: -1 }
                        )}
                        textStyle={{
                          color: "white",
                        }}
                      />
                    </PadRow>
                    <PadRow>
                      <StyledPad6SVG
                        onClick={() => {
                          handlePadChoiceClick(<StyledPad6SVG />)
                        }}
                      />
                      <NVText
                        text={intl.formatMessage(
                          {
                            id: "game.building.pad.remaining",
                          },
                          { data: -1 }
                        )}
                        textStyle={{
                          color: "white",
                        }}
                      />
                    </PadRow>
                  </PadsDiv>
                </MidDivRightSection>
              </>
            ) : gameType === "playing" ? (
              <>
                <MidDivMidSection>
                  <BoardDiv />
                </MidDivMidSection>

                <NVSpacer width={4} />
                <MidDivRightSection>
                  <NVText
                    text={intl.formatMessage(
                      {
                        id: "game.playing.actual-turn",
                      },
                      { data: "random" }
                    )}
                    textStyle={{
                      color: "nevadaGold",
                      fontSize: 1.8,
                    }}
                  />
                  <NVSpacer height={2} />
                  <NVLine width={17} />
                  <NVSpacer height={2} />
                  <NVBar
                    text="game.playing.player.1"
                    svg={<UserOctagonSVG />}
                    clickable
                  />
                  <NVSpacer height={1} />
                  <NVText
                    text={"pseudo 1"}
                    textStyle={{
                      color: "white",
                      fontSize: 1.2,
                      fontWeight: 800,
                    }}
                  />
                  <NVSpacer height={1} />

                  {UserInfoRow(
                    <StyledStatsSVG />,
                    "game.playing.games.played",
                    -1
                  )}
                  {UserInfoRow(
                    <StyledGamesWinSVG />,
                    "game.playing.games.won",
                    -1
                  )}
                  {UserInfoRow(
                    <StyledGamesLostSVG />,
                    "game.playing.games.lost",
                    -1
                  )}
                  {UserInfoRow(
                    <StyledWinSerieSVG />,
                    "game.playing.games.serie",
                    -1
                  )}
                  <NVBar
                    text="game.playing.remaining"
                    data={-1}
                    svg={<PionSVG />}
                    clickable
                  />

                  <NVSpacer height={2} />
                  <NVLine width={17} />

                  <NVSpacer height={2} />
                  <NVBar
                    text="game.playing.player.2"
                    svg={<UserOctagonSVG />}
                    clickable
                  />
                  <NVSpacer height={1} />
                  <NVText
                    text={"pseudo 2"}
                    textStyle={{
                      color: "white",
                      fontSize: 1.2,
                      fontWeight: 800,
                    }}
                  />
                  <NVSpacer height={1} />
                  {UserInfoRow(
                    <StyledStatsSVG />,
                    "game.playing.games.played",
                    -1
                  )}
                  {UserInfoRow(
                    <StyledGamesWinSVG />,
                    "game.playing.games.won",
                    -1
                  )}
                  {UserInfoRow(
                    <StyledGamesLostSVG />,
                    "game.playing.games.lost",
                    -1
                  )}
                  {UserInfoRow(
                    <StyledWinSerieSVG />,
                    "game.playing.games.serie",
                    -1
                  )}
                  <NVBar
                    text="game.playing.remaining"
                    data={-1}
                    svg={<PionSVG />}
                    clickable
                  />
                  <NVSpacer height={2} />
                  <NVLine width={17} />
                </MidDivRightSection>
              </>
            ) : (
              <>
                <Board />
              </>
            )}
          </MidDivGame>
        </MidDivContent>
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
`
const LeftBar = styled.div<LeftBarProps>`
  width: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "0" : "15rem")};
  transition: 0.1s all ease-in-out 0.1s;
  height: 100%;
  background-color: ${colors.topGrey};

  @media (max-width: 1000px) {
    background-color: red;
  }
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
`
const MidDiv = styled.div<LeftBarProps>`
  transition: all 0.1s ease-in-out;
  width: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "100vw" : "95%")};
  height: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "95vh" : "95%")};
  margin: ${({ leftbarcollapsed }) => (leftbarcollapsed ? "3rem" : "1rem")};
  display: flex;
  flex-direction: column;
`
const MidDivContent = styled.div<LeftBarProps>`
  width: 100%;
  height: 100%;
`
const MidDivTopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2rem;
`
const MidDivGame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`
const BoardingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const PresetsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`
const MidDivMidSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: fit-content;
`
const BoardDiv = styled.div`
  border: 2px solid ${colors.nevadaGold};
  box-shadow: 0px 0px 10px 2px ${colors.nevadaGold};
  width: 50rem;
  height: 50rem;
`
const MidDivRightSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PadPreview = styled.div`
  border: 2px solid ${colors.nevadaGold};
  box-shadow: 0px 0px 10px 2px ${colors.nevadaGold};
  height: 13rem;
  width: 17rem;
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
const StyledPad2SVG = styled(Pad2SVG)`
  cursor: pointer;
  width: 100px;
  height: 50px;
`
const StyledPad3SVG = styled(Pad3SVG)`
  cursor: pointer;
  width: 150px;
  height: 50px;
`
const StyledPad4SVG = styled(Pad4SVG)`
  cursor: pointer;
  width: 100px;
  height: 100px;
`
const StyledPad6SVG = styled(Pad6SVG)`
  cursor: pointer;
  width: 150px;
  height: 100px;
`
const UserInfosRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  align-items: center;
  width: 90%;
`
const LaGrid = styled.div`
  margin: 0;
  padding: 0;
  width: 1000px;
  display: flex;
  flex-direction: row;
  gridtemplatecolumns: repeat(auto-fill, 25px);
  gridautorows: 1000px;
  justify-content: center;
  background-color: green;
`
