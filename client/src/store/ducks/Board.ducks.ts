import { AnyAction } from "redux"
import { Dispatch } from "../store.config"

export const enum BoardActionsEnum {
  TEST_ATTEMPT = "BOARD/testAttempt",
  TEST_SUCCESS = "BOARD/testSuccess",
  TEST_FAILURE = "BOARD/testFailure",
  UPDATE_BOARD_ARRAY = "BOARD/updateBoardArray",
  RESET_BOARD_ARRAY = "BOARD/resetBoardArray",
  UPDATE_HISTORY_BOARD = "BOARD/updateHistoryBoard",
}

export const testAttempt = () =>
  ({ type: BoardActionsEnum.TEST_ATTEMPT } as const)
export const testSuccess = () =>
  ({ type: BoardActionsEnum.TEST_SUCCESS } as const)
export const testFailure = () =>
  ({ type: BoardActionsEnum.TEST_FAILURE } as const)
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

type BoardActionsType = ReturnType<
  | typeof testAttempt
  | typeof testSuccess
  | typeof testFailure
  | typeof updateBoardArray
  | typeof resetBoardArray
  | typeof updateHistoryBoard
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
}

export const boardInitialState: BoardState = {
  value: 0,
  status: "idle",
  array: initialeBoardArray,
  history: [],
}

export function BoardReducer(
  state = boardInitialState,
  action: BoardActionsType
): BoardState {
  switch (action.type) {
    case BoardActionsEnum.TEST_ATTEMPT:
      return { ...state, status: "loading" }
    case BoardActionsEnum.TEST_FAILURE:
      return { ...state, status: "failed" }
    case BoardActionsEnum.TEST_SUCCESS:
      return { ...state, status: "idle" }
    case BoardActionsEnum.UPDATE_BOARD_ARRAY:
      return { ...state, array: action.array }
    case BoardActionsEnum.RESET_BOARD_ARRAY:
      return { ...state, array: initialeBoardArray }
    case BoardActionsEnum.UPDATE_HISTORY_BOARD:
      return { ...state, history: action.histo }
    default:
      return { ...state }
  }
}

export const testThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(testAttempt())
  dispatch(testFailure())
  dispatch(testSuccess())
  console.log("log du test thunk")
}
