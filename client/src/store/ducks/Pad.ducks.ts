import { AnyAction } from "redux"
import { Dispatch } from "../store.config"

export const enum PadActionsEnum {
  TEST_ATTEMPT = "PAD/testAttempt",
  TEST_SUCCESS = "PAD/testSuccess",
  TEST_FAILURE = "PAD/testFailure",
  UPDATE_DROPPED_COUNTER = "PAD/updateDroppedCounter",
  UPDATE_PAD_STORE = "PAD/updatePadStore",
  RESET_PAD_STORE = "PAD/resetPadStore",
  UPDATE_CURRENT_PAD = "PAD/updateCurrentPad",
}

export const testAttempt = () =>
  ({ type: PadActionsEnum.TEST_ATTEMPT } as const)
export const testSuccess = () =>
  ({ type: PadActionsEnum.TEST_SUCCESS } as const)
export const testFailure = () =>
  ({ type: PadActionsEnum.TEST_FAILURE } as const)
export const updateDroppedCounter = (nb: number) =>
  ({ type: PadActionsEnum.UPDATE_DROPPED_COUNTER, nb } as const)
export const updatePadStore = (padarray: Array<any>) =>
  ({ type: PadActionsEnum.UPDATE_PAD_STORE, padarray } as const)
export const resetPadStore = () =>
  ({ type: PadActionsEnum.RESET_PAD_STORE } as const)
export const updateCurrentPad = (pad: currentPadType) => {
  console.log("in")
  return { type: PadActionsEnum.UPDATE_CURRENT_PAD, pad } as const
}

type PadActionsType = ReturnType<
  | typeof testAttempt
  | typeof testSuccess
  | typeof testFailure
  | typeof updateDroppedCounter
  | typeof updatePadStore
  | typeof resetPadStore
  | typeof updateCurrentPad
>

export const testThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(testAttempt())
  dispatch(testFailure())
  dispatch(testSuccess())
  console.log("log du test thunk")
}

export interface currentPadType {
  label: number
  nbHole: number
  orientation: number
  color: string
}

export interface PadState {
  status: "idle" | "loading" | "failed"
  padStore: Array<any>
  current: currentPadType
  droppedCounter: number
}

const initialPadStore = [
  { remaining: 0, current: 0 },
  { remaining: 4, current: 0 },
  { remaining: 4, current: 0 },
  { remaining: 5, current: 0 },
  { remaining: 0, current: 0 },
  { remaining: 4, current: 0 },
]

export const padInitialState: PadState = {
  status: "idle",
  padStore: initialPadStore,
  current: {
    label: 0,
    nbHole: 0,
    orientation: 1,
    color: "",
  },
  droppedCounter: 0,
}

export function PadReducer(
  state = padInitialState,
  action: PadActionsType
): PadState {
  switch (action.type) {
    case PadActionsEnum.TEST_ATTEMPT:
      return { ...state }
    case PadActionsEnum.TEST_FAILURE:
      return { ...state }
    case PadActionsEnum.TEST_SUCCESS:
      return { ...state }
    case PadActionsEnum.UPDATE_DROPPED_COUNTER:
      return { ...state, droppedCounter: action.nb }
    case PadActionsEnum.UPDATE_PAD_STORE:
      return { ...state, padStore: action.padarray }
    case PadActionsEnum.RESET_PAD_STORE:
      return { ...state, padStore: initialPadStore }
    case PadActionsEnum.UPDATE_CURRENT_PAD:
      console.log("test")
      return { ...state, current: action.pad }
    default:
      return { ...state }
  }
}

export const test = () => {
  console.log("rendomaz")
}
