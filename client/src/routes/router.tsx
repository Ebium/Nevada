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
                element: <Navigate to={"payment"} />,
              },
              {
                path: "payment",
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
        path: "*",
        element: <NotFound404 />,
      },
      
    ],
  },
]
