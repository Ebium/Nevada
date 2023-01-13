import { AnyAction } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosResponse } from "axios"
import { Dispatch } from "react"

export const enum GeneralActionsEnum {
  RESET_BOARD_ARRAY = "GENERAL/resetBoardArray",
  UPDATE_PLAYERS_COUNTER_ATTEMPT = "GENERAL/updatePlayersCounterAttempt",
  UPDATE_PLAYERS_COUNTER_SUCCESS = "GENERAL/updatePlayersCounterSuccess",
  UPDATE_PLAYERS_COUNTER_FAILED = "GENERAL/updatePlayersCounterFailed",

  UPDATE_GAMES_COUNTER_ATTEMPT = "GENERAL/updateGamesCounterAttempt",
  UPDATE_GAMES_COUNTER_SUCCESS = "GENERAL/updateGamesCounterSuccess",
  UPDATE_GAMES_COUNTER_FAILED = "GENERAL/updateGamesCounterFailed",

  UPDATE_SPECTATORS_COUNTER_ATTEMPT = "GENERAL/updateSpectatorsCounterAttempt",
  UPDATE_SPECTATORS_COUNTER_SUCCESS = "GENERAL/updateSpectatorsCounterSuccess",
  UPDATE_SPECTATORS_COUNTER_FAILED = "GENERAL/updateSpectatorsCounterFailed",
}

export const resetBoardArray = () =>
  ({
    type: GeneralActionsEnum.RESET_BOARD_ARRAY,
  } as const)
export const updatePlayersCounterAttempt = () =>
  ({
    type: GeneralActionsEnum.UPDATE_PLAYERS_COUNTER_ATTEMPT,
  } as const)
export const updatePlayersCounterSuccess = (nb: number) =>
  ({
    type: GeneralActionsEnum.UPDATE_PLAYERS_COUNTER_SUCCESS,
    nb,
  } as const)
export const updatePlayersCounterFailed = () =>
  ({
    type: GeneralActionsEnum.UPDATE_PLAYERS_COUNTER_FAILED,
  } as const)
export const updateGamesCounterAttempt = () =>
  ({
    type: GeneralActionsEnum.UPDATE_GAMES_COUNTER_ATTEMPT,
  } as const)
export const updateGamesCounterSuccess = (nb: number) =>
  ({
    type: GeneralActionsEnum.UPDATE_GAMES_COUNTER_SUCCESS,
    nb,
  } as const)
export const updateGamesCounterFailed = () =>
  ({
    type: GeneralActionsEnum.UPDATE_GAMES_COUNTER_FAILED,
  } as const)
export const updateSpectatorsCounterAttempt = () =>
  ({
    type: GeneralActionsEnum.UPDATE_SPECTATORS_COUNTER_ATTEMPT,
  } as const)
export const updateSpectatorsCounterSuccess = (nb: number) =>
  ({
    type: GeneralActionsEnum.UPDATE_SPECTATORS_COUNTER_SUCCESS,
    nb,
  } as const)
export const updateSpectatorsCounterFailed = () =>
  ({
    type: GeneralActionsEnum.UPDATE_SPECTATORS_COUNTER_FAILED,
  } as const)

type GeneralActionsType = ReturnType<
  | typeof resetBoardArray
  | typeof updatePlayersCounterAttempt
  | typeof updatePlayersCounterSuccess
  | typeof updatePlayersCounterFailed
  | typeof updateGamesCounterAttempt
  | typeof updateGamesCounterSuccess
  | typeof updateGamesCounterFailed
  | typeof updateSpectatorsCounterAttempt
  | typeof updateSpectatorsCounterSuccess
  | typeof updateSpectatorsCounterFailed
>

export interface GeneralState {
  players: number
  playersStatus: "idle" | "loading" | "failed"
  spectators: number
  spectatorsStatus: "idle" | "loading" | "failed"
  games: number
  gamesStatus: "idle" | "loading" | "failed"
}

export const generalInitialState: GeneralState = {
  players: 0,
  spectators: 0,
  games: 0,
  playersStatus: "idle",
  spectatorsStatus: "idle",
  gamesStatus: "idle",
}

export function GeneralReducer(
  state = generalInitialState,
  action: GeneralActionsType
): GeneralState {
  switch (action.type) {
    case GeneralActionsEnum.RESET_BOARD_ARRAY:
      return { ...state }
    case GeneralActionsEnum.UPDATE_PLAYERS_COUNTER_ATTEMPT:
      return { ...state, playersStatus: "loading" }
    case GeneralActionsEnum.UPDATE_PLAYERS_COUNTER_SUCCESS:
      return { ...state, players: action.nb, playersStatus: "idle" }
    case GeneralActionsEnum.UPDATE_PLAYERS_COUNTER_FAILED:
      return { ...state, playersStatus: "failed" }
    case GeneralActionsEnum.UPDATE_GAMES_COUNTER_ATTEMPT:
      return { ...state, gamesStatus: "loading" }
    case GeneralActionsEnum.UPDATE_GAMES_COUNTER_SUCCESS:
      return { ...state, games: action.nb, gamesStatus: "idle" }
    case GeneralActionsEnum.UPDATE_GAMES_COUNTER_FAILED:
      return { ...state, gamesStatus: "failed" }
    case GeneralActionsEnum.UPDATE_SPECTATORS_COUNTER_ATTEMPT:
      return { ...state, spectatorsStatus: "loading" }
    case GeneralActionsEnum.UPDATE_SPECTATORS_COUNTER_SUCCESS:
      return { ...state, spectators: action.nb, spectatorsStatus: "idle" }
    case GeneralActionsEnum.UPDATE_SPECTATORS_COUNTER_FAILED:
      return { ...state, spectatorsStatus: "failed" }
    default:
      return { ...state }
  }
}

export const getPlayersCounterThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(updatePlayersCounterAttempt())
  return axios
    .get(`/general/get_players_counter`)
    .then(({ data }: AxiosResponse) => {
      dispatch(updatePlayersCounterSuccess(data.count))
    })
    .catch((e: AxiosError) => {
      dispatch(updatePlayersCounterFailed())
    })
}

export const getGamesCounterThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(updateGamesCounterAttempt())
  return axios
    .get(`/general/get_games_counter`)
    .then(({ data }: AxiosResponse) => {
      dispatch(updateGamesCounterSuccess(data.count))
    })
    .catch((e: AxiosError) => {
      dispatch(updateGamesCounterFailed())
    })
}

export const getSpectatorsCounterThunk =
  () => (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateSpectatorsCounterAttempt())
    return axios
      .get(`/general/get_spectators_counter`)
      .then(({ data }: AxiosResponse) => {
        dispatch(updateSpectatorsCounterSuccess(data.count))
      })
      .catch((e: AxiosError) => {
        dispatch(updateSpectatorsCounterFailed())
      })
  }
