export const enum UserActionsEnum {
  UPDATE_SOCKETID = "USER/updateSocketID",
}

export const updateSocketID = (sock: string) =>
  ({ type: UserActionsEnum.UPDATE_SOCKETID, sock } as const)

type UserActionsType = ReturnType<typeof updateSocketID>

export interface UserState {
  socketId: string
  status: "idle" | "loading" | "failed"
}

export const userInitialState: UserState = {
  socketId: "",
  status: "idle",
}

export function UserReducer(
  state = userInitialState,
  action: UserActionsType
): UserState {
  switch (action.type) {
    case UserActionsEnum.UPDATE_SOCKETID:
      return { ...state, socketId: action.sock }
    default:
      return { ...state }
  }
}
