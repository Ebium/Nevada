import { useNavigate } from "react-router-dom"

export const NotFound404 = () => {
  const navigate = useNavigate()

  return (
    <>
      error 400
      <button
        onClick={() => {
          navigate("/home")
        }}
      >
        HOME
      </button>
    </>
  )
}
