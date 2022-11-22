import {KeyType} from "../components/Board"

export const changeColor = (key: KeyType, color: string)=>{
    if(key.holeFilled)
        return
    console.log(key)
    key.color = "grey"
    key.holeColor = color
}