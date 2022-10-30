import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { Game } from "./components/Game"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import configureStore from "./store/store.config"

const container = document.getElementById("root")!
const root = createRoot(container)
const store = configureStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
