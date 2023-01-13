import { GraphicPad, PadHistory } from "../../utils/Moves"

export const enum BoardActionsEnum {
  UPDATE_BOARD_ARRAY = "BOARD/updateBoardArray",

  RESET_BOARD_ARRAY = "BOARD/resetBoardArray",

  UPDATE_HISTORY_BOARD = "BOARD/updateHistoryBoard",

  UPDATE_BOARD_STATE = "BOARD/updateBoardState",

  UPDATE_GRAPHIC_PADS = "GAME/updateGraphicPads",
}

export const updateGraphicPads = (graphicPads: GraphicPad[]) =>
  ({
    type: BoardActionsEnum.UPDATE_GRAPHIC_PADS,
    graphicPads,
  } as const)
export const updateBoardArray = (array: boardType) =>
  ({
    type: BoardActionsEnum.UPDATE_BOARD_ARRAY,
    array,
  } as const)
export const resetBoardArray = () =>
  ({
    type: BoardActionsEnum.RESET_BOARD_ARRAY,
  } as const)
export const updateHistoryBoard = (histo: PadHistory[]) =>
  ({
    type: BoardActionsEnum.UPDATE_HISTORY_BOARD,
    histo,
  } as const)

export const updateBoardState = (boardState: BoardState) =>
  ({
    type: BoardActionsEnum.UPDATE_BOARD_STATE,
    boardState,
  } as const)

type BoardActionsType = ReturnType<
  | typeof updateBoardArray
  | typeof resetBoardArray
  | typeof updateHistoryBoard
  | typeof updateBoardState
  | typeof updateGraphicPads
>

let x = -1
let y = -1

export const initialeBoardArray = Array(10)
  .fill(0)
  .map(() => {
    x++
    return new Array(10).fill(0).map(() => {
      y++
      if (y === 10) {
        y = 0
      }
      return { x: x, y: y, isFilled: false, color: "" }
    })
  })

export type boardType = Array<any>

export interface BoardState {
  value: number
  status: "idle" | "loading" | "failed"
  array: boardType
  history: PadHistory[]
  graphicPads: GraphicPad[]
  // Contient le tableau des palettes designées
}

export const boardInitialState: BoardState = {
  value: 0,
  status: "idle",
  array: initialeBoardArray,
  history: [],
  graphicPads: [],
}

export function BoardReducer(
  state = boardInitialState,
  action: BoardActionsType
): BoardState {
  switch (action.type) {
    case BoardActionsEnum.UPDATE_BOARD_ARRAY:
      return { ...state, array: action.array }
    case BoardActionsEnum.RESET_BOARD_ARRAY:
      return { ...state, array: initialeBoardArray, graphicPads: [] }
    case BoardActionsEnum.UPDATE_GRAPHIC_PADS:
      return { ...state, graphicPads: action.graphicPads }
    case BoardActionsEnum.UPDATE_HISTORY_BOARD:
      return { ...state, history: action.histo }
    case BoardActionsEnum.UPDATE_BOARD_STATE:
      return { ...action.boardState }
    default:
      return { ...state }
  }
}
