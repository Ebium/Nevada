import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../app/store"
import { incrementAsync } from "./counter.ducks"

export interface GameState {
  started: boolean
  status: "idle" | "loading" | "failed"
}

const initialState: GameState = {
  started: false,
  status: "idle",
}

export const gameReducer = createSlice({
  name: "game",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
})

export default gameReducer.reducer
