import styled from "styled-components/macro"
import { NVLine } from "../../components/styles/NVLine"

export const TempGame = () => {
  const ta = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const tb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <Content>
      <Column>
        {ta.map(() => {
          return (
            <Row>
              {tb.map(() => {
                return (
                  <>
                    <NVLine height={4.5} width={4.5} />
                  </>
                )
              })}
            </Row>
          )
        })}
      </Column>
    </Content>
  )
}

const Content = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`
