import React from "react";
import styled from "styled-components";

export const App = () => {

  const Cellule2 = () => {
    return (
      <Cellule>
      </Cellule>
    )
  }

  return (
    <Content>
      <CenterContent>
        <Cellule2 />
      </CenterContent>
    </Content>
  );
};


const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;

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