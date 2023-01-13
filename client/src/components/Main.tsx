import { Outlet } from "react-router-dom"
import styled from "styled-components/macro"
import { Background } from "./Background"
import { NevadaHeader } from "./NevadaHeader"

export const Main = () => {
  return (
    <Background centeredTop={false} padding={0}>
      <Page>
        <NevadaHeader />
        <Content>
          <Outlet />
        </Content>
      </Page>
    </Background>
  )
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  
`
