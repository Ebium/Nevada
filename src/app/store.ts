import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import boardReducer from "../ducks/board.ducks"
import counterReducer from "../ducks/counter.ducks"
import gameReducer from "../ducks/Game.ducks"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    game: gameReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
