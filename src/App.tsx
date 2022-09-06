import React, { useEffect, useState } from "react"
import styled from "styled-components"
import * as R from "ramda"

import { ReactComponent as Arrow } from "./assets/arrow-right.svg"

const logo = require("./assets/mygif.gif") as string

export const App = () => {
  const initialePadStore = [
    { left: 0, current: 0 },
    { left: 4, current: 0 },
    { left: 4, current: 0 },
    { left: 5, current: 0 },
    { left: 0, current: 0 },
    { left: 4, current: 0 },
  ]

  const [droppedPadCounter, setdroppedPadCounter] = useState(0)

  const [gameCanStart, setGameCanStart] = useState(false)

  useEffect(() => {
    if (droppedPadCounter === 17) {
      setGameCanStart(true)
    } else {
      if (gameCanStart) {
        setGameCanStart(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droppedPadCounter])

  const [padStore, setPadStore] = useState(initialePadStore)

  const updatePadStore = (padToUpdate: number, by: number) => {
    var updatedPadStore = R.clone(padStore)
    updatedPadStore[padToUpdate - 1].left =
      updatedPadStore[padToUpdate - 1].left + by
    setPadStore(updatedPadStore)
  }

  const [historyBoard, setHistoryBoard] = useState(Array<Array<any>>)

  const [currentPad, setCurrentPad] = useState({
    label: 0,
    nbHole: 0,
    orientation: 1,
    color: "",
  })

  var x = -1
  var y = -1

  const initialeBoardArray = Array(10)
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

  const [boardArray, setboardArray] = useState(initialeBoardArray)

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

  const handleClick = (key: any) => {
    if (currentPad.nbHole === 0 || key.isFilled === 1) return
    const padNum = currentPad.nbHole
    const updatedBoard = R.clone(boardArray)

    if (padStore[padNum - 1].left === 0) return
    if (padNum === 2) {
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

      historyBoard.push([
        [key.x, key.y],
        [ax, ay],
      ])
      setHistoryBoard(historyBoard)
    }

    if (padNum === 3) {
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

      historyBoard.push([
        [key.x, key.y],
        [ax1, ay1],
        [ax2, ay2],
      ])
      setHistoryBoard(historyBoard)
    }

    if (padNum === 4) {
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

      historyBoard.push([
        [key.x, key.y],
        [ax1, ay1],
        [ax2, ay2],
        [ax3, ay3],
      ])
      setHistoryBoard(historyBoard)
    }

    if (padNum === 6) {
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

      historyBoard.push([
        [key.x, key.y],
        [ax1, ay1],
        [ax2, ay2],
        [ax3, ay3],
        [ax4, ay4],
        [ax5, ay5],
      ])
      setHistoryBoard(historyBoard)
    }

    updatedBoard[key.x][key.y] = {
      x: key.x,
      y: key.y,
      isFilled: 1,
      color: currentPad.color,
    }

    updatePadStore(padNum, -1)
    setdroppedPadCounter(droppedPadCounter + 1)
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
    setboardArray(initialeBoardArray)
    setPadStore(initialePadStore)
    setdroppedPadCounter(0)
    setHistoryBoard([])
  }

  const undoBoard = () => {
    if (historyBoard.length === 0) return
    const updatedBoard = R.clone(boardArray)
    historyBoard[historyBoard.length - 1].map(
      (key) =>
        (updatedBoard[key[0]][key[1]] = initialeBoardArray[key[0]][key[1]])
    )
    updatePadStore(historyBoard[historyBoard.length - 1].length, +1)
    historyBoard.pop()
    setHistoryBoard(historyBoard)
    setboardArray(updatedBoard)
    setdroppedPadCounter(droppedPadCounter - 1)
  }

  const startGame = () => {
    console.log("game started")
  }

  return (
    <Page>
      <ColumnStyle>
        <HeightSpacer></HeightSpacer>
        <StyledButton onClick={() => changeOrientation()}>
          Change Orientation
        </StyledButton>
        <HeightSpacer></HeightSpacer>
        <StyledButton onClick={() => updatePadStore(1, 1)}>
          update pad
        </StyledButton>
        <HeightSpacer></HeightSpacer>
        <StyledButton onClick={() => resetBoard()}>reset Board</StyledButton>
        <HeightSpacer></HeightSpacer>
        <StyledButton onClick={() => undoBoard()}>Undo</StyledButton>
        <HeightSpacer></HeightSpacer>
        <StyledButton
        disabled={!gameCanStart}
        onClick={() => startGame()}>Start Game</StyledButton>
      </ColumnStyle>
      <ColumnStyle>
        <div>
          dropped pad : {droppedPadCounter} <br />
          CurrentPad - Trous : {currentPad.nbHole} <br /> Orientation :{" "}
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
        {padStore[5].left}

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
        {padStore[3].left}

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
        {padStore[2].left}

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
        {padStore[1].left}
      </ColumnStyle>
      <div>
        <HeightSpacer></HeightSpacer>
        board history
        {historyBoard.map((key, index) => {
          if (historyBoard.length === 0) return <></>
          else return <Cellule>{key}</Cellule>
        })}
      </div>
      <div>
        <HeightSpacer></HeightSpacer>
        <Board>
          {boardArray.map((key, index) =>
            key.map((key, index) => (
              <Cellule
                onClick={() => handleClick(key)}
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
  cursor: pointer;
  width: 5rem;
  height: 5rem;
`
