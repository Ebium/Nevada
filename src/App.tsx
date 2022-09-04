import React, { useState } from "react"
import styled from "styled-components"
import * as R from "ramda"

const logo = require("./mygif.gif") as string

export const App = () => {
  const [currentPad, setCurrentPad] = useState({
    label: 0,
    nbHole: 0,
    orientation: 1,
  })

  var x = 0
  var y = 0

  const [boardArray, setboardArray] = useState(
    Array(10)
      .fill(0)
      .map(() => {
        x++
        return new Array(10).fill(0).map(() => {
          y++
          if (y === 11) {
            y = 1
          }
          return { x: x, y: y, isFilled: 0 }
        })
      })
  )

  const [padArray, setPadArray] = useState([
    { label: 1, nbHole: 6, values: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
    { label: 2, nbHole: 6, values: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
    { label: 3, nbHole: 6, values: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
    { label: 4, nbHole: 6, values: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
    { label: 1, nbHole: 4, values: { 1: 0, 2: 0, 3: 0, 4: 0 } },
    { label: 2, nbHole: 4, values: { 1: 0, 2: 0, 3: 0, 4: 0 } },
    { label: 3, nbHole: 4, values: { 1: 0, 2: 0, 3: 0, 4: 0 } },
    { label: 4, nbHole: 4, values: { 1: 0, 2: 0, 3: 0, 4: 0 } },
    { label: 5, nbHole: 4, values: { 1: 0, 2: 0, 3: 0, 4: 0 } },
    { label: 1, nbHole: 3, values: { 1: 0, 2: 0, 3: 0 } },
    { label: 2, nbHole: 3, values: { 1: 0, 2: 0, 3: 0 } },
    { label: 3, nbHole: 3, values: { 1: 0, 2: 0, 3: 0 } },
    { label: 4, nbHole: 3, values: { 1: 0, 2: 0, 3: 0 } },
    { label: 1, nbHole: 2, values: { 1: 0, 2: 0 } },
    { label: 2, nbHole: 2, values: { 1: 0, 2: 0 } },
    { label: 3, nbHole: 2, values: { 1: 0, 2: 0 } },
    { label: 4, nbHole: 2, values: { 1: 0, 2: 0 } },
  ])

  const changeCurrentPad = (nbTrous: number, orientation: number) => {
    setCurrentPad({ label: 0, nbHole: nbTrous, orientation: orientation })
  }

  const holdClick = (key: any) => {
    const updatedBoard = R.clone(boardArray)
    updatedBoard[key.x - 1][key.y - 1] = { x: key.x, y: key.y, isFilled: 1 }
    setboardArray(updatedBoard)
  }

  return (
    <Page>
      <ColumnStyle>
        <div>
          CurrentPad - Trous : {currentPad.nbHole} Orientation :{" "}
          {currentPad.orientation}
        </div>
        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(6, 1)
          }}
        >
          <ColumnStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
          </ColumnStyle>
        </Plaquette>

        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(4, 1)
          }}
        >
          <ColumnStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
          </ColumnStyle>
        </Plaquette>
        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(3, 1)
          }}
        >
          <ColumnStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
          </ColumnStyle>
        </Plaquette>

        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(2, 1)
          }}
        >
          <ColumnStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
          </ColumnStyle>
        </Plaquette>
      </ColumnStyle>
      <div>
        <HeightSpacer></HeightSpacer>
        <Board>
          {boardArray.map((key, index) =>
            key.map((key, index) => (
              <Cellule
                onClick={() => holdClick(key)}
                style={{ backgroundColor: key.isFilled ? "cyan" : "#D3D3D3" }}
              >
                {key.x},{key.y}
              </Cellule>
            ))
          )}
        </Board>
      </div>
    </Page>
  )
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  // background-image: url(${logo})
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const Board = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-content: center;
  height: fit-content;
  border: black 2px solid;
  padding: 1rem;
`
const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Cellule = styled.div`
  color: grey;
  background-color: #d3d3d3;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  border: 1px red solid;
`
const Plaquette = styled.div`
  cursor: pointer;
  border: grey 1px solid;
  border-radius: 10px;
  height: fit-content;
  width: fit-content;
  padding: 1rem;
  :hover {
    background-color: cyan;
  }
`
const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
`
const HeightSpacer = styled.div`
  height: 1rem;
`
