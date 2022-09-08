export const enum RootActionsEnum {
  LOGOUT = "ROOT/logoutResetStore",
}

export const logoutResetStoreAction = () =>
  ({ type: RootActionsEnum.LOGOUT } as const)

export type RootActionsType = ReturnType<typeof logoutResetStoreAction>
