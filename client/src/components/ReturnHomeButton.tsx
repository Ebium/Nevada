import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { NVButton } from "./styles/NVButton"
import { ReactComponent as ArrowLeft } from "../assets/arrow_left.svg"

export const ReturnHomeButton = () => {
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <AbsoluteContent>
      <NVButton
        disabled={false}
        content={intl.formatMessage({ id:"button.back-home" })}
        colorSchem={"black"}
        onClick={() => {
          navigate("/main/home")
        }}
        svg={<ArrowLeft />}
      />
    </AbsoluteContent>
  )
}

const AbsoluteContent = styled.div`
  position: absolute;
  left: 1rem;
  top: 10rem;
`
