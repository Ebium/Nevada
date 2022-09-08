import { AnyAction, CombinedState, combineReducers } from "redux"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { boardInitialState, boardReducer, BoardState } from "./ducks/Board.ducks"
import { userInitialState, userReducer, UserState } from "./ducks/User.ducks"
import { RootActionsEnum } from "./rootActions"

export type RootState = typeof INITIAL_ROOTSTATE

export const INITIAL_ROOTSTATE = {
  user: userInitialState,
  board: boardInitialState,
}

const ArizonaReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
})

const rootReducer = (
  state:
    | CombinedState<{
        user: UserState
        board: BoardState
      }>
    | undefined,
  action: AnyAction
) => {
  if (action.type === RootActionsEnum.LOGOUT) {
    // Undefined is used to reset the store to inital state, see :
    // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
    return ArizonaReducer(undefined, action)
  }

  return ArizonaReducer(state, action)
}
export default rootReducer

export const useArizonaSelector: TypedUseSelectorHook<RootState> = useSelector
