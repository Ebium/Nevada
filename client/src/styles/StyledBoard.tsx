import styled from "styled-components"

export const StyledBoard = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-content: center;
  height: fit-content;
  border: black 2px solid;
  box-shadow: 0px 0px 20px black;
  padding: 1rem;
  width: fit-content;
`