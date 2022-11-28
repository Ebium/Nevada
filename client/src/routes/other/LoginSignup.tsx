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

export const LoginSignup = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  return (
    <Content>
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
          value={""}
          onChange={() => {
            console.log("random")
          }}
          type={"text"}
          placeholder={"Adresse mail"}
          svg={<MailSVG />}
        />
        <NVSpacer height={2} />
        <NVInput
          disabled={false}
          value={""}
          onChange={() => {
            console.log("random")
          }}
          type={"password"}
          placeholder={"Mot de passe"}
          svg={<PasswordSVG />}
        />
      </LeftDiv>
      <MidDiv>
        <NVLine height={20} />
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
          value={""}
          onChange={() => {
            console.log("random")
          }}
          type={"text"}
          placeholder={"Adresse mail"}
          svg={<MailSVG />}
        />
        <NVSpacer height={2} />
        <NVInput
          disabled={false}
          value={""}
          onChange={() => {
            console.log("random")
          }}
          type={"text"}
          placeholder={"Pseudo"}
          svg={<ProfileSVG />}
        />
        <NVSpacer height={2} />
        <NVInput
          disabled={false}
          value={""}
          onChange={() => {
            console.log("random")
          }}
          type={"password"}
          placeholder={"Mot de passe"}
          svg={<PasswordSVG />}
        />
      </RightDiv>

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
  height: 28rem;
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
  height: 28rem;
`
