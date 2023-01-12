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
  updateGraphicPads,
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
  const graphicPads = useNevadaSelector((state) => state.game.graphicPads)
  const disabledIndexPads = useNevadaSelector(
    (state) => state.game.disabledIndexPads
  )

  const [playerId, setPlayerId] = useState(0)

  useEffect(() => {
    console.log("test")
    console.log(socket.id)


    

    socket.on("board", (historyBoard, pads, graphicPads, updatedBoard) => {
      console.log("board oui ouoi ouio")
      dispatch(updateHistoryBoard(historyBoard))
      dispatch(updatePads(pads))
      dispatch(updateGraphicPads(graphicPads))
      dispatch(updateBoardArray(updatedBoard))
    })
    socket.on("ok", () => {
      console.log("ok ok")
    })
    socket.on("emitUpdateDisabledIndexPads",(disabledIndexPads) => {
      dispatch(updateDisabledIndexPads(disabledIndexPads))
    })
    socket.on("emitMoveHistoryAndBoardArray",(newMovesHistory, movesCount, board) => {
      dispatch(
        updateMovesHistory(newMovesHistory, movesCount)
      )
      dispatch(updateBoardArray(board))
    })
  }, [dispatch])

  //Permet jouer un coup
  const makeMove = (cell: CellType) => {
    const payload = playMove(cell, movesCount, movesHistory, boardArray, pads)

    // Si le coup est possible on met à jour les cases possibles du plateau
    if (payload !== undefined) {
      let boardWithDisabledPad = payload.boardArray

      let padIndex = getPadIndex({ x: cell.x, y: cell.y }, pads)

      if (padIndex !== -1) {
        console.log(disabledIndexPads)
        if (disabledIndexPads.length > 1) {
          let enablePadIndex = disabledIndexPads.shift()
          boardWithDisabledPad = enablePads(
            boardWithDisabledPad,
            enablePadIndex,
            pads
          )
        }

        boardWithDisabledPad = disablePads(
          boardWithDisabledPad,
          padIndex,
          pads
        )
        disabledIndexPads.push(padIndex)

        dispatch(updateDisabledIndexPads(disabledIndexPads))
        socket.emit("updateDisabledIndexPads",disabledIndexPads)
      } else {
        console.log(
          "LE JEU EST CASSéE OMG OMMGMG OOGMOGMOMMGO MOMGOOMGMOG MOGU MOGU NORDVPN"
        )
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
        console.log("game end")
        console.log(pads)
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

        dispatch(updatePointEnd(pointsFirstPlayer, pointsSecondPlayer))

        console.log(
          "Premier Joueur :",
          pointsFirstPlayer,
          "Second Joueur :",
          pointsSecondPlayer
        )
        if (pointsFirstPlayer > pointsSecondPlayer) {
          console.log("Le Joueur rouge est gagnant")
        }
        if (pointsFirstPlayer < pointsSecondPlayer) {
          console.log("Le Joueur Bleu est gagnant")
        }
        if (pointsFirstPlayer === pointsSecondPlayer) {
          console.log("Les 2 Joueurs sont ex aequo")
        }
        // faire fin de jeu ici où un truc du genre dispatch ....
      }
      // dispatch(
      //   updateMovesHistory(payload.newMovesHistory, payload.movesCount)
      // )
      // dispatch(updateBoardArray(boardWithMoves.board))
      socket.emit("MoveHistoryAndBoardArray",payload.newMovesHistory, payload.movesCount, boardWithMoves.board)
    }
    return
  }

  // Permet de placer une tuile
  const placePad = (cell: CellType) => {
    if (currentPad.nbHole === 0 || cell.isFilled) return
    let dx = 0, dy = 0
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
    updatePadStoreFunction(padNum, -1)
    dispatch(updateDroppedCounter(droppedPadCounter + 1))
    // changer ça ??????????? après dans tous les cas le Joueur 1 contruit 
    // et attends donc pas besoin de faire un socket emit à voir plus tard
    socket.emit("emitBoard", historyBoard, [...pads, pad], [...graphicPads, graphicPad], updatedBoard)
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
          return cell.map((cell: CellType) => {
            cellId++
            return (
              <Cellule
                gamestarted={gameStarted}
                key={cellId}
                onClick={() => {
                  console.log("onClick,", cell.x, cell.y)
                  socket.emit("emitok")
                  if (!gameStarted) {
                    placePad(cell)
                  }
                }}
              >
                {cell.isFilled ? (
                  <HoleForCellule
                    color={cell.possibleMove ? "green" : cell.holeColor}
                    onClick={()=>{
                      if (gameStarted) {
                        makeMove(cell)
                      }
                    }}
                  >{cell.x} {cell.y}</HoleForCellule>
                ) : (
                  <>{cell.x} {cell.y}</>
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
