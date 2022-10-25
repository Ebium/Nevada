import { AnyAction } from "redux"
import { Dispatch } from "../store.config"

export const enum BoardActionsEnum {
  TEST_ATTEMPT = "BOARD/testAttempt",
  TEST_SUCCESS = "BOARD/testSuccess",
  TEST_FAILURE = "BOARD/testFailure",
  UPDATE_BOARD_ARRAY_ATTEMPT = "BOARD/updateBoardArrayAttempt",
  UPDATE_BOARD_ARRAY_FAILURE = "BOARD/updateBoardArrayFailure",
  UPDATE_BOARD_ARRAY_SUCCESS = "BOARD/updateBoardArraySuccess",
  UPDATE_HISTORY_BOARD_ACTION = "BOARD/updateHistoryBoardAction",
}

export const testAttempt = () =>
  ({ type: BoardActionsEnum.TEST_ATTEMPT } as const)
export const testSuccess = () =>
  ({ type: BoardActionsEnum.TEST_SUCCESS } as const)
export const testFailure = () =>
  ({ type: BoardActionsEnum.TEST_FAILURE } as const)
export const updateBoardArrayAttempt = () =>
  ({
    type: BoardActionsEnum.UPDATE_BOARD_ARRAY_ATTEMPT,
  } as const)
export const updateBoardArraySuccess = (array: Array<any>) =>
  ({
    type: BoardActionsEnum.UPDATE_BOARD_ARRAY_SUCCESS,
    array,
  } as const)
export const updateBoardArrayFailure = () =>
  ({
    type: BoardActionsEnum.UPDATE_BOARD_ARRAY_FAILURE,
  } as const)
  export const updateHistoryBoardAction = (histo: Array<Array<any>>) =>
  ({
    type: BoardActionsEnum.UPDATE_HISTORY_BOARD_ACTION,
    histo
  } as const)

type BoardActionsType = ReturnType<
  | typeof testAttempt
  | typeof testSuccess
  | typeof testFailure
  | typeof updateBoardArrayAttempt
  | typeof updateBoardArraySuccess
  | typeof updateBoardArrayFailure
  | typeof updateHistoryBoardAction
>

let x = 0
let y = 0

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

export interface BoardState {
  value: number
  status: "idle" | "loading" | "failed"
  array: Array<any>
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
    case BoardActionsEnum.UPDATE_BOARD_ARRAY_ATTEMPT:
      return { ...state, status: "loading" }
    case BoardActionsEnum.UPDATE_BOARD_ARRAY_SUCCESS:
      return { ...state, status: "idle", array: action.array }
    case BoardActionsEnum.UPDATE_BOARD_ARRAY_FAILURE:
      return { ...state, status: "failed" }
      case BoardActionsEnum.UPDATE_HISTORY_BOARD_ACTION:
        return { ...state, status: "failed" }
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

export const updateBoardArray = (array: Array<any>) => {
  updateBoardArrayAttempt()
  if (array.length === 0) {
    updateBoardArrayFailure()
    return
  }
  updateBoardArraySuccess(array)
}

export const updateHistoryBoard = (histo: Array<Array<any>>) => {
  updateHistoryBoardAction(histo)
}
