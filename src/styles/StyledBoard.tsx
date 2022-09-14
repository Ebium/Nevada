import styled from "styled-components"

const boardBackground = require("../assets/board-background.png") as string

export const Board = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-content: center;
  height: fit-content;
  border: cyan 2px solid;
  box-shadow: 0px 0px 20px cyan;
  padding: 1rem;
  background-image: url(${boardBackground});
`