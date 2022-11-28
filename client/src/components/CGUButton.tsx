import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro"
import { NVButton } from "./styles/NVButton"

export const CGUButton = () => {
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <AbsoluteContent>
      <NVButton
        disabled={false}
        content={intl.formatMessage({ id: "button.cgu" })}
        colorSchem={"blue"}
        onClick={() => {
          navigate("/main/home")
        }}
      />
    </AbsoluteContent>
  )
}

const AbsoluteContent = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
`
