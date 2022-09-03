import React, { useState } from "react"
import styled from "styled-components"

const logo = require("./mygif.gif") as string;

export const App = () => {
  interface OneTabElement {
    label: number
    value: number
  }

  const boardArrayPretab = Array<OneTabElement>(100).fill({
    value: 0,
    label: 0,
  })
  const [boardArray, setboardArray] = useState<OneTabElement[]>(
    boardArrayPretab.map((key, index) => {
      return { label: index + 1, value: 0 }
    })
  )

  const onDragStart = (ev: any, id: any) => {
    console.log("dragstart:", id)
    ev.dataTransfer.setData("id", id)
  }

  const onDragOver = (ev: any) => {
    ev.preventDefault()
    console.log("au dessus")
  }

  return (
    
    <Page>
      
      <Plaquette draggable onDragStart={(e) => onDragStart(e,5)}>
        <Cellule></Cellule>
        <Cellule></Cellule>
        <Cellule></Cellule>
      </Plaquette>
      
      <CenterContent>
        <Content>
          {boardArray.map((key, index) => (
            <Cellule
              onClick={() => console.log(index)}
              onDragOver={(e) => onDragOver(e)}
              onDrop={() => console.log("dropped")}
            ></Cellule>
          ))}
        </Content>
      </CenterContent>
    </Page>
  )
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  // background-image: url(${logo})
`
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-content: center;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
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
  background-color: grey;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  margin: 0.5rem;
`
const Plaquette = styled.div`
  border: grey 1px solid;
  border-radius: 10px;
  height: fit-content;
  width: fit-content;
  & ${Content} {
    background-color: red;
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
