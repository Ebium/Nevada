import { useEffect } from "react"
import { useNavigate, useRoutes } from "react-router-dom"
import { StyledToastContainer } from "./components/other/Toaster"
import { routes } from "./routes/router"

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (false)
    navigate("/home")
  }, [])

  return <></>
}

function NEVADA() {
  //ConfigureAxios()  <-  a faire
  const element = useRoutes(routes)
  return (
    <>
      {element}
      <StyledToastContainer data-cy="toast-error" hideProgressBar={true} />
      <Home />
    </>
  )
}

export default NEVADA
