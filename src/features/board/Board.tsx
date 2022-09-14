import { useNevadaSelector, useNevadaDispatch } from '../../app/hooks';


export const Boarda = () => {

  console.log("dedans")

  const test = useNevadaSelector((state) => state.board.array)
  console.log(test)

  return (<>

  </>)
}
