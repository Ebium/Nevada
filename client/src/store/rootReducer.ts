import { TypedUseSelectorHook, useSelector } from "react-redux"
import { AnyAction, CombinedState, combineReducers } from "redux"
import { boardInitialState, BoardReducer, BoardState } from "./ducks/Board.ducks"
import { gameInitialState, GameReducer, GameState } from "./ducks/Game.ducks"
import { generalInitialState, GeneralReducer, GeneralState } from "./ducks/General.ducks"
import { PadReducer, padInitialState, PadState } from "./ducks/Pad.ducks"
import { UserReducer, userInitialState, UserState } from "./ducks/User.ducks"
import { RootActionsEnum } from "./rootActions"

export type RootState = typeof INITIAL_ROOTSTATE

export const INITIAL_ROOTSTATE = {
  user: userInitialState,
  pad: padInitialState,
  board: boardInitialState,
  game: gameInitialState,
  general: generalInitialState,
}

const NevadaReducer = combineReducers({
    user: UserReducer,
    pad: PadReducer,
    board: BoardReducer,
    game: GameReducer,
    general: GeneralReducer
})

const rootReducer = (
    state:
      | CombinedState<{
          user: UserState
          pad: PadState
          game: GameState
          board: BoardState
          general: GeneralState
        }>
      | undefined,
    action: AnyAction
  ) => {
    if (action.type === RootActionsEnum.LOGOUT) {
      // Undefined is used to reset the store to inital state, see :
      // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
      return NevadaReducer(undefined, action)
    }
  
    return NevadaReducer(state, action)
  }
  export default rootReducer

  export const useNevadaSelector: TypedUseSelectorHook<RootState> = useSelector