import styled from "styled-components"
import { useNevadaSelector, useNevadaDispatch } from "../../app/hooks"
import { Board } from "../../styles/StyledBoard"

export const BoardFeature = () => {
  console.log("dedans")

  const boardArray = useNevadaSelector((state) => state.board.array)
  const gameCanStart = useNevadaSelector((state) => state.game.started)
  console.log(boardArray)

  return (
    <>
      <Board>
        {boardArray.map((key) =>
          key.map((key: { isFilled: any; color: any; x: any; y: any }) => (
            <Cellule
              onClick={() => handleClick(key)}
              style={{
                backgroundColor: key.isFilled
                  ? key.color
                  : gameCanStart
                  ? "transparent"
                  : "#D3D3D3",
                border:
                  gameCanStart && !key.isFilled ? "none" : "1px red solid",
              }}
            >
              {key.isFilled ? (
                <HoleForCellule></HoleForCellule>
              ) : (
                <>
                  {key.x},{key.y}
                </>
              )}
            </Cellule>
          ))
        )}
      </Board>
    </>
  )
}

const Cellule = styled.div`
  color: grey;
  background-color: #d3d3d3;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  border: 1px red solid;
`
const HoleForCellule = styled.div`
  width: 2rem;
  height: 2rem;
  border: 1px red solid;
  border-radius: 2rem;
  background-color: red;
`

function handleClick(key: { isFilled: any; color: any; x: any; y: any }): void {
  throw new Error("Function not implemented.")
}
