import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { CGUButton } from "../../components/CGUButton"
import { colors } from "../../components/styles/design.config"
import { NVButton } from "../../components/styles/NVButton"
import { NVInput } from "../../components/styles/NVInput"
import { NVLine } from "../../components/styles/NVLine"
import { NVSpacer } from "../../components/styles/NVSpacer"
import { NVText } from "../../components/styles/NVText"
import { ReactComponent as PasswordSVG } from "../../assets/password.svg"
import { ReactComponent as ProfileSVG } from "../../assets/profile.svg"
import { ReactComponent as MailSVG } from "../../assets/mail.svg"
import { NVAlert } from "../../components/styles/NVAlert"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { socket } from "../../socket-context"
import { useDispatch } from "react-redux"
import { updateUserThunk } from "../../store/ducks/User.ducks"

export const LoginSignup = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Connexion --------------------------------------------------------------------

  const [loginPassword, setLoginPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")

  useEffect(() => {
    getLoginServerReponse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit("Login an user", {
      email: loginEmail,
      password: loginPassword,
      auth: socket.id,
    })
  }

  const handleLoginChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(event.target.value.toLowerCase())
  }

  const handleLoginChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(event.target.value)
  }


  const getLoginServerReponse = () => {
    socket.once("Login an user", (result, isConnected) => {
      if (isConnected) {
        localStorage.setItem("auth", socket.id)
        dispatch(updateUserThunk(result.user.email))
        console.log("passe la 2")
        navigate("/main/home")
      } else {
        showLoginError(result)
      }
    })
  }

  const showLoginError = (result: any) => {
    console.log("on a eu error")
    console.log(result)
    alert(result)
  }

  //-------------------------------------------------------------------------------

  //Inscription --------------------------------------------------------------------

  const [signupPassword, setSignupPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPseudo, setSignupPseudo] = useState("")
  const [cguAlertDisplayed, setCGUAlertDisplayed] = useState(false)
  const [signupCheckboxCGU, setSignupCheckboxCGU] = useState(false)

  useEffect(() => {
    getSignupServerReponse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!signupCheckboxCGU) setCGUAlertDisplayed(true)
    else {
      setCGUAlertDisplayed(false)
      socket.emit("Register a new user", {
        email: signupEmail,
        password: signupPassword,
        pseudo: signupPseudo,
      })
    }
  }

  const handleSignupChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupEmail(event.target.value.toLowerCase())
  }

  const handleSignupChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupPassword(event.target.value)
  }

  const handleSignupChangePseudonym = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupPseudo(event.target.value)
  }

  const getSignupServerReponse = () => {
    socket.on("Register a new user", (result, isCreated) => {
      if (isCreated) {
        updateUserThunk(result.email)
        navigate("/main/home")
      } else {
        showSignupErrors(result)
      }
    })
  }

  const showSignupErrors = (result: any) => {
    var errors = ""
    if (result.errors.email !== undefined) errors = result.errors.email + "\n"

    if (result.errors.pseudo !== undefined)
      errors = errors + result.errors.email

    alert(errors)
  }

  //-------------------------------------------------------------------------------

  return (
    <Content>
      <NVAlert
        isDisplayed={cguAlertDisplayed}
        text={intl.formatMessage({ id: "loginsignup.alert.cgu" })}
        onClose={() => {
          setCGUAlertDisplayed(!cguAlertDisplayed)
        }}
      />
      <form onSubmit={handleLoginSubmit}>
        <LeftDiv>
          <NVText
            text={intl.formatMessage({ id: "loginsignup.login" })}
            textStyle={{
              color: "nevadaGold",
              fontSize: 1.8,
              fontWeight: 500,
              letterSpacing: 0.3,
            }}
          />
          <NVSpacer height={2} />
          <NVLine width={20} />
          <NVSpacer height={3} />
          <NVInput
            disabled={false}
            type="email"
            value={loginEmail}
            onChange={(e) => {
              handleLoginChangeEmail(e)
            }}
            placeholder="Mail@example.com"
            required
            svg={<MailSVG />}
          />
          <NVSpacer height={2} />
          <NVInput
            disabled={false}
            value={loginPassword}
            onChange={handleLoginChangePassword}
            required
            type={"password"}
            placeholder={"Mot de passe"}
            svg={<PasswordSVG />}
          />
          <NVSpacer height={2} />
          <NVInput
            disabled={false}
            value={intl.formatMessage({
              id: "loginsignup.login",
            })}
            type={"submit"}
            colorSchem={"black"}
          />
        </LeftDiv>
      </form>
      <MidDiv>
        <NVLine height={30} />
        <NVSpacer height={5} />
        <NVButton
          disabled={false}
          content={intl.formatMessage({
            id: "button.home",
          })}
          colorSchem={"black"}
          onClick={() => {
            navigate("/main/home")
          }}
        />
      </MidDiv>
      <form onSubmit={handleSignupSubmit}>
        <RightDiv>
          <NVText
            text={intl.formatMessage({ id: "loginsignup.signup" })}
            textStyle={{
              color: "nevadaGold",
              fontSize: 1.8,
              fontWeight: 500,
              letterSpacing: 0.3,
            }}
          />
          <NVSpacer height={2} />
          <NVLine width={20} />
          <NVSpacer height={3} />
          <NVInput
            disabled={false}
            type={"email"}
            placeholder={"Mail@example.com"}
            value={signupEmail}
            onChange={(e) => {
              handleSignupChangeEmail(e)
            }}
            svg={<MailSVG />}
            required
          />
          <NVSpacer height={2} />
          <NVInput
            disabled={false}
            type={"text"}
            placeholder={"Pseudo"}
            svg={<ProfileSVG />}
            value={signupPseudo}
            onChange={(e) => {
              handleSignupChangePseudonym(e)
            }}
            required
          />
          <NVSpacer height={2} />
          <NVInput
            disabled={false}
            type={"password"}
            placeholder={"Mot de passe"}
            svg={<PasswordSVG />}
            value={signupPassword}
            onChange={(e) => {
              handleSignupChangePassword(e)
            }}
            required
          />
          <NVSpacer height={2} />
          <label>
            <input
              disabled={false}
              onChange={() => {
                setSignupCheckboxCGU(!signupCheckboxCGU)
              }}
              type={"checkbox"}
            />
            <NVText
              text={intl.formatMessage({ id: "loginsignup.cgu" })}
              textStyle={{ color: "midGrey" }}
            />
          </label>
          <NVSpacer height={2} />
          <NVInput
            disabled={false}
            value={intl.formatMessage({
              id: "loginsignup.signup",
            })}
            type={"submit"}
            colorSchem={"black"}
          />
        </RightDiv>
      </form>

      <CGUButton />
    </Content>
  )
}

const Content = styled.div`
  background-color: ${colors.nevadaBackground};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 35rem;
`

const MidDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 35rem;
  width: 22rem;
`
