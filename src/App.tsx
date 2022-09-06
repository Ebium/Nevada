import React, { useState } from "react"
import styled from "styled-components"
import * as R from "ramda"

import { ReactComponent as Arrow } from "./assets/arrow-right.svg"

const logo = require("./assets/mygif.gif") as string

export const App = () => {


  // {till: 4, current: 1}
  const [padof2, setPadof2] = useState(4)
  const [padof3, setPadof3] = useState(4)
  const [padof4, setPadof4] = useState(5)
  const [padof6, setPadof6] = useState(4)

  const [currentPad, setCurrentPad] = useState({
    label: 0,
    nbHole: 0,
    orientation: 1,
    color: "",
  })

  var x = -1
  var y = -1

  const [boardArray, setboardArray] = useState(
    Array(10)
      .fill(0)
      .map(() => {
        x++
        return new Array(10).fill(0).map(() => {
          y++
          if (y === 10) {
            y = 0
          }
          return { x: x, y: y, isFilled: 0, color: "" }
        })
      })
  )

  const [originalBoardArray, useless1] = useState(R.clone(boardArray))

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

  const changeCurrentPad = (
    nbTrous: number,
    orientation: number,
    color: string
  ) => {
    setCurrentPad({
      label: 0,
      nbHole: nbTrous,
      orientation: orientation,
      color: color,
    })
  }

  const holdClick = (key: any) => {
    if (currentPad.nbHole === 0 || key.isFilled === 1) return

    const updatedBoard = R.clone(boardArray)

    if (currentPad.nbHole === 2) {
      if (padof2 === 0) return

      const ax = [key.x, key.x + 1, key.x, key.x - 1][
        currentPad.orientation - 1
      ]
      const ay = [key.y + 1, key.y, key.y - 1, key.y][
        currentPad.orientation - 1
      ]

      if (boardArray[ax][ay].isFilled) return

      switch (currentPad.orientation) {
        case 1:
          if (key.y === 9) return
          break
        case 2:
          if (key.x === 9) return
          break
        case 3:
          if (key.y === 0) return
          break
        case 4:
          if (key.x === 0) return
          break
      }

      updatedBoard[ax][ay] = {
        x: ax,
        y: ay,
        isFilled: 1,
        color: currentPad.color,
      }
      setPadof2(padof2 - 1)
    }

    if (currentPad.nbHole === 3) {
      if (padof3 === 0) return

      const ax1 = [key.x, key.x + 1, key.x, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax2 = [key.x, key.x + 2, key.x, key.x - 2][
        currentPad.orientation - 1
      ]
      const ay1 = [key.y + 1, key.y, key.y - 1, key.y][
        currentPad.orientation - 1
      ]
      const ay2 = [key.y + 2, key.y, key.y - 2, key.y][
        currentPad.orientation - 1
      ]

      if (boardArray[ax1][ay1].isFilled || boardArray[ax2][ay2].isFilled) return

      switch (currentPad.orientation) {
        case 1:
          if ([8, 9].includes(key.y)) return
          break
        case 2:
          if ([8, 9].includes(key.x)) return
          break
        case 3:
          if ([0, 1].includes(key.y)) return
          break
        case 4:
          if ([0, 1].includes(key.x)) return
          break
      }

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: 1,
        color: currentPad.color,
      }

      setPadof3(padof3 - 1)
    }

    if (currentPad.nbHole === 4) {
      if (padof4 === 0) return

      const ax1 = [key.x, key.x, key.x, key.x][currentPad.orientation - 1]
      const ax2 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax3 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ay1 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay2 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay3 = [key.y, key.y, key.y, key.y][currentPad.orientation - 1]

      if (
        boardArray[ax1][ay1].isFilled ||
        boardArray[ax2][ay2].isFilled ||
        boardArray[ax3][ay3].isFilled
      )
        return

      switch (currentPad.orientation) {
        case 1:
          if (key.y === 9 || key.x === 9) return
          break
        case 2:
          if (key.x === 9 || key.y === 0) return
          break
        case 3:
          if (key.y === 0 || key.x === 0) return
          break
        case 4:
          if (key.x === 0 || key.y === 9) return
          break
      }

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax3][ay3] = {
        x: ax3,
        y: ay3,
        isFilled: 1,
        color: currentPad.color,
      }

      setPadof4(padof4 - 1)
    }

    if (currentPad.nbHole === 6) {
      if (padof6 === 0) return

      switch (currentPad.orientation) {
        case 1:
          if ([8, 9].includes(key.y) || key.x === 9) return
          break
        case 2:
          if ([8, 9].includes(key.x) || key.y === 0) return
          break
        case 3:
          if ([0, 1].includes(key.y) || key.x === 0) return
          break
        case 4:
          if ([0, 1].includes(key.x) || key.y === 9) return
          break
      }

      const ax1 = [key.x, key.x, key.x, key.x][currentPad.orientation - 1]
      const ax2 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax3 = [key.x + 1, key.x + 1, key.x - 1, key.x - 1][
        currentPad.orientation - 1
      ]
      const ax4 = [key.x, key.x + 2, key.x, key.x - 2][
        currentPad.orientation - 1
      ]
      const ax5 = [key.x + 1, key.x + 2, key.x - 1, key.x - 2][
        currentPad.orientation - 1
      ]
      const ay1 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay2 = [key.y + 1, key.y - 1, key.y - 1, key.y + 1][
        currentPad.orientation - 1
      ]
      const ay3 = [key.y, key.y, key.y, key.y][currentPad.orientation - 1]
      const ay4 = [key.y + 2, key.y, key.y - 2, key.y][
        currentPad.orientation - 1
      ]
      const ay5 = [key.y + 2, key.y - 1, key.y - 2, key.y + 1][
        currentPad.orientation - 1
      ]

      if (
        boardArray[ax1][ay1].isFilled ||
        boardArray[ax2][ay2].isFilled ||
        boardArray[ax3][ay3].isFilled ||
        boardArray[ax4][ay4].isFilled ||
        boardArray[ax5][ay5].isFilled
      )
        return

      updatedBoard[ax1][ay1] = {
        x: ax1,
        y: ay1,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax2][ay2] = {
        x: ax2,
        y: ay2,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax3][ay3] = {
        x: ax3,
        y: ay3,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax4][ay4] = {
        x: ax4,
        y: ay4,
        isFilled: 1,
        color: currentPad.color,
      }
      updatedBoard[ax5][ay5] = {
        x: ax5,
        y: ay5,
        isFilled: 1,
        color: currentPad.color,
      }
      setPadof6(padof6 - 1)
    }

    updatedBoard[key.x][key.y] = {
      x: key.x,
      y: key.y,
      isFilled: 1,
      color: currentPad.color,
    }

    setboardArray(updatedBoard)
  }

  const changeOrientation = () => {
    const setOrientation =
      currentPad.orientation === 4 ? 1 : currentPad.orientation + 1
    setCurrentPad({
      label: currentPad.label,
      nbHole: currentPad.nbHole,
      orientation: setOrientation,
      color: currentPad.color,
    })
  }

  const resetBoard = () => {
    setboardArray(originalBoardArray)
    setPadof2(4)
    setPadof3(4)
    setPadof4(5)
    setPadof6(4)
  }

  return (
    <Page>
      <StyledButton onClick={() => changeOrientation()}>
        Change Orientation
      </StyledButton>
      <StyledButton onClick={() => resetBoard()}>reset Board</StyledButton>
      <ColumnStyle>
        <div>
          CurrentPad - Trous : {currentPad.nbHole} Orientation :{" "}
          {currentPad.orientation}
        </div>
        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(6, 1, "salmon")
          }}
          className="p1"
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
        {padof6}

        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(4, 1, "blue")
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
        {padof4}

        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(3, 1, "yellow")
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
        {padof3}

        <HeightSpacer></HeightSpacer>

        <Plaquette
          onClick={() => {
            changeCurrentPad(2, 1, "green")
          }}
        >
          <ColumnStyle>
            <RowStyle>
              <Cellule></Cellule>
              <Cellule></Cellule>
            </RowStyle>
          </ColumnStyle>
        </Plaquette>
        {padof2}
      </ColumnStyle>
      <div>
        <HeightSpacer></HeightSpacer>
        <Board>
          {boardArray.map((key, index) =>
            key.map((key, index) => (
              <Cellule
                onClick={() => holdClick(key)}
                style={{
                  backgroundColor: key.isFilled ? key.color : "#D3D3D3",
                }}
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
  //background-image: url(${logo})
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
    box-shadow: 0px 0px 10px red;
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

const StyledButton = styled.button`
  width: 5rem;
  height: 5rem;
`
