import { useIntl } from "react-intl"
import styled from "styled-components"
import { NVButton } from "./styles/NVButton"

export const RulesButton = () => {
  const intl = useIntl()

  return (
    <>
      <StyledLink href={require("../assets/Kulami_FR.pdf")} target="blank">
        <NVButton
          disabled={false}
          content={intl.formatMessage({ id: "button.rules" })}
          colorSchem={"black"}
          onClick={() => {}}
        />
      </StyledLink>
    </>
  )
}

const StyledLink = styled.a`
  text-decoration: none;
`
