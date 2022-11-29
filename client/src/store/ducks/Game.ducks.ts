import { Move, Pad } from "../../utils/Moves"
export const enum GameActionsEnum {
  UPDATE_GAME_STARTED = "GAME/updateGameStarted",

  UPDATE_MOVES_HISTORY = "GAME/updateMovesHistory",

  UPDATE_PADS = "GAME/updatePads",

  UPDATE_DISABLED_INDEX_PADS = "GAME/updateDisabledIndexPads",

  RESTART_GAME = "GAME/restartGame"
}

export const updateGameStarted = (bool: boolean) =>
({
  type: GameActionsEnum.UPDATE_GAME_STARTED,
  bool
} as const)
export const updateMovesHistory = (moves: Move[], count: number) =>
({
  type: GameActionsEnum.UPDATE_MOVES_HISTORY,
  moves,
  count
} as const)
export const updatePads = (pads: Pad[]) =>
({
  type: GameActionsEnum.UPDATE_PADS,
  pads
} as const)
export const updateDisabledIndexPads = (disabledIndexPads: number[]) =>
({
  type: GameActionsEnum.UPDATE_DISABLED_INDEX_PADS,
  disabledIndexPads
} as const)
export const restartGame = () => 
({
  type: GameActionsEnum.RESTART_GAME
} as const)

type GameActionsType = ReturnType<
  | typeof updateGameStarted
  | typeof updateMovesHistory
  | typeof updatePads
  | typeof updateDisabledIndexPads
  | typeof restartGame
>

export interface GameState {
  started: boolean

  status: "idle" | "loading" | "failed"

  movesHistory: Move[] // Contient l'ancienne valeur des cases avant le coup joué permettant de d'annuler le dernier coup joué

  movesCount: number // Contient le nombre de coup joué permettant d'alterner la couleurs des joueurs

  pads: Pad[] // Contient le tableau les Pads/Palettes du jeu permettant de trouver une palette grâce à des coordonnées x et y
              // contient aussi les boules des adversaires

  disabledIndexPads: number[] // Contient l'indice des palettes désactivés, 
                              // structure de données : file
                              // dès qu'un coup est joué, la palette sera désactivée, son indice sera mis dans la file
                              // lorsque la taille dépasse 2, le premier arrivé quitte la file 
                              //  FIFO
}

export const gameInitialState: GameState = {
  started: false,
  status: "idle",
  movesHistory: [], 
  movesCount: 0, 
  pads: [],
  disabledIndexPads: []
}

export function GameReducer(
  state = gameInitialState,
  action: GameActionsType
): GameState {
  switch (action.type) {
    case GameActionsEnum.UPDATE_GAME_STARTED:
      return { ...state, started: action.bool, movesCount: 0, movesHistory: []}
    case GameActionsEnum.RESTART_GAME:
      return { ...state, started: false, movesCount: 0, movesHistory: [], pads: [], disabledIndexPads: []}
    case GameActionsEnum.UPDATE_MOVES_HISTORY:
      return { ...state, movesHistory: action.moves, movesCount: action.count }
    case GameActionsEnum.UPDATE_PADS:
      return { ...state, pads: action.pads }
    case GameActionsEnum.UPDATE_DISABLED_INDEX_PADS:
      return { ...state, disabledIndexPads: action.disabledIndexPads }
    default:
      return { ...state }
  }
}
