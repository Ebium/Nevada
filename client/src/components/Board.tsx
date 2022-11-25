import * as R from "ramda"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
  updateBoardArray,
  updateHistoryBoard,
} from "../store/ducks/Board.ducks"
import { CellType, playMove } from "../utils/Moves"
import { updateDroppedCounter, updatePadStore } from "../store/ducks/Pad.ducks"
import { useNevadaSelector } from "../store/rootReducer"
import { StyledBoard } from "../styles/StyledBoard"
import { updateMovesHistory } from "../store/ducks/Game.ducks"

export const Board = () => {
  const dispatch = useDispatch()
  const boardArray = useNevadaSelector((state) => state.board.array)
  const gameCanStart = useNevadaSelector((state) => state.game.started)
  const currentPad = useNevadaSelector((state) => state.pad.current)
  const padStore = useNevadaSelector((state) => state.pad.padStore)
  const historyBoard = useNevadaSelector((state) => state.board.history)
  const droppedPadCounter = useNevadaSelector(
    (state) => state.pad.droppedCounter
  )
  const movesHistory = useNevadaSelector((state) => state.game.movesHistory)
  const movesCount = useNevadaSelector((state) => state.game.movesCount)

  const handleBoardClick = (cell: CellType) => {
    // Si la partie a commencé, joue un coup
    if(gameCanStart){
      const payload = playMove(cell, movesCount, movesHistory, boardArray)
      if (payload!=null){
        dispatch(updateMovesHistory(payload.newMovesHistory, payload.movesCount))
        dispatch(updateBoardArray(payload.boardArray))
      }
      return
    }

    // Sinon rentre dans la fonction qui permet de placer les pièces,
    if (currentPad.nbHole === 0 || cell.isFilled) return
    const padNum = currentPad.nbHole
    const updatedBoard = R.clone(boardArray)

    if (padStore[padNum - 1].remaining === 0) return
    if (padNum === 2) {
      const ax = [cell.x, cell.x + 1, cell.x, cell.x - 1][
        currentPad.orientation - 1
      ]
      const ay = [cell.y + 1, cell.y, cell.y - 1, cell.y][
        currentPad.orientation - 1
      ]

      if (boardArray[ax][ay].isFilled) return

      switch (currentPad.orientation) {
        case 1:
          if (cell.y === 9) return
          break
        case 2:
          if (cell.x === 9) return
          break
        case 3:
          if (cell.y === 0) return
          break
        case 4:
          if (cell.x === 0) return
          break
      }

      updatedBoard[ax][ay] = {
        x: ax,
        y: ay,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [cell.x, cell.y],
        [ax, ay],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    if (padNum === 3) {
      const ax1 = [cell.x, cell.x + 1, cell.x, cell.x - 1][
        currentPad.orientation - 1
      ]
      const ax2 = [cell.x, cell.x + 2, cell.x, cell.x - 2][
        currentPad.orientation - 1
      ]
      const ay1 = [cell.y + 1, cell.y, cell.y - 1, cell.y][
        currentPad.orientation - 1
      ]
      const ay2 = [cell.y + 2, cell.y, cell.y - 2, cell.y][
        currentPad.orientation - 1
      ]

      if (boardArray[ax1][ay1].isFilled || boardArray[ax2][ay2].isFilled) return

      switch (currentPad.orientation) {
        case 1:
          if ([8, 9].includes(cell.y)) return
          break
        case 2:
          if ([8, 9].includes(cell.x)) return
          break
        case 3:
          if ([0, 1].includes(cell.y)) return
          break
        case 4:
          if ([0, 1].includes(cell.x)) return
          break
      }

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [cell.x, cell.y],
        [ax1, ay1],
        [ax2, ay2],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    if (padNum === 4) {
      const ax1 = [cell.x, cell.x, cell.x, cell.x][currentPad.orientation - 1]
      const ax2 = [cell.x + 1, cell.x + 1, cell.x - 1, cell.x - 1][
        currentPad.orientation - 1
      ]
      const ax3 = [cell.x + 1, cell.x + 1, cell.x - 1, cell.x - 1][
        currentPad.orientation - 1
      ]
      const ay1 = [cell.y + 1, cell.y - 1, cell.y - 1, cell.y + 1][
        currentPad.orientation - 1
      ]
      const ay2 = [cell.y + 1, cell.y - 1, cell.y - 1, cell.y + 1][
        currentPad.orientation - 1
      ]
      const ay3 = [cell.y, cell.y, cell.y, cell.y][currentPad.orientation - 1]

      if (
        boardArray[ax1][ay1].isFilled ||
        boardArray[ax2][ay2].isFilled ||
        boardArray[ax3][ay3].isFilled
      )
        return

      switch (currentPad.orientation) {
        case 1:
          if (cell.y === 9 || cell.x === 9) return
          break
        case 2:
          if (cell.x === 9 || cell.y === 0) return
          break
        case 3:
          if (cell.y === 0 || cell.x === 0) return
          break
        case 4:
          if (cell.x === 0 || cell.y === 9) return
          break
      }

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax3][ay3] = {
        x: ax3,
        y: ay3,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [cell.x, cell.y],
        [ax1, ay1],
        [ax2, ay2],
        [ax3, ay3],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    if (padNum === 6) {
      switch (currentPad.orientation) {
        case 1:
          if ([8, 9].includes(cell.y) || cell.x === 9) return
          break
        case 2:
          if ([8, 9].includes(cell.x) || cell.y === 0) return
          break
        case 3:
          if ([0, 1].includes(cell.y) || cell.x === 0) return
          break
        case 4:
          if ([0, 1].includes(cell.x) || cell.y === 9) return
          break
      }

      const ax1 = [cell.x, cell.x, cell.x, cell.x][currentPad.orientation - 1]
      const ax2 = [cell.x + 1, cell.x + 1, cell.x - 1, cell.x - 1][
        currentPad.orientation - 1
      ]
      const ax3 = [cell.x + 1, cell.x + 1, cell.x - 1, cell.x - 1][
        currentPad.orientation - 1
      ]
      const ax4 = [cell.x, cell.x + 2, cell.x, cell.x - 2][
        currentPad.orientation - 1
      ]
      const ax5 = [cell.x + 1, cell.x + 2, cell.x - 1, cell.x - 2][
        currentPad.orientation - 1
      ]
      const ay1 = [cell.y + 1, cell.y - 1, cell.y - 1, cell.y + 1][
        currentPad.orientation - 1
      ]
      const ay2 = [cell.y + 1, cell.y - 1, cell.y - 1, cell.y + 1][
        currentPad.orientation - 1
      ]
      const ay3 = [cell.y, cell.y, cell.y, cell.y][currentPad.orientation - 1]
      const ay4 = [cell.y + 2, cell.y, cell.y - 2, cell.y][
        currentPad.orientation - 1
      ]
      const ay5 = [cell.y + 2, cell.y - 1, cell.y - 2, cell.y + 1][
        currentPad.orientation - 1
      ]

      if (
        boardArray[ax1][ay1].isFilled ||
        boardArray[ax2][ay2].isFilled ||
        boardArray[ax3][ay3].isFilled ||
        boardArray[ax4][ay4].isFilled ||
        boardArray[ax5][ay5].isFilled
      )
        return

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax3][ay3] = {
        x: ax3,
        y: ay3,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax4][ay4] = {
        x: ax4,
        y: ay4,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax5][ay5] = {
        x: ax5,
        y: ay5,
        isFilled: true,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [cell.x, cell.y],
        [ax1, ay1],
        [ax2, ay2],
        [ax3, ay3],
        [ax4, ay4],
        [ax5, ay5],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    updatedBoard[cell.x][cell.y] = {
      x: cell.x,
      y: cell.y,
      isFilled: true,
      color: currentPad.color,
      holeFilled: false,
      holeColor: "black",
    }

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

  let keyVar = 0
  return (
    <>
      <StyledBoard>
        {boardArray.map((key) => {
          return key.map(
            (key: CellType) => {
              keyVar++
              return (
                <Cellule
                  key={keyVar}
                  onClick={() => handleBoardClick(key)}
                  style={{
                    backgroundColor: key.isFilled
                      ? key.color
                      : gameCanStart
                        ? "transparent"
                        : "#D3D3D3",
                    border:
                      gameCanStart && !key.isFilled ? "none" : "1px red solid",
                  }}
                >
                  {key.isFilled ? (
                    <HoleForCellule color={key.holeColor}></HoleForCellule>
                  ) : (
                    gameCanStart ? (
                      <>
                        {/* Couleur? */}
                      </>
                    ) : (
                      <>
                        {key.x},{key.y}
                      </>
                    )
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

