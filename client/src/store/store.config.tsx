import { AnyAction, applyMiddleware, createStore } from "redux"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer, { RootState } from "./rootReducer"

export type NevadaThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export interface Dispatch<A = AnyAction | NevadaThunkAction> {
  <T extends A>(action: T): T
}

export default function configureStore() {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, {}, composedEnhancers)

  return store
}
