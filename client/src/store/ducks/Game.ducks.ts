import { Move, Pad } from "../../utils/Moves"
export const enum GameActionsEnum {
  UPDATE_GAME_STARTED = "GAME/updateGameStarted",

  UPDATE_MOVES_HISTORY = "GAME/updateMovesHistory",

  UPDATE_PADS = "GAME/updatePads",

  UPDATE_DISABLED_INDEX_PADS = "GAME/updateDisabledIndexPads",

  RESTART_GAME = "GAME/restartGame",

  UPDATE_POINT_END = "GAME/updatePointEnd",

  UPDATE_GAME_STATE = "GAME/updateGameState",

  UPDATE_GAME_PHASE = "GAME/updateGamePhase",

  UPDATE_PLAYER_ID = "GAME/updatePlayerId",

  UPDATE_PLAYERS_INFOS = "GAME/updatePlayersInfos",
}

export const updateGameStarted = (bool: boolean) =>
  ({
    type: GameActionsEnum.UPDATE_GAME_STARTED,
    bool,
  } as const)
export const updatePlayersInfos = (p1: any, p2: any) =>
  ({
    type: GameActionsEnum.UPDATE_PLAYERS_INFOS,
    p1,
    p2,
  } as const)
export const updatePlayerId = (id: number) =>
  ({
    type: GameActionsEnum.UPDATE_PLAYER_ID,
    id,
  } as const)
export const updateMovesHistory = (moves: Move[], count: number) =>
  ({
    type: GameActionsEnum.UPDATE_MOVES_HISTORY,
    moves,
    count,
  } as const)
export const updatePointEnd = (
  pointsFirstPlayer: number,
  pointsSecondPlayer: number
) =>
  ({
    type: GameActionsEnum.UPDATE_POINT_END,
    pointsFirstPlayer,
    pointsSecondPlayer,
  } as const)
export const updatePads = (pads: Pad[]) =>
  ({
    type: GameActionsEnum.UPDATE_PADS,
    pads,
  } as const)
export const updateDisabledIndexPads = (disabledIndexPads: number[]) =>
  ({
    type: GameActionsEnum.UPDATE_DISABLED_INDEX_PADS,
    disabledIndexPads,
  } as const)
export const restartGame = () =>
  ({
    type: GameActionsEnum.RESTART_GAME,
  } as const)
export const updateGameState = (gameState: GameState) =>
  ({
    type: GameActionsEnum.UPDATE_GAME_STATE,
    gameState,
  } as const)
export const updateGamePhase = (gamePhase: GamePhaseType) =>
  ({
    type: GameActionsEnum.UPDATE_GAME_PHASE,
    gamePhase,
  } as const)

type GameActionsType = ReturnType<
  | typeof updateGameStarted
  | typeof updateMovesHistory
  | typeof updatePads
  | typeof updateDisabledIndexPads
  | typeof restartGame
  | typeof updatePointEnd
  | typeof updateGameState
  | typeof updateGamePhase
  | typeof updatePlayerId
  | typeof updatePlayersInfos
>

export type GamePhaseType = "waiting" | "boarding" | "building" | "playing"

interface PlayerInfos {
  nbPlayed: number
  won: number
  lost: number
  pseudo: string
  winStreak: number
}

export interface GameState {
  started: boolean
  //status de la partie en cours
  pointsFirstPlayer: number

  pointsSecondPlayer: number

  movesHistory: Move[]
  // Contient l'ancienne valeur des cases avant le coup joué permettant de d'annuler le dernier coup joué

  movesCount: number
  // Contient le nombre de coup joué permettant d'alterner la couleurs des joueurs

  pads: Pad[]
  /* Contient le tableau les Pads/Palettes du jeu permettant de trouver une palette grâce à des coordonnées x et y
   * contient aussi les boules des adversaires
   */

  disabledIndexPads: number[]
  /* Contient l'indice des palettes désactivés,
   * structure de données : file
   * dès qu'un coup est joué, la palette sera désactivée, son indice sera mis dans la file
   * lorsque la taille dépasse 2, le premier arrivé quitte la file
   *  FIFO
   * */

  gamePhase: GamePhaseType
  // Etat de la partie actuelle

  playerId: number
  /* id du joueur actuel représentant son état dans la partie:
   * -1 : spectateur
   * 0 : joueur 1
   * 1 : joueur 2
   */

  player1: PlayerInfos
  // infos du joueur 1 de la partie

  player2: PlayerInfos
  // infos du joueur 2 de la partie
}

export const gameInitialState: GameState = {
  started: false,
  movesHistory: [],
  movesCount: 0,
  pads: [],
  disabledIndexPads: [],
  pointsFirstPlayer: 0,
  pointsSecondPlayer: 0,
  gamePhase: "waiting",
  playerId: -1,
  player1: {
    pseudo: "",
    nbPlayed: 0,
    won: 0,
    lost: 0,
    winStreak: 0,
  },
  player2: {
    pseudo: "",
    nbPlayed: 0,
    won: 0,
    lost: 0,
    winStreak: 0,
  },
}

export function GameReducer(
  state = gameInitialState,
  action: GameActionsType
): GameState {
  switch (action.type) {
    case GameActionsEnum.UPDATE_GAME_STARTED:
      return { ...state, started: action.bool, movesCount: 0, movesHistory: [] }
    case GameActionsEnum.RESTART_GAME:
      return {
        ...state,
        started: false,
        movesCount: 0,
        movesHistory: [],
        pads: [],
        disabledIndexPads: [],
      }
    case GameActionsEnum.UPDATE_MOVES_HISTORY:
      return { ...state, movesHistory: action.moves, movesCount: action.count }
    case GameActionsEnum.UPDATE_PLAYERS_INFOS:
      return {
        ...state,
        player1: {
          nbPlayed: action.p1.played,
          won: action.p1.won,
          lost: action.p1.played - action.p1.won,
          pseudo: action.p1.pseudo,
          winStreak: action.p1.winStreak,
        },
        player2: {
          nbPlayed: action.p2.played,
          won: action.p2.won,
          lost: action.p2.played - action.p2.won,
          pseudo: action.p2.pseudo,
          winStreak: action.p2.winStreak,
        },
      }
    case GameActionsEnum.UPDATE_PADS:
      return { ...state, pads: action.pads }
    case GameActionsEnum.UPDATE_DISABLED_INDEX_PADS:
      return { ...state, disabledIndexPads: action.disabledIndexPads }
    case GameActionsEnum.UPDATE_POINT_END:
      return {
        ...state,
        pointsFirstPlayer: action.pointsFirstPlayer,
        pointsSecondPlayer: action.pointsSecondPlayer,
      }
    case GameActionsEnum.UPDATE_GAME_STATE:
      return { ...action.gameState }
    case GameActionsEnum.UPDATE_GAME_PHASE:
      return { ...state, gamePhase: action.gamePhase }
    case GameActionsEnum.UPDATE_PLAYER_ID:
      return { ...state, playerId: action.id }
    default:
      return { ...state }
  }
}
