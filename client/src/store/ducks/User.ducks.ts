import axios, { AxiosError, AxiosResponse } from "axios"
import { Dispatch } from "react"
import { AnyAction } from "redux"

export const enum UserActionsEnum {
  UPDATE_SOCKETID = "USER/updateSocketID",
  UPDATE_USER = "USER/updateUser",
  UPDATE_USER_FAILED = "USER/updateUserFailed",
  UPDATE_USER_LOADING = "USER/updateUserLoading",

  UPDATE_USERS_RANKING = "USER/updateUsersRanking",
  UPDATE_USERS_RANKING_FAILED = "USER/updateUsersRankingFailed",
  UPDATE_USERS_RANKING_LOADING = "USER/updateUsersRankingLoading",
}

export const updateSocketID = (sock: string) =>
  ({ type: UserActionsEnum.UPDATE_SOCKETID, sock } as const)

const updateUser = (payload: UserInfos) =>
  ({ type: UserActionsEnum.UPDATE_USER, payload } as const)

const updateUserFailed = () =>
  ({ type: UserActionsEnum.UPDATE_USER_FAILED } as const)

const updateUserLoading = () =>
  ({ type: UserActionsEnum.UPDATE_USER_LOADING } as const)

const updateUsersRanking = (payload: Array<UserInfos>) =>
  ({ type: UserActionsEnum.UPDATE_USERS_RANKING, payload } as const)

const updateUsersRankingFailed = () =>
  ({ type: UserActionsEnum.UPDATE_USERS_RANKING_FAILED } as const)

const updateUsersRankingLoading = () =>
  ({ type: UserActionsEnum.UPDATE_USERS_RANKING_LOADING } as const)

type UserActionsType = ReturnType<
  | typeof updateSocketID
  | typeof updateUser
  | typeof updateUserFailed
  | typeof updateUserLoading
  | typeof updateUsersRanking
  | typeof updateUsersRankingFailed
  | typeof updateUsersRankingLoading
>

export interface UserInfos {
  pseudo: string
  email: string
  createdAt: string
  premium: boolean
  premiumLifeTime: boolean
  nbPlayed: number
  won: number
  winStreak: number
  colorPseudo: string
}

export interface UserState {
  socketId: string
  status: "idle" | "loading" | "failed"
  email: string
  pseudo: string
  creationDate: string
  isPremium: boolean
  isPremiumLifeTime: boolean
  nbGames: number
  nbGamesWin: number
  winStreak: number
  colorPseudo: string
  usersRanking: Array<UserInfos>
}

export const userInitialState: UserState = {
  socketId: "",
  status: "idle",
  email: "",
  pseudo: "",
  creationDate: "",
  isPremium: false,
  isPremiumLifeTime: false,
  nbGames: 0,
  nbGamesWin: 0,
  winStreak: 0,
  colorPseudo: "gold",
  usersRanking: [],
}

export function UserReducer(
  state = userInitialState,
  action: UserActionsType
): UserState {
  switch (action.type) {
    case UserActionsEnum.UPDATE_SOCKETID:
      return { ...state, socketId: action.sock }
    case UserActionsEnum.UPDATE_USER:
      return {
        ...state,
        email: action.payload.email,
        pseudo: action.payload.pseudo,
        creationDate: action.payload.createdAt,
        isPremium: action.payload.premium,
        isPremiumLifeTime: action.payload.premiumLifeTime,
        nbGames: action.payload.nbPlayed,
        nbGamesWin: action.payload.won,
        winStreak: action.payload.winStreak,
        colorPseudo: action.payload.colorPseudo,
        status: "idle",
      }
    case UserActionsEnum.UPDATE_USER_FAILED:
      return { ...state, status: "failed" }
    case UserActionsEnum.UPDATE_USER_LOADING:
      return { ...state, status: "loading" }
    case UserActionsEnum.UPDATE_USERS_RANKING:
      return {
        ...state,
        status: "idle",
        usersRanking: action.payload,
      }
    case UserActionsEnum.UPDATE_USERS_RANKING_FAILED:
      return { ...state, status: "failed" }
    case UserActionsEnum.UPDATE_USERS_RANKING_LOADING:
      return { ...state, status: "loading" }
    default:
      return { ...state }
  }
}

export const updateUserThunk =
  (email: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateUserLoading())
    return axios
      .get(`/users/${email}`)
      .then(({ data }: AxiosResponse) => {
        const updatedPseudo = data.result.premium
          ? "👑 " + data.result.pseudo
          : data.result.pseudo
        dispatch(
          updateUser({
            pseudo: updatedPseudo,
            email: data.result.pseudo,
            createdAt: data.result.createdAt,
            premium: data.result.premium,
            premiumLifeTime: data.result.premiumLifeTime,
            nbPlayed: data.result.played,
            won: data.result.won,
            winStreak: data.result.winStreak,
            colorPseudo: data.result.colorPseudo,
          })
        )
      })
      .catch((e: AxiosError) => {
        dispatch(updateUserFailed())
      })
  }

export const getUsersRankingThunk = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(updateUsersRankingLoading())
  return axios
    .get(`/users/ranking`)
    .then(({ data }: AxiosResponse) => {
      dispatch(updateUsersRanking(data))
    })
    .catch((e: AxiosError) => {
      dispatch(updateUsersRankingFailed())
    })
}
