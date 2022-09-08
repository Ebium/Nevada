export interface UserState {
  test1: number
  test2: string
}

export const userInitialState: UserState = {
  test1: 1,
  test2: "eyes",
}


const enum UserActionsEnum {
    GET_TYPOLOGIES_SUCCESS = "USER/getTypologiesSuccess",
}

export const GetTypologiesSuccess = () =>
  ({
    type: UserActionsEnum.GET_TYPOLOGIES_SUCCESS,
  } as const)


type UserActionsType = ReturnType<
| typeof GetTypologiesSuccess
>

export function userReducer(
  state = userInitialState,
  action: UserActionsType
): UserState {
  console.log("test")
  return { ...state }
}
