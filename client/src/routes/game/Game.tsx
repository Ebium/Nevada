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
  initializeInitialBoard,
  resetBoardArray,
  updateBoardArray,
  updateHistoryBoard,
} from "../../store/ducks/Board.ducks"
import { restartGame, updateDisabledIndexPads, updateGameStarted, updateMovesHistory} from "../../store/ducks/Game.ducks"
import { useNavigate } from "react-router-dom"
import { disablePads, enablePads, getPadIndex, removeOldPossibleMoves, showPossibleMoves } from "../../utils/Moves"

export const Game = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const droppedCounter = useNevadaSelector((state) => state.pad.droppedCounter)
  const currentPad = useNevadaSelector((state) => state.pad.current)
  const padHistory = useNevadaSelector((state) => state.board.history)
  const board = useNevadaSelector((state) => state.board.array)
  const padStore = useNevadaSelector((state) => state.pad.padStore)
  const gameStarted = useNevadaSelector((state) => state.game.started)
  const movesHistory = useNevadaSelector((state) => state.game.movesHistory)
  const movesCount = useNevadaSelector((state) => state.game.movesCount)
  const initialBoard = useNevadaSelector((state) => state.board.initialBoard)
  const pads = useNevadaSelector((state) => state.game.pads)
  const disabledIndexPads = useNevadaSelector((state) => state.game.disabledIndexPads)

  useEffect(() => {
    if (droppedCounter === 17) {
      dispatch(updateGameStarted(true))
      dispatch(initializeInitialBoard(board))
    } else {
      if (gameStarted) {
        dispatch(updateGameStarted(false))
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
  }

  const resetGame = () => {
    resetBoard()
    dispatch(updateGameStarted(false))
    dispatch(restartGame())
  }


  // Enlève la dernière pièce/Pad/Palette/Plaquette mise
  const undoBoard = () => {
    if (padHistory.length === 0) return
    if(!gameStarted){
      const updatedBoard = R.clone(board)
      let updatedHistory = R.clone(padHistory)
      padHistory[padHistory.length - 1].coord.map(
        (cell) =>
          (updatedBoard[cell[0]][cell[1]] = initialeBoardArray[cell[0]][cell[1]])
      )
      updatePadStoreFunction(padHistory[padHistory.length - 1].coord.length, +1)
      updatedHistory.pop()
      dispatch(updateHistoryBoard(updatedHistory))
      dispatch(updateDroppedCounter(droppedCounter - 1))
      dispatch(updateBoardArray(updatedBoard))
    }
  }

  // Annule un coup le dernier coup jouer en mettant à jour la dernière case jouée
  // Enlève la dernière boule jouée
  const undoMove = () => {
    if (movesHistory.length === 0) return
    if(gameStarted){
      // Contient l'ancienne valeur de la case jouée
      const move = movesHistory.pop()
      if(!move) return

      let boardWithDisabledPad = board
      
      // On active la palette du dernier coup joué
      let enableIndexPad = getPadIndex({x: move.x, y: move.y }, pads)
      if (enableIndexPad !== -1) {
        boardWithDisabledPad = enablePads(boardWithDisabledPad, enableIndexPad, pads,initialBoard)
        disabledIndexPads.pop()
      } else 

      // Ensuite l'avant dernier coup devient le dernier coup
      // on doit donc désactiver l'avant dernier coup du nouveau dernier coup 
      if(movesHistory.length>1){
        const disableBeforeLastMove = movesHistory[movesHistory.length-2]
        const disableBeforeLastMovePadIndex =  getPadIndex({x: disableBeforeLastMove.x, y: disableBeforeLastMove.y},pads)
        if(disableBeforeLastMovePadIndex !== -1){
          boardWithDisabledPad = disablePads(boardWithDisabledPad,disableBeforeLastMovePadIndex, pads)
        } 
      }

      // Puis on enlève les coups possibles de l'ancien dernier coup joué
      let updatedBoard = removeOldPossibleMoves(move,boardWithDisabledPad,initialBoard)

      // On remet à jour la valeur de la case avant l'ancien dernier coup joué 
      updatedBoard[move.x][move.y].holeColor = move.holeColor
      updatedBoard[move.x][move.y].holeFilled = move.holeFilled 
  
      // S'il y avait des coups joués, on ajoute les coups possibles de l'avant dernier coup joué
      // sinon on ajoute rien
      if(movesHistory.length>0){
        updatedBoard = showPossibleMoves(movesHistory[movesHistory.length-1],updatedBoard).board
      }

      dispatch(updateDisabledIndexPads(disabledIndexPads))
      dispatch(updateMovesHistory(movesHistory,movesCount-1))
      dispatch(updateBoardArray(updatedBoard))
    }
  }

  const startGame = () => {
    console.log("game started")
    if(!gameStarted){
      dispatch(updateGameStarted(true))
      dispatch(initializeInitialBoard(board))
    }
  }

  const oui = () => {
    const test = {
      x: [1,2,3],
      y: [1,2],
      coord: [],
    }

    // for(let i = 0; i < 10; i++){
    //   for(let j = 0; j < 10; j++){
    //     if(test.x.includes(i) && test.y.includes(j)){
    //       console.log("x: ",i," j: ",j)
    //     }
    //   }
    // }

    console.log([...[test,{      x: [3],
      y: [2],
      coord: [],}],test])
  }

  return (
    <Content>
      <HeaderButton
        onClick={() => {
          navigate("/main/home")
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
            disabled={droppedCounter === 0}
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
            disabled={movesCount === 0}
            onClick={() => undoMove()}
          >
            Undo Move
          </StyledButton>
          <HeightSpacer></HeightSpacer>
          <StyledButton
            // disabled={droppedCounter === 0}
            onClick={() => resetGame()}
          >
            Reset Game
          </StyledButton>
          <HeightSpacer></HeightSpacer>
          <StyledButton 
            // disabled={!gameStarted} 
            onClick={() => startGame()}
          >
            StartGame
          </StyledButton>
          <HeightSpacer></HeightSpacer>
          <StyledButton 
            // disabled={!gameStarted} 
            onClick={() => oui()}
          >
            oui
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
              changeCurrentPad(4, 1, "azure")
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
          {padHistory.map((key, index) => {
            if (padHistory.length === 0) return <></>
            else return <Cellule key={index}>{key.coord.length}</Cellule>
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
