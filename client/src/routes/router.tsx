import { Navigate, RouteObject } from "react-router-dom"
import { Game } from "./game/Game"
import { Layout } from "../Layout"
import { Home } from "./other/Home"
import { NotFound404 } from "./other/NotFound404"
import { PaymentRefused } from "./payment/PaymentRefused"
import { PaymentAccepted } from "./payment/PaymentAccepted"
import { Payment } from "./payment/Payment"
import Pay from "../Paiement/Pay"
import { Showroom } from "./other/Showroom"
import { Main } from "../components/Main"
import RoomButton from "./game/RoomButton"
import Room from "./game/Room"
import { Profil } from "./other/Profil"
import { LoginSignup } from "./other/LoginSignup"
import { CGU } from "./other/CGU"
import { Temp } from "./other/Temp"
import { Game2 } from "./game/Game2"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Navigate to={"main/"} />,
        index: true,
      },
      {
        path: "showroom",
        element: <Showroom />,
      },
      {
        path: "cgu",
        element: <CGU />,
      },
      {
        path: "game2",
        element: <Game2 />,
      },
      {
        path: "main/*",
        element: <Main />,
        children: [
          {
            index: true,
            element: <Navigate to={"home"} />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "temp",
            element: <Temp />,
          },
          {
            path: "profil",
            element: <Profil />,
          },
          {
            path: "game",
            element: <Game />,
          },
          {
            path: "pay",
            element: <Pay />,
          },
          {
            path: "login",
            element: <LoginSignup />,
          },
          {
            path: "createroom",
            element: <RoomButton />,
          },
          {
            path: ":room",
            element: <Room />,
          },
          {
            path: "*",
            element: <Navigate to={"/not_found"} />,
          },
          {
            path: "payment/*",
            children: [
              {
                index: true,
                element: <Payment />,
              },
              {
                path: "paymentRefused",
                element: <PaymentRefused />,
              },
              {
                path: "paymentAccepted",
                element: <PaymentAccepted />,
              },
              {
                path: "*",
                element: <Navigate to={"/not_found"} />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
]
