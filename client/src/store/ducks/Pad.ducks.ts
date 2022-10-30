import { AnyAction } from "redux"
import { Dispatch } from "../store.config"

export const enum PadActionsEnum {
  TEST_ATTEMPT = "PAD/testAttempt",
  TEST_SUCCESS = "PAD/testSuccess",
  TEST_FAILURE = "PAD/testFailure",
  UPDATE_DROPPED_COUNTER_ACTION = "PAD/updateDroppedCounterACtion",
  UPDATE_PAD_ARRAY_ACTION = "PAD/updatePadArrayACtion",
}

export const testAttempt = () =>
  ({ type: PadActionsEnum.TEST_ATTEMPT } as const)
export const testSuccess = () =>
  ({ type: PadActionsEnum.TEST_SUCCESS } as const)
export const testFailure = () =>
  ({ type: PadActionsEnum.TEST_FAILURE } as const)
export const updateDroppedCounterAction = (nb: number) =>
  ({ type: PadActionsEnum.UPDATE_DROPPED_COUNTER_ACTION, nb } as const)
export const updatePadArrayAction = (padarray: Array<any>) =>
  ({ type: PadActionsEnum.UPDATE_PAD_ARRAY_ACTION, padarray } as const)

type PadActionsType = ReturnType<
  | typeof testAttempt
  | typeof testSuccess
  | typeof testFailure
  | typeof updateDroppedCounterAction
  | typeof updatePadArrayAction
>

export const testThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(testAttempt())
  dispatch(testFailure())
  dispatch(testSuccess())
  console.log("log du test thunk")
}

export interface PadState {
  status: "idle" | "loading" | "failed"
  padArray: Array<any>
  current: {
    label: number
    nbHole: number
    orientation: number
    color: string
  }
  droppedCounter: number
}

const initialPadArray = [
  { remaining: 0, current: 0 },
  { remaining: 4, current: 0 },
  { remaining: 4, current: 0 },
  { remaining: 5, current: 0 },
  { remaining: 0, current: 0 },
  { remaining: 4, current: 0 },
]

export const padInitialState: PadState = {
  status: "idle",
  padArray: initialPadArray,
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
    case PadActionsEnum.UPDATE_DROPPED_COUNTER_ACTION:
      return { ...state, droppedCounter: action.nb }
    case PadActionsEnum.UPDATE_PAD_ARRAY_ACTION:
      return { ...state, padArray: action.padarray }
    default:
      return { ...state }
  }
}

export const test = () => {
  console.log("rendomaz")
}

export const updateDroppedCounter = (nb: number) => {
  updateDroppedCounterAction(nb)
}

export const updatePadStore = (padarray: Array<any>) => {
  updatePadArrayAction(padarray)
}
