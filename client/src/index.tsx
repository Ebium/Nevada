import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import configureStore from "./store/store.config"
import { BrowserRouter } from "react-router-dom"
import NEVADA from "./NEVADA"
import {io} from 'socket.io-client'
import { useEffect } from "react"

const container = document.getElementById("root")!
const root = createRoot(container)
const store = configureStore()

  const socket = io('http://localhost:5000')
  socket.on('connect', ()=>console.log(socket.id))

console.log("jstue dansdnaiznd")


root.render(
    <BrowserRouter basename="/nevada">
      <Provider store={store}>
        <NEVADA />
      </Provider>
    </BrowserRouter>
)

reportWebVitals()
