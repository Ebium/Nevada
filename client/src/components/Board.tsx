import * as R from "ramda"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
  updateBoardArray,
  updateHistoryBoard,
  updateMovesHistory,
} from "../store/ducks/Board.ducks"
import { updateDroppedCounter, updatePadStore } from "../store/ducks/Pad.ducks"
import { useNevadaSelector } from "../store/rootReducer"
import { StyledBoard } from "../styles/StyledBoard"

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
  const movesHistory = useNevadaSelector((state) => state.board.movesHistory)
  const movesCount = useNevadaSelector((state) => state.board.movesCount)

  const handleBoardClick = (key: KeyType) => {
    // Si la partie a commencé, joue un coup
    playMove(key)

    // Sinon rentre dans la fonction qui permet de placer les pièces,
    if (currentPad.nbHole === 0 || key.isFilled) return
    const padNum = currentPad.nbHole
    const updatedBoard = R.clone(boardArray)

    if (padStore[padNum - 1].remaining === 0) return
    if (padNum === 2) {
      const ax = [key.x, key.x + 1, key.x, key.x - 1][
        currentPad.orientation - 1
      ]
      const ay = [key.y + 1, key.y, key.y - 1, key.y][
        currentPad.orientation - 1
      ]

      if (boardArray[ax][ay].isFilled) return

      switch (currentPad.orientation) {
        case 1:
          if (key.y === 9) return
          break
        case 2:
          if (key.x === 9) return
          break
        case 3:
          if (key.y === 0) return
          break
        case 4:
          if (key.x === 0) return
          break
      }

      updatedBoard[ax][ay] = {
        x: ax,
        y: ay,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [key.x, key.y],
        [ax, ay],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    if (padNum === 3) {
      const ax1 = [key.x, key.x + 1, key.x, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax2 = [key.x, key.x + 2, key.x, key.x - 2][
        currentPad.orientation - 1
      ]
      const ay1 = [key.y + 1, key.y, key.y - 1, key.y][
        currentPad.orientation - 1
      ]
      const ay2 = [key.y + 2, key.y, key.y - 2, key.y][
        currentPad.orientation - 1
      ]

      if (boardArray[ax1][ay1].isFilled || boardArray[ax2][ay2].isFilled) return

      switch (currentPad.orientation) {
        case 1:
          if ([8, 9].includes(key.y)) return
          break
        case 2:
          if ([8, 9].includes(key.x)) return
          break
        case 3:
          if ([0, 1].includes(key.y)) return
          break
        case 4:
          if ([0, 1].includes(key.x)) return
          break
      }

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [key.x, key.y],
        [ax1, ay1],
        [ax2, ay2],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    if (padNum === 4) {
      const ax1 = [key.x, key.x, key.x, key.x][currentPad.orientation - 1]
      const ax2 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax3 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ay1 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay2 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay3 = [key.y, key.y, key.y, key.y][currentPad.orientation - 1]

      if (
        boardArray[ax1][ay1].isFilled ||
        boardArray[ax2][ay2].isFilled ||
        boardArray[ax3][ay3].isFilled
      )
        return

      switch (currentPad.orientation) {
        case 1:
          if (key.y === 9 || key.x === 9) return
          break
        case 2:
          if (key.x === 9 || key.y === 0) return
          break
        case 3:
          if (key.y === 0 || key.x === 0) return
          break
        case 4:
          if (key.x === 0 || key.y === 9) return
          break
      }

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax3][ay3] = {
        x: ax3,
        y: ay3,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [key.x, key.y],
        [ax1, ay1],
        [ax2, ay2],
        [ax3, ay3],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    if (padNum === 6) {
      switch (currentPad.orientation) {
        case 1:
          if ([8, 9].includes(key.y) || key.x === 9) return
          break
        case 2:
          if ([8, 9].includes(key.x) || key.y === 0) return
          break
        case 3:
          if ([0, 1].includes(key.y) || key.x === 0) return
          break
        case 4:
          if ([0, 1].includes(key.x) || key.y === 9) return
          break
      }

      const ax1 = [key.x, key.x, key.x, key.x][currentPad.orientation - 1]
      const ax2 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax3 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax4 = [key.x, key.x + 2, key.x, key.x - 2][
        currentPad.orientation - 1
      ]
      const ax5 = [key.x + 1, key.x + 2, key.x - 1, key.x - 2][
        currentPad.orientation - 1
      ]
      const ay1 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay2 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay3 = [key.y, key.y, key.y, key.y][currentPad.orientation - 1]
      const ay4 = [key.y + 2, key.y, key.y - 2, key.y][
        currentPad.orientation - 1
      ]
      const ay5 = [key.y + 2, key.y - 1, key.y - 2, key.y + 1][
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
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax3][ay3] = {
        x: ax3,
        y: ay3,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax4][ay4] = {
        x: ax4,
        y: ay4,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }
      updatedBoard[ax5][ay5] = {
        x: ax5,
        y: ay5,
        isFilled: 1,
        color: currentPad.color,
        holeFilled: false,
        holeColor: "black",
      }

      historyBoard.push([
        [key.x, key.y],
        [ax1, ay1],
        [ax2, ay2],
        [ax3, ay3],
        [ax4, ay4],
        [ax5, ay5],
      ])
      dispatch(updateHistoryBoard(historyBoard))
    }

    updatedBoard[key.x][key.y] = {
      x: key.x,
      y: key.y,
      isFilled: 1,
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

  // Joue un coup remplissant le trou, et mettant une couleur, et ajoute dans movesHistory le coup joué
  const playMove = (key: KeyType) => {
    if (gameCanStart && !key?.holeFilled) {
      const oldMove: Move = {
        x: key.x,
        y: key.y,
        holeColor: key.holeColor,
        holeFilled: key.holeFilled
      }
      const color = movesCount % 2 === 0 ? "red" : "blue"

      boardArray[key.x][key.y].holeFilled = true;
      boardArray[key.x][key.y].holeColor = color;

      const newMovesHistory = movesHistory
      newMovesHistory.push(oldMove)

      dispatch(updateMovesHistory(newMovesHistory, movesCount + 1))
      dispatch(updateBoardArray(boardArray))
    }
    return
  }

  let keyVar = 0
  return (
    <>
      <StyledBoard>
        {boardArray.map((key) => {
          return key.map(
            (key: KeyType) => {
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

export interface KeyType {
  isFilled: boolean,
  color: any,
  x: number,
  y: number,
  holeColor: string,
  holeFilled: boolean,
}

export interface Move {
  x: number,
  y: number,
  holeColor: string,
  holeFilled: boolean,
}
