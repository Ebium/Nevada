import { Navigate, RouteObject } from "react-router-dom"
import { Game } from "../components/Game"
import { Layout } from "../Layout"
import { Home } from "./Home"
import { NotFound404 } from "./NotFound404"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Navigate to={"home"} />,
        index: true,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
  
  
]
