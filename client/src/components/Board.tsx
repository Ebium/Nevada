import * as R from "ramda"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
  updateBoardArray,
  updateBoardState,
  updateHistoryBoard,
  updateGraphicPads,
} from "../store/ducks/Board.ducks"
import {
  CellType,
  disablePads,
  enablePads,
  getPadIndex,
  GraphicPad,
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
  updateGameState,
  updateMovesHistory,
  updatePads,
  updatePointEnd,
} from "../store/ducks/Game.ducks"
import { Pad2, Pad3, Pad4, Pad6 } from "./GraphicPads"
import { colors } from "./styles/design.config"
import { useEffect, useState } from "react"
import { socket } from "../socket-context"

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
  const pads = useNevadaSelector((state) => state.game.pads)
  const graphicPads = useNevadaSelector((state) => state.board.graphicPads)
  const disabledIndexPads = useNevadaSelector(
    (state) => state.game.disabledIndexPads
  )
  const game = useNevadaSelector((state) => state.game)
  const board = useNevadaSelector((state) => state.board)
  const playerId = useNevadaSelector((state) => state.game.playerId)
  const [boardIsSet, setBoardIsSet] = useState(false)

  useEffect(() => {
    socket.on("retrieve board", (socketId) => {
      socket.emit("send board game", board, game, socketId)
    })

    if (boardIsSet === false) {
      socket.once("update board game", (board, game) => {
        setBoardIsSet(true)
        dispatch(updateBoardState(board))
        dispatch(updateGameState(game))
      })
    }

    socket.on(
      "place board",
      (historyBoard, pads, graphicPads, updatedBoard, updatedPadStore) => {
        dispatch(updateHistoryBoard(historyBoard))
        dispatch(updatePads(pads))
        dispatch(updateGraphicPads(graphicPads))
        dispatch(updateBoardArray(updatedBoard))
        dispatch(updateDroppedCounter(droppedPadCounter + 1))
        dispatch(updatePadStore(updatedPadStore))
      }
    )

    socket.on(
      "emitMakeMove",
      (newMovesHistory, movesCount, board, disabledIndexPads, pads) => {
        dispatch(updateMovesHistory(newMovesHistory, movesCount))
        dispatch(updateDisabledIndexPads(disabledIndexPads))
        dispatch(updateBoardArray(board))
        dispatch(updatePads(pads))
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, board, game, boardIsSet])

  //Permet jouer un coup
  const makeMove = (cell: CellType) => {
    const payload = playMove(cell, movesCount, movesHistory, boardArray, pads)

    // Si le coup est possible on met à jour les cases possibles du plateau
    if (payload !== undefined) {
      let boardWithDisabledPad = payload.boardArray

      let padIndex = getPadIndex({ x: cell.x, y: cell.y }, pads)

      if (padIndex !== -1) {
        if (disabledIndexPads.length > 1) {
          let enablePadIndex = disabledIndexPads.shift()
          boardWithDisabledPad = enablePads(
            boardWithDisabledPad,
            enablePadIndex,
            pads
          )
        }

        boardWithDisabledPad = disablePads(boardWithDisabledPad, padIndex, pads)

        disabledIndexPads.push(padIndex)
      } else {
        return
      }
      // Si un coup a déjà été joué, on enlève les anciens coup possible, sinon on ne fait rien
      const boardWithoutPreviousMoves =
        movesHistory.length > 1
          ? removeOldPossibleMoves(
              movesHistory[movesHistory.length - 2],
              boardWithDisabledPad
            )
          : boardWithDisabledPad

      // Puis on met à jour les coups possibles pour le coup joué
      let boardWithMoves = showPossibleMoves(cell, boardWithoutPreviousMoves)
      if (boardWithMoves.possibleMoves === 0 || movesCount > 60) {
        let pointsFirstPlayer = 0
        let pointsSecondPlayer = 0

        pads.forEach((tui) => {
          if (tui.firstPlayerCounter > tui.secondPlayerCounter) {
            pointsFirstPlayer += tui.xCoords.length * tui.yCoords.length
          }
          if (tui.firstPlayerCounter < tui.secondPlayerCounter) {
            pointsSecondPlayer += tui.xCoords.length * tui.yCoords.length
          }
        })

        //actualisation des variables globales
        dispatch(updatePointEnd(pointsFirstPlayer, pointsSecondPlayer))

        if (pointsFirstPlayer > pointsSecondPlayer) {
          socket.emit("Winner room", 0, game.player1)
        }
        if (pointsFirstPlayer < pointsSecondPlayer) {
          socket.emit("Winner room", 1, game.player2)
        }
        if (pointsFirstPlayer === pointsSecondPlayer) {
          socket.emit("Winner room", -1)
        }
        // faire fin de jeu ici où un truc du genre dispatch ....
      }
      socket.emit(
        "MakeMove",
        payload.newMovesHistory,
        payload.movesCount,
        boardWithMoves.board,
        disabledIndexPads,
        pads
      )
    }
    return
  }

  // Permet de placer une tuile
  const placePad = (cell: CellType) => {
    if (currentPad.nbHole === 0 || cell.isFilled) return
    let dx = 0,
      dy = 0
    const calculatedOrientation = currentPad.orientation
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

    const graphicPad: GraphicPad = {
      x: cell.x,
      y: cell.y,
      compo: <></>,
    }

    if (padStore[padNum - 1].remaining === 0) return
    if (padNum === 2) {
      dx = 1
      dy = 2
      graphicPad.compo = `2${calculatedOrientation}`
    }

    if (padNum === 3) {
      dx = 1
      dy = 3
      graphicPad.compo = `3${calculatedOrientation}`
    }

    if (padNum === 4) {
      dx = 2
      dy = 2
      graphicPad.compo = `4`
    }

    if (padNum === 6) {
      dx = 2
      dy = 3
      graphicPad.compo = `6${calculatedOrientation}`
    }

    let xTmp = dx
    let yTmp = dy
    dx = calculatedOrientation ? xTmp : yTmp
    dy = calculatedOrientation ? yTmp : xTmp

    let ySet: Set<number> = new Set()
    let xCoords = []

    for (let x = cell.x; x < cell.x + dx; x++) {
      if (x < 0 || x > 9) return
      for (let y = cell.y; y < cell.y + dy; y++) {
        if (y < 0 || y > 9) return
        if (boardArray[x][y].isFilled) return

        updatedBoard[x][y] = {
          x: x,
          y: y,
          isFilled: true,
          color: currentPad.color,
          holeFilled: false,
          holeColor: "white",
          disabled: false,
          possibleMove: false,
        }
        padHistory.coord.push([x, y])
        ySet.add(y)
      }
      xCoords.push(x)
    }

    pad.xCoords = xCoords
    pad.yCoords = Array.from(ySet)

    historyBoard.push(padHistory)

    let updatedPadStore = R.clone(padStore)
    updatedPadStore[padNum - 1].remaining =
      updatedPadStore[padNum - 1].remaining - 1
    // changer ça ??????????? après dans tous les cas le Joueur 1 contruit
    // et attends donc pas besoin de faire un socket emit à voir plus tard
    socket.emit(
      "placePad",
      historyBoard,
      [...pads, pad],
      [...graphicPads, graphicPad],
      updatedBoard,
      updatedPadStore
    )
  }

  let cellId = 0
  return (
    <>
      <StyledBoard>
        {boardArray.map((cell) => {
          return cell.map((cell: CellType) => {
            cellId++
            return (
              <Cellule
                gamestarted={gameStarted}
                key={cellId}
                onClick={() => {
                  if (
                    playerId !== -1 &&
                    !gameStarted &&
                    movesCount % 2 === playerId
                  ) {
                    placePad(cell)
                  }
                }}
              >
                {cell.isFilled && (
                  <HoleForCellule
                    color={cell.possibleMove ? "green" : cell.holeColor}
                    onClick={() => {
                      if (
                        playerId !== -1 &&
                        gameStarted &&
                        movesCount % 2 === playerId
                      ) {
                        makeMove(cell)
                      }
                    }}
                  ></HoleForCellule>
                )}

                {graphicPads.map((ah) =>
                  cell.x === ah.x && cell.y === ah.y ? (
                    <>
                      {ah.compo === "20" ? (
                        <Pad2 orientation={0} disabled={cell.disabled} />
                      ) : ah.compo === "21" ? (
                        <Pad2 orientation={1} disabled={cell.disabled} />
                      ) : ah.compo === "30" ? (
                        <Pad3 orientation={0} disabled={cell.disabled} />
                      ) : ah.compo === "31" ? (
                        <Pad3 orientation={1} disabled={cell.disabled} />
                      ) : ah.compo === "60" ? (
                        <Pad6 orientation={0} disabled={cell.disabled} />
                      ) : ah.compo === "61" ? (
                        <Pad6 orientation={1} disabled={cell.disabled} />
                      ) : ah.compo === "4" ? (
                        <Pad4 disabled={cell.disabled} />
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )
                )}
              </Cellule>
            )
          })
        })}
      </StyledBoard>
    </>
  )
}

interface CelluleProps {
  gamestarted?: boolean
}

const Cellule = styled.div<CelluleProps>`
  color: grey;
  background-color: ${colors.nevadaGold};
  width: 70px;
  height: 70px;
  border: ${({ gamestarted }) =>
    gamestarted
      ? `1px solid ${colors.nevadaGold}`
      : `1px solid ${colors.nevadaBlack}`};
  display: flex;
  justify-content: center;
  align-items: center;
`

const HoleForCellule = styled.div<HoleForCelluleProps>`
  position: absolute;
  z-index: 2;
  height: 45px;
  width: 45px;
  border-radius: 2rem;
  background-color: ${({ color }) => (color ? color : "white")};
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
  border: 2px solid ${colors.nevadaGold};
  box-shadow: 0px 0px 10px 2px ${colors.nevadaGold};
  padding: 1.5rem;
  width: fit-content;
  background-color: ${colors.nevadaBackground};
`
