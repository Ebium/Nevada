import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

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
}

const initialState: BoardState = {
  value: 0,
  status: "idle",
  array: initialeBoardArray,
}

export const boardReducer = createSlice({
  name: "board",
  initialState,
  reducers: {},
})

export const selectBoard = (state: RootState) => state.board.value

export default boardReducer.reducer
