import { useEffect } from "react"
import { useNavigate, useRoutes } from "react-router-dom"
import { StyledToastContainer } from "./components/other/Toaster"
import { routes } from "./routes/router"
import { useNevadaSelector } from "./store/rootReducer"
import { useDispatch } from "react-redux"
import { updateSocketID } from "./store/ducks/User.ducks"
import Payer from "./Paiement/Pay"
import { socket } from "./socket-context"

// Cette page est la racine de toutes les pages, il faudra ajouter le check si un utilisateur est connecté ou pas
// si il est pas connecté ( on check ca avec un useEffect et dans le redux) alors on le redirige vers la page de connection
// dans le cas contraire, on ne faire rien du tout

const UserPermission = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id)
      dispatch(updateSocketID(socket.id))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // mettre un setter avec les différents champs de connexion
  // si personne est co , alors le useeffect fera une redirection

  // useEffect(() => {
  //   if (pasconnecté)
  //   navigate("/loginpage")
  // }, [])
  return <></>
}

function NEVADA() {
  //ConfigureAxios()  <-  a faire
  // le configure axios sert a faire en sortes que si on est pas connecté, alors on ne peut pas faire de requêtes vers le back
  // on peut faire en sorte d'autoriser certaines requêtes néanmoins
  const element = useRoutes(routes)
  return (
    <>
      {element}
      <StyledToastContainer data-cy="toast-error" hideProgressBar={true} />
      <UserPermission />
      </>
  )
}

export default NEVADA
