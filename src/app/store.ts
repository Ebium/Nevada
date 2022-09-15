import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import boardReducer from "../features/board/board.ducks"
import counterReducer from "../features/counter/counter.ducks"
import gameReducer from "../features/game/Game.ducks"

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
