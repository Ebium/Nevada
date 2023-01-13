import styled from "styled-components/macro"
import { ReactComponent as CloseCross } from "../assets/close_cross.svg"
import { colors } from "./styles/design.config"
import { NVText } from "./styles/NVText"
import { useIntl } from "react-intl"
import { NVButton } from "./styles/NVButton"
import { useNavigate } from "react-router-dom"
import { NVSpacer } from "./styles/NVSpacer"

interface EndProps {
  isDisplayed: boolean
  winner: string
  onClose: () => void
}

//Modal s'affichant à la fin de la partie pour signaler qui est le gagnant
export const EndGameModal = ({ isDisplayed, onClose, winner }: EndProps) => {
  const intl = useIntl()
  const navigate = useNavigate()
  return (
    <>
      <Content isDisplayed={isDisplayed}>
        <TheCard>
          <NVText
            text={intl.formatMessage(
              {
                id: winner !== "" ? "endmodal.winner" : "endmodal.equals",
              },
              {
                data: winner,
              }
            )}
            textStyle={{
              color: "white",
            }}
          />
          <NVSpacer />
          <NVButton
            disabled={false}
            content={"Retour à l'accueil"}
            colorSchem={"black"}
            onClick={() => {
              navigate("/main/home")
            }}
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
