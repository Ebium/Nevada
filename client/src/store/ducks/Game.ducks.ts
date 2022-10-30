import { AnyAction } from "redux"
import { Dispatch } from "../store.config"

export const enum GameActionsEnum {
  TEST_ATTEMPT = "GAME/testAttempt",
  TEST_SUCCESS = "GAME/testSuccess",
  TEST_FAILURE = "GAME/testFailure",
}

export const testAttempt = () =>
  ({ type: GameActionsEnum.TEST_ATTEMPT } as const)
export const testSuccess = () =>
  ({ type: GameActionsEnum.TEST_SUCCESS } as const)
export const testFailure = () =>
  ({ type: GameActionsEnum.TEST_FAILURE } as const)

type GameActionsType = ReturnType<
  typeof testAttempt | typeof testSuccess | typeof testFailure
>

export const testThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(testAttempt())
  dispatch(testFailure())
  dispatch(testSuccess())
  console.log("log du test thunk")
}

export interface GameState {
  started: boolean
  status: "idle" | "loading" | "failed"
}

export const gameInitialState: GameState = {
  started: false,
  status: "idle",
}

export function GameReducer(
  state = gameInitialState,
  action: GameActionsType
): GameState {
  switch (action.type) {
    case GameActionsEnum.TEST_ATTEMPT:
      return { ...state }
    case GameActionsEnum.TEST_FAILURE:
      return { ...state }
    case GameActionsEnum.TEST_SUCCESS:
      return { ...state }
    default:
      return { ...state }
  }
}
