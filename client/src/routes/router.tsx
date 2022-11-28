import { Navigate, RouteObject } from "react-router-dom"
import { Game } from "./game/Game"
import { Layout } from "../Layout"
import { Home } from "./other/Home"
import { NotFound404 } from "./other/NotFound404"
import { PaymentRefused } from "./payment/PaymentRefused"
import { PaymentAccepted } from "./payment/PaymentAccepted"
import { Payment } from "./payment/Payment"
import SignUp from "./SignUp"
import Pay from "../Paiement/Pay"
import { Showroom } from "./other/Showroom"
import { Main } from "../components/Main"
import Login from "./Login"
import RoomButton from "./game/RoomButton"
import Room from "./game/Room"
import { Profil } from "./other/Profil"
import { LoginSignup } from "./other/LoginSignup"

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
            path: "signup",
            element: <SignUp />,
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
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
]
