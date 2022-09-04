import React, { useState } from "react"
import styled from "styled-components"

const logo = require("./mygif.gif") as string

export const App = () => {
  interface boardInterface {
    label: number
    value: number
  }
  interface padInterface {
    label: number
    nbHole: number
    values: {}
  }

  const boardArrayPretab = Array<boardInterface>(100).fill({
    value: 0,
    label: 0,
  })
  const [boardArray, setboardArray] = useState<boardInterface[]>(
    boardArrayPretab.map((key, index) => {
      return { label: index + 1, value: 0 }
    })
  )

  const padArray: padInterface[] = [
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
  ]

  const onDragStart = (label: any, nbHole: any, ev: any) => {
    console.log("current pad : label " + label +" - trous "+ nbHole)
    console.log(ev)
    ev.dataTransfer.setData("data", nbHole)
  }

  const onDragOver = (ev: any) => {
    ev.preventDefault()
    console.log("au dessus")
  }

  const onDrop = (ev: any, index: any) => {
    let data = Number(ev.dataTransfer.getData("data"))
    console.log(typeof(data))
    if ([2,3].includes(data) || ([4,6].includes(data) && index > 10)) console.log("ah")
    const updatedBoard = boardArray.map( x => { return {...x}} ) //deep copy of the board to change states
    updatedBoard[index].value = 1
    setboardArray(updatedBoard)

  }

  return (
    <Page>
      <ColumnStyle>
        {padArray.map((key, index) => {
          if (key.nbHole === 6) {
            return (
              <Plaquette draggable onDragStart={(e) => onDragStart(key.label, key.nbHole, e)}>
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
            )
          } else if (key.nbHole === 4) {
            return (
              <Plaquette draggable onDragStart={(e) => onDragStart(key.label, key.nbHole, e)}>
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
            )
          } else if (key.nbHole === 3) {
            return (
              <Plaquette draggable onDragStart={(e) => onDragStart(key.label, key.nbHole, e)}>
                <ColumnStyle>
                  <RowStyle>
                    <Cellule></Cellule>
                    <Cellule></Cellule>
                    <Cellule></Cellule>
                  </RowStyle>
                </ColumnStyle>
              </Plaquette>
            )
          } else if (key.nbHole === 2) {
            return (
              <Plaquette draggable onDragStart={(e) => onDragStart(key.label, key.nbHole, e)}>
                <ColumnStyle>
                  <RowStyle>
                    <Cellule></Cellule>
                    <Cellule></Cellule>
                  </RowStyle>
                </ColumnStyle>
              </Plaquette>
            )
          }
          return <></>
        })}

        {/* <Plaquette draggable onDragStart={(e) => onDragStart(key.label, key.nbHole)}>
        <ColumnStyle>
          <Cellule></Cellule>
          <Cellule></Cellule>
          <Cellule></Cellule>
        </ColumnStyle>
      </Plaquette> */}
      </ColumnStyle>
      <Board>
        {boardArray.map((key, index) => (
          <Cellule
            onClick={() => console.log(key.label)}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, index)}
            style={{ backgroundColor: key.value ? "red" : "currentcolor" }}
          ></Cellule>
        ))}
      </Board>
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
  background-color: grey;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  margin: 1rem;
`
const Plaquette = styled.div`
  border: grey 1px solid;
  border-radius: 10px;
  height: fit-content;
  width: fit-content;
`
const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
`
