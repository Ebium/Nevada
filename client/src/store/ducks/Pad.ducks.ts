export const enum PadActionsEnum {
  UPDATE_DROPPED_COUNTER = "PAD/updateDroppedCounter",

  UPDATE_PAD_STORE = "PAD/updatePadStore",
  RESET_PAD_STORE = "PAD/resetPadStore",

  UPDATE_CURRENT_PAD = "PAD/updateCurrentPad",

  UPDATE_PAD_STATE = "PAD/updatePadState"
}

export const updateDroppedCounter = (nb: number) =>
  ({ type: PadActionsEnum.UPDATE_DROPPED_COUNTER, nb } as const)
export const updatePadStore = (padarray: Array<any>) =>
  ({ type: PadActionsEnum.UPDATE_PAD_STORE, padarray } as const)
export const resetPadStore = () =>
  ({ type: PadActionsEnum.RESET_PAD_STORE } as const)
export const updateCurrentPad = (pad: currentPadType) =>
  ({ type: PadActionsEnum.UPDATE_CURRENT_PAD, pad } as const)
export const updatePadState = (padState: PadState) =>
  ({ type: PadActionsEnum.UPDATE_PAD_STATE, padState} as const)

type PadActionsType = ReturnType<
  | typeof updateDroppedCounter
  | typeof updatePadStore
  | typeof resetPadStore
  | typeof updateCurrentPad
  | typeof updatePadState
>

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
    case PadActionsEnum.UPDATE_DROPPED_COUNTER:
      return { ...state, droppedCounter: action.nb }
    case PadActionsEnum.UPDATE_PAD_STORE:
      return { ...state, padStore: action.padarray }
    case PadActionsEnum.RESET_PAD_STORE:
      return { ...state, padStore: initialPadStore }
    case PadActionsEnum.UPDATE_CURRENT_PAD:
      return { ...state, current: action.pad }
    case PadActionsEnum.UPDATE_PAD_STATE:
      return { ...action.padState }
    default:
      return { ...state }
  }
}
