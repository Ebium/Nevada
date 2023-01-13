import JWT from "expo-jwt"
import env from "react-dotenv"

const getEmailFromToken = () => {
  const token = localStorage.getItem("Nevada_Token")
  const decoded = JWT.decode(token ? token : "", env.JWT_SECRET)
  return decoded.email
}

export { getEmailFromToken }
