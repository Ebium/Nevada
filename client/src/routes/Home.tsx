import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      Home page
      <button
        onClick={() => {
          navigate("/game")
        }}
      >
        GAME
      </button>
    </>
  )
}
