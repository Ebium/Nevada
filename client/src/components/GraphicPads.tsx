import styled from "styled-components/macro"
import { colors } from "./styles/design.config"

export const Pad2 = (props: { orientation: number }) => {
  return (
    <Plaquette nbHole={2} orientation={props.orientation}>
      {props.orientation ? (
        <RowS>
          <Cell right={13.5} />
          <Cell left={13.5} />
        </RowS>
      ) : (
        <ColumnS>
          <Cell bottom={13.5} />
          <Cell top={13.5} />
        </ColumnS>
      )}
    </Plaquette>
  )
}

export const Pad3 = (props: { orientation: number }) => {
  return (
    <Plaquette nbHole={3} orientation={props.orientation}>
      {props.orientation ? (
        <RowS>
          <Cell right={13.5} />
          <Cell right={13.5} left={13.5} />
          <Cell left={13.5} />
        </RowS>
      ) : (
        <ColumnS>
          <Cell bottom={13.5} />
          <Cell bottom={13.5} top={13.5} />
          <Cell top={13.5} />
        </ColumnS>
      )}
    </Plaquette>
  )
}

export const Pad4 = () => {
  return (
    <Plaquette nbHole={4}>
      <ColumnS>
        <RowS>
          <Cell right={13.5} bottom={13.5} />
          <Cell left={13.5} bottom={13.5} />
        </RowS>
        <RowS>
          <Cell right={13.5} top={13.5} />
          <Cell left={13.5} top={13.5} />
        </RowS>
      </ColumnS>
    </Plaquette>
  )
}

export const Pad6 = (props: { orientation: number }) => {
  return (
    <Plaquette nbHole={6} orientation={props.orientation}>
      {props.orientation ? (
        <ColumnS>
          <RowS>
            <Cell right={13.5} bottom={13.5} />
            <Cell right={13.5} left={13.5} bottom={13.5} />
            <Cell bottom={13.5} left={13.5} />
          </RowS>
          <RowS>
            <Cell right={13.5} top={13.5} />
            <Cell right={13.5} left={13.5} top={13.5} />
            <Cell top={13.5} left={13.5} />
          </RowS>
        </ColumnS>
      ) : (
        <RowS>
          <ColumnS>
            <Cell right={13.5} bottom={13.5} />
            <Cell right={13.5} top={13.5} bottom={13.5} />
            <Cell right={13.5} top={13.5} />
          </ColumnS>
          <ColumnS>
            <Cell left={13.5} bottom={13.5} />
            <Cell left={13.5} top={13.5} bottom={13.5} />
            <Cell left={13.5} top={13.5} />
          </ColumnS>
        </RowS>
      )}
    </Plaquette>
  )
}

interface PlaquetteProps {
  nbHole: number
  orientation?: number
}

const Plaquette = styled.div<PlaquetteProps>`
  position: relative;
  z-index: 1;
  top: ${({ nbHole, orientation }) => {
    if (orientation) {
      return nbHole === 6
        ? "36px"
        : nbHole === 4
        ? "36px"
        : nbHole === 3
        ? "0"
        : "0"
    }
    return nbHole === 6
      ? "72px"
      : nbHole === 4
      ? "36px"
      : nbHole === 3
      ? "72px"
      : "36px"
  }};
  left: ${({ nbHole, orientation }) => {
    if (orientation) {
      return nbHole === 6
        ? "72px"
        : nbHole === 4
        ? "36px"
        : nbHole === 3
        ? "72px"
        : "36px"
    }
    return nbHole === 6
      ? "36px"
      : nbHole === 4
      ? "36px"
      : nbHole === 3
      ? "0"
      : "0"
  }};
  border: 1px solid white;
  height: fit-content;
  width: fit-content;
  border-radius: 15px;
  background-color: ${colors.nevadaBlue};
`
const RowS = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnS = styled.div`
  display: flex;
  flex-direction: column;
`

interface CellProps {
  top?: number
  bottom?: number
  right?: number
  left?: number
}

const Cell = styled.div<CellProps>`
  height: 45px;
  width: 45px;
  border-radius: 45px;
  margin: ${({ top = 10.5, bottom = 10.5, left = 10.5, right = 10.5 }) =>
    `${top}px ${right}px ${bottom}px ${left}px`};
  box-shadow: 0px 0px 10px 2px black;
`
