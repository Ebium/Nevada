export const enum GameActionsEnum {
  UPDATE_GAME_CAN_START = "GAME/updateGameCanStart",
}

export const updateGameCanStart = (bool: boolean) =>
  ({ type: GameActionsEnum.UPDATE_GAME_CAN_START, bool } as const)

type GameActionsType = ReturnType<typeof updateGameCanStart>

export interface GameState {
  started: boolean
  status: "idle" | "loading" | "failed"
}

export const gameInitialState: GameState = {
  started: false,
  status: "idle",
}

export function GameReducer(
  state = gameInitialState,
  action: GameActionsType
): GameState {
  switch (action.type) {
    case GameActionsEnum.UPDATE_GAME_CAN_START:
      return { ...state, started: action.bool }
    default:
      return { ...state }
  }
}
