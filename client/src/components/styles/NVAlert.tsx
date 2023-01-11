import styled from "styled-components/macro"
import { ReactComponent as NevadaLogo } from "../../assets/nevada_logo_1.svg"
import { ReactComponent as CloseCross } from "../../assets/close_cross.svg"
import { colors } from "./design.config"
import { NVText } from "./NVText"

interface AlertProps {
  isDisplayed: boolean
  text: string
  onClose: () => void
}

export const NVAlert = ({ isDisplayed, text, onClose }: AlertProps) => {

  return (
    <>
      <Content isDisplayed={isDisplayed}>
        <TheCard>
          <LogoPlace>
            <NevadaLogo height={50} width={50} />
          </LogoPlace>
          <NVText
            text={text}
            textStyle={{ color: "nevadaGold", fontWeight: 900 }}
          />
          <ClosePlace
            onClick={() => {
              onClose()
            }}
          >
            <CloseCross />
          </ClosePlace>
        </TheCard>
      </Content>
    </>
  )
}

interface StyledProps {
  isDisplayed: boolean
}

const Content = styled.div<StyledProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isDisplayed ? 1 : 0)};
  transition: 0.1s opacity ease-in-out 0.1s;
  pointer-events: ${(props) => (props.isDisplayed ? "auto" : "none")};
  touch-action: ${(props) => (props.isDisplayed ? "auto" : "none")};
`
const TheCard = styled.div`
  padding: 0 2rem 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.nevadaBlue};
  height: 5rem;
  border: 2px ${colors.nevadaGold} solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
`
const LogoPlace = styled.div`
  position: absolute;
  left: -24px;
`
const ClosePlace = styled.div`
  cursor: pointer;
  position: absolute;
  right: 7px;
  top: 7px;
  transition: 0.3s;

  & path {
    stroke: ${colors.midGrey};
  }
  :hover {
    & path {
      fill: ${colors.nevadaRed};
    }
  }
`
