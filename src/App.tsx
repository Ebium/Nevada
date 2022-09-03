import React, { useState } from "react"
import styled from "styled-components"

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
  console.log(boardArray)

  const Cellule2 = () => {
    return <Cellule></Cellule>
  }

  return (
    <Content>
      <CenterContent>
        {boardArray.map((key, index) => (
          <Cellule2 />
          
        ))}
      </CenterContent>
    </Content>
  )
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;
`

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  border: red 1px solid;
  box-sizing: content-box;
  width: auto;
`

const Cellule = styled.div`
  background-color: grey;
  width: 2rem;
  height: 2rem;
  margin: 0.5rem;
`

const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
`
