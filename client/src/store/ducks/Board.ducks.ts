import {Move} from "../../components/Board"
export const enum BoardActionsEnum {
  UPDATE_BOARD_ARRAY = "BOARD/updateBoardArray",
  RESET_BOARD_ARRAY = "BOARD/resetBoardArray",

  UPDATE_HISTORY_BOARD = "BOARD/updateHistoryBoard",

  UPDATE_MOVES_HISTORY = "BOARD/updateMovesHistory",
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
export const updateHistoryBoard = (histo: Array<Array<any>>) =>
  ({
    type: BoardActionsEnum.UPDATE_HISTORY_BOARD,
    histo,
  } as const)

export const updateMovesHistory = (moves: Move[], count: number) =>
  ({
    type: BoardActionsEnum.UPDATE_MOVES_HISTORY,
    moves,
    count
  } as const)

type BoardActionsType = ReturnType<
  | typeof updateBoardArray 
  | typeof resetBoardArray 
  | typeof updateHistoryBoard
  | typeof updateMovesHistory
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
      return { x: x, y: y, isFilled: 0, color: "" }
    })
  })

export type boardType = Array<any>

export interface BoardState {
  value: number
  status: "idle" | "loading" | "failed"
  array: boardType
  history: Array<Array<any>>
  movesHistory: Move[]
  movesCount: number
}

export const boardInitialState: BoardState = {
  value: 0,
  status: "idle",
  array: initialeBoardArray,
  history: [],
  movesHistory: [],
  movesCount: 0,
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
    case BoardActionsEnum.UPDATE_MOVES_HISTORY:
      return { ...state, movesHistory: action.moves, movesCount: action.count }
    default:
      return { ...state }
  }
}
