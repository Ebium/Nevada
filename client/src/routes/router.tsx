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
import Login from "./Login"
import { Main } from "../components/Main"
import { Profil } from "./other/Profil"

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
            path: "*",
            element: <NotFound404 />,
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
                element: <NotFound404 />,
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
