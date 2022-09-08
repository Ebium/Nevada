import { Dispatch, ArizonaThunkAction } from "../store.config"

export interface BoardState {
  test1: number
  test2: string
}

export const boardInitialState: BoardState = {
  test1: 1,
  test2: "eyes",
}

const enum BoardActionsEnum {
  GET_TEST = "BOARD/getTest",
}

export const GetTest = (truc: string) =>
  ({
    type: BoardActionsEnum.GET_TEST,
    truc,
  } as const)

type BoardActionsType = ReturnType<typeof GetTest>

export function boardReducer(
  state = boardInitialState,
  action: BoardActionsType
): BoardState {
  switch (action.type) {
    case BoardActionsEnum.GET_TEST:
      return { ...state, test2: action.truc }
    default:
      return { ...state }
  }
}

export const GetTestThunk = (str: string) => (dispatch: Dispatch<BoardActionsType>) => {
  console.log("az")
  dispatch(GetTest(str))
}
