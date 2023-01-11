import * as R from "ramda"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
  updateBoardArray,
  updateHistoryBoard,
} from "../store/ducks/Board.ducks"
import {
  CellType,
  disablePads,
  enablePads,
  getPadIndex,
  Pad,
  PadHistory,
  playMove,
  removeOldPossibleMoves,
  showPossibleMoves,
} from "../utils/Moves"
import { updateDroppedCounter, updatePadStore } from "../store/ducks/Pad.ducks"
import { useNevadaSelector } from "../store/rootReducer"
import {
  updateDisabledIndexPads,
  updateMovesHistory,
  updatePads,
} from "../store/ducks/Game.ducks"
import { colors } from "./styles/design.config"
import { ReactNode, useState } from "react"

export const Board = () => {
  const dispatch = useDispatch()
  const boardArray = useNevadaSelector((state) => state.board.array)
  const gameStarted = useNevadaSelector((state) => state.game.started)
  const currentPad = useNevadaSelector((state) => state.pad.current)
  const padStore = useNevadaSelector((state) => state.pad.padStore)
  const historyBoard = useNevadaSelector((state) => state.board.history)
  const droppedPadCounter = useNevadaSelector(
    (state) => state.pad.droppedCounter
  )
  const movesHistory = useNevadaSelector((state) => state.game.movesHistory)
  const movesCount = useNevadaSelector((state) => state.game.movesCount)
  const initialBoard = useNevadaSelector((state) => state.board.initialBoard)
  const pads = useNevadaSelector((state) => state.game.pads)
  const disabledIndexPads = useNevadaSelector(
    (state) => state.game.disabledIndexPads
  )

  const Pad2 = (props: { orientation: number }) => {
    return (
      <Plaquette>
        {props.orientation ? (
          <RowS>
            <Cell />
            <Cell />
          </RowS>
        ) : (
          <ColumnS>
            <Cell />
            <Cell />
          </ColumnS>
        )}
      </Plaquette>
    )
  }

  const Pad3 = () => {
    return (
      <Plaquette>
        <RowS>
          <Cell />
          <Cell />
          <Cell />
        </RowS>
      </Plaquette>
    )
  }

  const Pad4 = () => {
    return (
      <Plaquette>
        <ColumnS>
          <RowS>
            <Cell />
            <Cell />
          </RowS>
          <RowS>
            <Cell />
            <Cell />
          </RowS>
        </ColumnS>
      </Plaquette>
    )
  }

  const Pad6 = () => {
    return (
      <Plaquette>
        <ColumnS>
          <RowS>
            <Cell />
            <Cell />
            <Cell />
          </RowS>
          <RowS>
            <Cell />
            <Cell />
            <Cell />
          </RowS>
        </ColumnS>
      </Plaquette>
    )
  }

  interface PadPosArray {
    x: number
    y: number
    compo: ReactNode
  }

  const [padsList, setPadsList] = useState<Array<PadPosArray>>([])
  console.log(padsList)

  const handleBoardClick = (cell: CellType) => {
    // Si la partie a commencé, joue un coup
    if (gameStarted) {
      const payload = playMove(cell, movesCount, movesHistory, boardArray)

      // Si le coup est possible on met à jour les cases possibles du plateau
      if (payload !== undefined) {
        let boardWithDisabledPad = payload.boardArray

        let padIndex = getPadIndex({x: cell.x, y: cell.y}, pads)

        if (padIndex !== -1) {
          console.log(disabledIndexPads)
          if (disabledIndexPads.length > 1) {
            let enablePadIndex = disabledIndexPads.shift()
            boardWithDisabledPad = enablePads(
              boardWithDisabledPad,
              enablePadIndex,
              pads,
              initialBoard
            )
          }
          console.log(disabledIndexPads)
          console.log("non ", boardWithDisabledPad)


          boardWithDisabledPad = (disablePads(boardWithDisabledPad, padIndex, pads))
          disabledIndexPads.push(padIndex)

          dispatch(updateDisabledIndexPads(disabledIndexPads))
        } else {
          console.log(
            "LE JEU EST CASSéE OMG OMMGMG OOGMOGMOMMGO MOMGOOMGMOG MOGU MOGU NORDVPN"
          )
          return
        }
        console.log("oui ou pas ? ", boardWithDisabledPad)
        // Si un coup a déjà été joué, on enlève les anciens coup possible, sinon on ne fait rien
        const boardWithoutPreviousMoves =
          movesHistory.length > 1
            ? removeOldPossibleMoves(
                movesHistory[movesHistory.length - 2],
                boardWithDisabledPad,
                initialBoard
              )
            : boardWithDisabledPad

        // Puis on met à jour les coups possibles pour le coup joué
        let boardWithMoves = showPossibleMoves(cell, boardWithoutPreviousMoves)
        if (boardWithMoves.possibleMoves === 0 || movesCount > 60) {
          console.log("game end")
          // faire fin de jeu ici où un truc du genre dispatch ....
        }

        console.log("yes",payload.boardArray[cell.x][cell.y])
        dispatch(updateMovesHistory(payload.newMovesHistory, payload.movesCount))
        dispatch(updateBoardArray(boardWithMoves.board))
      }
      return
    }

    let dx = 0, dy = 0
    // Sinon rentre dans la fonction qui permet de placer les pièces,
    if (currentPad.nbHole === 0 || cell.isFilled) return
    const padNum = currentPad.nbHole
    const updatedBoard = R.clone(boardArray)
    const padHistory: PadHistory = {
      coord: [],
    }

    const pad: Pad = {
      xCoords: [],
      yCoords: [],
      firstPlayerCounter: 0,
      secondPlayerCounter: 0,
    }

    if (padStore[padNum - 1].remaining === 0) return
    if (padNum === 2) {
      dx = 1
      dy = 2
    }

    if (padNum === 3) {
      dx = 1
      dy = 3
    }

    if (padNum === 4) {
      dx = 2
      dy = 2
    }

    if (padNum === 6) {
      dx = 2
      dy = 3
    }

    let xTmp = dx
    let yTmp = dy

    dx = currentPad.orientation % 2 !== 0 ? xTmp : yTmp
    dy = currentPad.orientation % 2 !== 0 ? yTmp : xTmp

    let ySet: Set<number> = new Set()
    let xCoords = []

    for(let x = cell.x; x < cell.x + dx; x++){
      if(x < 0 || x > 9) return 
      for(let y = cell.y; y< cell.y + dy; y++){
        if(y < 0 || y > 9) return 
        if(boardArray[x][y].isFilled) return

        updatedBoard[x][y] = {
          x: x,
          y: y,
          isFilled: true,
          color: currentPad.color,
          holeFilled: false,
          holeColor: "black",
          disabled: false,
        }
        padHistory.coord.push([x,y])
        ySet.add(y)
      }
      xCoords.push(x)
    }
    
    pad.xCoords = xCoords
    pad.yCoords = Array.from(ySet)

    historyBoard.push(padHistory)
    dispatch(updateHistoryBoard(historyBoard))
    // pads.push(pad)
    dispatch(updatePads([...pads, pad]))

    updatePadStoreFunction(padNum, -1)
    dispatch(updateDroppedCounter(droppedPadCounter + 1))
    dispatch(updateBoardArray(updatedBoard))
  }

  const updatePadStoreFunction = (padToUpdate: number, by: number) => {
    var updatedPadStore = R.clone(padStore)
    updatedPadStore[padToUpdate - 1].remaining =
      updatedPadStore[padToUpdate - 1].remaining + by
    dispatch(updatePadStore(updatedPadStore))
  }

  let cellId = 0
  return (
    <>
      <StyledBoard>
        {boardArray.map((cell) => {
          return cell.map(
            (cell: CellType) => {
              cellId++
              return (
                <Cellule
                  key={cellId}
                  onMouseOver={()=>{
                    // console.log("...oui")
                    // console.log(boardArray[cell.x][cell.y]);
                    // const updatedBoard = R.clone(boardArray)
                    // updatedBoard[cell.x][cell.y].color = "blue"
                    // let dx = 2
                    // let dy = 2
                    // for(let i = cell.x; i < cell.x + dx; i++){
                    //   for(let j = cell.y; j< cell.y + dy; j++){
                    //     console.log("x : " +i + " yzzz: "+j)
                        
                    //     updatedBoard[i][j].color = "purple"
                    //     console.log(updatedBoard[i][j]);
                        
                    //   }
                    // }
                    // dispatch(updateBoardArray(updatedBoard))
                    
                  }

                  }
                  onClick={() => {
                    handleBoardClick(cell)
                  }}
                  style={{
                    opacity: cell.disabled? 0.5 : 1,
                    backgroundColor: cell.isFilled
                      ? cell.color
                      : gameStarted
                        ? "transparent"
                        : "#D3D3D3",
                    // backgroundColor: cell.color 
                    //       ? cell.color
                    //       : "#D3D3D3",
                    border:
                      gameStarted && !cell.isFilled ? "none" : "1px red solid",
                  }}
                >
                  {cell.isFilled ? (
                    <HoleForCellule color={cell.holeColor}></HoleForCellule>
                  ) : (
                    // gameStarted ? (
                    //   <>
                    //     {/* Couleur? */}
                    //   </>
                    // ) : (
                    <>
                      {cell.x},{cell.y}
                    </>
                    // )
                  )}
                </Cellule>
              )
            }
          )
        })}
      </StyledBoard>
    </>
  )
}

const Cellule = styled.div`
  color: grey;
  background-color: #d3d3d3;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  border: 1px red solid;
`

const HoleForCellule = styled.div<HoleForCelluleProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: ${({ color }) => (color ? color : "black")};
`

interface HoleForCelluleProps {
  color?: string
}

const StyledBoard = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-content: center;
  height: fit-content;
  border: black 2px solid;
  box-shadow: 0px 0px 20px black;
  padding: 1rem;
  width: fit-content;
`

const Plaquette = styled.div`
  position: relative;
  z-index: 10;

  top: -2rem;
  left: -2rem;
  border: 1px solid white;
  height: fit-content;
  width: fit-content;
  border-radius: 15px;
  background-color: ${colors.nevadaBlue};
  margin: 1rem;
`
const RowS = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnS = styled.div`
  display: flex;
  flex-direction: column;
`

const Cell = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin: 10px;
  background-color: white;
  box-shadow: 0px 0px 10px 2px black;
`
