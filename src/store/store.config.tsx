import { AnyAction, applyMiddleware, createStore } from "redux"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import rootReducer, { RootState } from "./rootReducer"
import { composeWithDevTools } from "redux-devtools-extension"


export type ArizonaThunkAction = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  AnyAction
>

export interface Dispatch<A = AnyAction | ArizonaThunkAction> {
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