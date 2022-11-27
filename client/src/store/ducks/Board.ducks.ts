import { PadHistory } from "../../utils/Moves"

export const enum BoardActionsEnum {
  UPDATE_BOARD_ARRAY = "BOARD/updateBoardArray",
  RESET_BOARD_ARRAY = "BOARD/resetBoardArray",

  UPDATE_HISTORY_BOARD = "BOARD/updateHistoryBoard",

  INITIALIZE_INITIALBOARD = "BOARD/initializeInitialBoard",
}

export const updateBoardArray = (array: boardType) =>
  ({
    type: BoardActionsEnum.UPDATE_BOARD_ARRAY,
    array,
  } as const)
export const resetBoardArray = () =>
  ({
    type: BoardActionsEnum.RESET_BOARD_ARRAY,
  } as const)
export const updateHistoryBoard = (histo: PadHistory[]) =>
  ({
    type: BoardActionsEnum.UPDATE_HISTORY_BOARD,
    histo,
  } as const)
export const initializeInitialBoard = (initialBoard: boardType) =>
  ({
    type: BoardActionsEnum.INITIALIZE_INITIALBOARD,
    initialBoard,
  } as const)

type BoardActionsType = ReturnType<
  | typeof updateBoardArray 
  | typeof resetBoardArray 
  | typeof updateHistoryBoard
  | typeof initializeInitialBoard
>

let x = -1
let y = -1

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

export type boardType = Array<any>

export interface BoardState {
  value: number
  status: "idle" | "loading" | "failed"
  array: boardType
  history: PadHistory[]
  initialBoard: boardType // Contient la grille au début de la partie, elle va permettre de pouvoir remettre les bonnes couleurs de palette 
                          // pour enlever les couleurs prévisionnels des coups possibles du joueurs
}

export const boardInitialState: BoardState = {
  value: 0,
  status: "idle",
  array: initialeBoardArray,
  history: [],
  initialBoard: initialeBoardArray,
}

export function BoardReducer(
  state = boardInitialState,
  action: BoardActionsType
): BoardState {
  switch (action.type) {
    case BoardActionsEnum.UPDATE_BOARD_ARRAY:
      return { ...state, array: action.array }
    case BoardActionsEnum.RESET_BOARD_ARRAY:
      return { ...state, array: initialeBoardArray }
    case BoardActionsEnum.UPDATE_HISTORY_BOARD:
      return { ...state, history: action.histo }
    case BoardActionsEnum.INITIALIZE_INITIALBOARD:
      return { ...state, initialBoard: action.initialBoard }
    default:
      return { ...state }
  }
}
