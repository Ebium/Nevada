import { Move } from "../../utils/Moves"
export const enum GameActionsEnum {
  UPDATE_GAME_CAN_START = "GAME/updateGameCanStart",

  UPDATE_MOVES_HISTORY = "GAME/updateMovesHistory",
}

export const updateGameCanStart = (bool: boolean) =>
({
  type: GameActionsEnum.UPDATE_GAME_CAN_START,
  bool
} as const)
export const updateMovesHistory = (moves: Move[], count: number) =>
({
  type: GameActionsEnum.UPDATE_MOVES_HISTORY,
  moves,
  count
} as const)

type GameActionsType = ReturnType<
  | typeof updateGameCanStart
  | typeof updateMovesHistory
>

export interface GameState {
  started: boolean
  status: "idle" | "loading" | "failed"
  movesHistory: Move[]
  movesCount: number
}

export const gameInitialState: GameState = {
  started: false,
  status: "idle",
  movesHistory: [],
  movesCount: 0,
}

export function GameReducer(
  state = gameInitialState,
  action: GameActionsType
): GameState {
  switch (action.type) {
    case GameActionsEnum.UPDATE_GAME_CAN_START:
      return { ...state, started: action.bool, movesCount: 0 }
    case GameActionsEnum.UPDATE_MOVES_HISTORY:
      return { ...state, movesHistory: action.moves, movesCount: action.count }
    default:
      return { ...state }
  }
}
