import { Navigate, RouteObject } from "react-router-dom"
import { Game } from "./game/Game"
import { Layout } from "../Layout"
import { Home } from "./Home"
import { NotFound404 } from "./NotFound404"
import { PaymentRefused } from "./payment/PaymentRefused"
import { PaymentAccepted } from "./payment/PaymentAccepted"
import { Payment } from "./payment/Payment"

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
]
