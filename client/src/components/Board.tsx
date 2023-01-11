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
} from "../store/ducks/Game.ducks"
import { Pad2, Pad3, Pad4, Pad6 } from "./GraphicPads"
import { colors } from "./styles/design.config"

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
  const graphicPads = useNevadaSelector((state) => state.game.graphicPads)
  const disabledIndexPads = useNevadaSelector(
    (state) => state.game.disabledIndexPads
  )

  const handleBoardClick = (cell: CellType) => {
    // Si la partie a commencé, joue un coup
    if (gameStarted) {
      const payload = playMove(cell, movesCount, movesHistory, boardArray)

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
              pads,
              initialBoard
            )
          }
          console.log(disabledIndexPads)
          console.log("non ", boardWithDisabledPad)

          boardWithDisabledPad = disablePads(
            boardWithDisabledPad,
            padIndex,
            pads
          )
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

        console.log("yes", payload.boardArray[cell.x][cell.y])
        dispatch(
          updateMovesHistory(payload.newMovesHistory, payload.movesCount)
        )
        dispatch(updateBoardArray(boardWithMoves.board))
      }
      return
    }

    let dx = 0,
      dy = 0
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

    const graphicPad: GraphicPad = {
      x: 0,
      y: 0,
      compo: <></>,
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
    const calculatedOrientation = currentPad.orientation % 2 !== 0 ? 1 : 0
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
        }
        padHistory.coord.push([x, y])
        ySet.add(y)
      }
      xCoords.push(x)
    }

    graphicPad.x = cell.x
    graphicPad.y = cell.y
    if (padNum === 2) graphicPad.compo = `2${calculatedOrientation}`
    if (padNum === 3) graphicPad.compo = `3${calculatedOrientation}`
    if (padNum === 4) graphicPad.compo = `4`
    if (padNum === 6) graphicPad.compo = `6${calculatedOrientation}`

    pad.xCoords = xCoords
    pad.yCoords = Array.from(ySet)

    historyBoard.push(padHistory)
    dispatch(updateHistoryBoard(historyBoard))
    // pads.push(pad)
    dispatch(updatePads([...pads, pad]))
    dispatch(updateGraphicPads([...graphicPads, graphicPad]))
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
          return cell.map((cell: CellType) => {
            cellId++
            return (
              <Cellule
                gamestarted={gameStarted}
                key={cellId}
                onMouseOver={() => {
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
                }}
                onClick={() => {
                  handleBoardClick(cell)
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
                  <></>
                  // )
                )}

                {graphicPads.map((ah) =>
                  cell.x === ah.x && cell.y === ah.y ? (
                    <>
                      {ah.compo === "20" ? (
                        <Pad2 orientation={0} />
                      ) : ah.compo === "21" ? (
                        <Pad2 orientation={1} />
                      ) : ah.compo === "30" ? (
                        <Pad3 orientation={0} />
                      ) : ah.compo === "31" ? (
                        <Pad3 orientation={1} />
                      ) : ah.compo === "60" ? (
                        <Pad6 orientation={0} />
                      ) : ah.compo === "61" ? (
                        <Pad6 orientation={1} />
                      ) : ah.compo === "4" ? (
                        <Pad4 />
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
