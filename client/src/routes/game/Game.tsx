import { useEffect } from "react"
import styled from "styled-components"
import * as R from "ramda"
import { Board } from "../../components/Board"
import {
  resetPadStore,
  updateCurrentPad,
  updateDroppedCounter,
  updatePadStore,
} from "../../store/ducks/Pad.ducks"
import { useDispatch } from "react-redux"
import { useNevadaSelector } from "../../store/rootReducer"
import {
  resetBoardArray,
  updateBoardArray,
  updateHistoryBoard,
} from "../../store/ducks/Board.ducks"
import { updateGameCanStart, updateMovesHistory } from "../../store/ducks/Game.ducks"
import { useNavigate } from "react-router-dom"

export const Game = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const droppedCounter = useNevadaSelector((state) => state.pad.droppedCounter)
  const currentPad = useNevadaSelector((state) => state.pad.current)
  const hist = useNevadaSelector((state) => state.board.history)
  const board = useNevadaSelector((state) => state.board.array)
  const padStore = useNevadaSelector((state) => state.pad.padStore)
  const canStart = useNevadaSelector((state) => state.game.started)
  const movesHistory = useNevadaSelector((state) => state.game.movesHistory)
  const movesCount = useNevadaSelector((state) => state.game.movesCount)

  useEffect(() => {
    if (droppedCounter === 17) {
      dispatch(updateGameCanStart(true))
    } else {
      if (canStart) {
        dispatch(updateGameCanStart(false))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droppedCounter])

  const updatePadStoreFunction = (padToUpdate: number, by: number) => {
    var updatedPadStore = R.clone(padStore)
    updatedPadStore[padToUpdate - 1].remaining =
      updatedPadStore[padToUpdate - 1].remaining + by
    dispatch(updatePadStore(updatedPadStore))
  }

  var x = -1
  var y = -1

  const initialeBoardArray = Array(10)
    .fill(0)
    .map(() => {
      x++
      return new Array(10).fill(0).map(() => {
        y++
        if (y === 10) {
          y = 0
        }
        return { x: x, y: y, isFilled: false, color: "" }
      })
    })

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
      currentPad.orientation === 4 ? 1 : currentPad.orientation + 1
    dispatch(
      updateCurrentPad({
        label: currentPad.label,
        nbHole: currentPad.nbHole,
        orientation: setOrientation,
        color: currentPad.color,
      })
    )
  }

  const resetBoard = () => {
    dispatch(resetBoardArray())
    dispatch(resetPadStore())
    dispatch(updateDroppedCounter(0))
    dispatch(updateHistoryBoard([]))
    dispatch(updateGameCanStart(false))
  }

  const undoBoard = () => {
    if (hist.length === 0 && movesHistory.length === 0) return
    const updatedBoard = R.clone(board)
    if(!canStart){
      let updatedHistory = R.clone(hist)
      hist[hist.length - 1].map(
        (cell) =>
          (updatedBoard[cell[0]][cell[1]] = initialeBoardArray[cell[0]][cell[1]])
      )
      updatePadStoreFunction(hist[hist.length - 1].length, +1)
      updatedHistory.pop()
      dispatch(updateHistoryBoard(updatedHistory))
      dispatch(updateDroppedCounter(droppedCounter - 1))
    }
    // Annule un coup le dernier coup jouer en mettant à jour la dernière case jouée
    else{
      const move = movesHistory.pop()
      if(!move) return
      updatedBoard[move.x][move.y].holeColor = move.holeColor
      updatedBoard[move.x][move.y].holeFilled = move.holeFilled 
      dispatch(updateMovesHistory(movesHistory,movesCount-1))
    }
    dispatch(updateBoardArray(updatedBoard))
  }

  const startGame = () => {
    console.log("game started")
    dispatch(updateGameCanStart(true))
  }

  return (
    <Content>
      <HeaderButton
        onClick={() => {
          navigate("/home")
        }}
      ></HeaderButton>
      <Page>
        <ColumnStyle>
          <HeightSpacer></HeightSpacer>
          <StyledButton
            disabled={currentPad.nbHole === 0}
            onClick={() => changeOrientation()}
          >
            Change Orientation
          </StyledButton>
          <HeightSpacer></HeightSpacer>
          <StyledButton
            // disabled={droppedCounter === 0}
            onClick={() => resetBoard()}
          >
            reset Board
          </StyledButton>
          <HeightSpacer></HeightSpacer>
          <StyledButton
            disabled={droppedCounter === 0}
            onClick={() => undoBoard()}
          >
            Undo
          </StyledButton>
          <HeightSpacer></HeightSpacer>
          <StyledButton 
            // disabled={!canStart} 
            onClick={() => startGame()}
          >
            StartGame
          </StyledButton>
        </ColumnStyle>
        <ColumnStyle>
          <div>
            dropped pad : {droppedCounter} <br />
            CurrentPad - Trous : {currentPad.nbHole} <br /> Orientation :{" "}
            {currentPad.orientation}
          </div>
          <HeightSpacer></HeightSpacer>

          <Plaquette
            onClick={() => {
              changeCurrentPad(6, 1, "salmon")
            }}
            className="p1"
          >
            <ColumnStyle>
              <RowStyle>
                <Cellule></Cellule>
                <Cellule></Cellule>
                <Cellule></Cellule>
              </RowStyle>
              <RowStyle>
                <Cellule></Cellule>
                <Cellule></Cellule>
                <Cellule></Cellule>
              </RowStyle>
            </ColumnStyle>
          </Plaquette>
          {padStore[5].remaining}

          <HeightSpacer></HeightSpacer>

          <Plaquette
            onClick={() => {
              changeCurrentPad(4, 1, "blue")
            }}
          >
            <ColumnStyle>
              <RowStyle>
                <Cellule></Cellule>
                <Cellule></Cellule>
              </RowStyle>
              <RowStyle>
                <Cellule></Cellule>
                <Cellule></Cellule>
              </RowStyle>
            </ColumnStyle>
          </Plaquette>
          {padStore[3].remaining}

          <HeightSpacer></HeightSpacer>

          <Plaquette
            onClick={() => {
              changeCurrentPad(3, 1, "yellow")
            }}
          >
            <ColumnStyle>
              <RowStyle>
                <Cellule></Cellule>
                <Cellule></Cellule>
                <Cellule></Cellule>
              </RowStyle>
            </ColumnStyle>
          </Plaquette>
          {padStore[2].remaining}

          <HeightSpacer></HeightSpacer>

          <Plaquette
            onClick={() => {
              changeCurrentPad(2, 1, "green")
            }}
          >
            <ColumnStyle>
              <RowStyle>
                <Cellule></Cellule>
                <Cellule></Cellule>
              </RowStyle>
            </ColumnStyle>
          </Plaquette>
          {padStore[1].remaining}
        </ColumnStyle>
        <HistoryBoard style={{ color: "white" }}>
          <HeightSpacer></HeightSpacer>
          board history
          {hist.map((key, index) => {
            if (hist.length === 0) return <></>
            else return <Cellule key={index}>{key.length}</Cellule>
          })}
        </HistoryBoard>
        <div>
          <HeightSpacer></HeightSpacer>
          <Board />
        </div>
      </Page>
    </Content>
  )
}

const HeaderButton = styled.button`
  cursor: pointer;
  position: fixed;
  right: 2px;
  top: 2px;
  background-size: cover;
  background-color: cyan;
  border: none;
  height: 3rem;
  width: 3rem;
  :hover {
    height: 4rem;
    width: 4rem;
  }
`

const Content = styled.div`
`
const Page = styled.div`
  color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const HistoryBoard = styled.div`
  display: grid;
  justify-content: center;
  height: fit-content;
  grid-template-columns: repeat(2, 1fr);
`
const Cellule = styled.div`
  color: grey;
  background-color: #d3d3d3;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  border: 1px red solid;
`
const Plaquette = styled.div`
  color: white;
  cursor: pointer;
  border: black 1px solid;
  border-radius: 10px;
  height: fit-content;
  width: fit-content;
  padding: 1rem;
  :hover {
    box-shadow: 0px 0px 20px black;
  }
`
const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
`
const HeightSpacer = styled.div`
  height: 1rem;
`
const StyledButton = styled.button`
  background-color: white;
  border: black 1px solid;
  border-radius: 5px;
  width: 5rem;
  height: 5rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  :hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "0px 0px 20px red" : "0px 0px 20px black"};
  }
`
