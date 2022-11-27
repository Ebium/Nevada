import { boardType } from "../store/ducks/Board.ducks";
import * as R from "ramda"


// Joue un coup remplissant le trou, et mettant une couleur, et ajoute dans movesHistory le coup joué
export const playMove = (cell: CellType, movesCount: number, movesHistory : Move[], boardArray: boardType) => {
    if(movesCount === 0 || cell.color === "orange"){
        if (!cell?.holeFilled) {
            const oldMove: Move = {
                x: cell.x,
                y: cell.y,
                holeColor: cell.holeColor,
                holeFilled: cell.holeFilled
            }
            const color = movesCount % 2 === 0 ? "red" : "blue"
    
            boardArray[cell.x][cell.y].holeFilled = true;
            boardArray[cell.x][cell.y].holeColor = color;
    
            const newMovesHistory = movesHistory
            newMovesHistory.push(oldMove)
    
            return {newMovesHistory : newMovesHistory, movesCount: movesCount + 1, boardArray: boardArray}
        }
    }
    return 
} 

// Renvoie le plateau avec des cases oranges sur lesquelles un pion peut être posé
export const showPossibleMoves = (cell: Coord, boardArray: boardType) => {
    let possibleMoves = 0
    const copy = R.clone(boardArray)
    for(let i = 0; i < 10; i++){
        const tmp = copy[cell.x][i]
        if(tmp.isFilled && !tmp.holeFilled){
            copy[cell.x][i].color = "orange"
            possibleMoves++
        }
    }
    for(let j = 0; j < 10; j++){
        const tmp = copy[j][cell.y]
        if(tmp.isFilled && !tmp.holeFilled){
            copy[j][cell.y].color = "orange"
            possibleMoves++

        }
    }
    copy[cell.x][cell.y].color = "lime"
    console.log("poss",possibleMoves)
    return {board: copy, possibleMoves: possibleMoves}
}

export const getPalette = (cell: CellType) => {
    console.log("")
}

export const removeOldPossibleMoves = (previousMove: Coord, boardArray: boardType, initalBoard: boardType) => {
    const copy = R.clone(boardArray)
    for(let i = 0; i < 10; i++){
        const tmp = copy[previousMove.x][i]
        if(tmp.isFilled){
            copy[previousMove.x][i].color = initalBoard[previousMove.x][i].color
        }
    }
    for(let j = 0; j < 10; j++){
        const tmp = copy[j][previousMove.y]
        if(tmp.isFilled){
            copy[j][previousMove.y].color = initalBoard[j][previousMove.y].color
        }
    }
    return copy

    
}


export interface CellType {
    isFilled: boolean,
    color: any,
    x: number,
    y: number,
    holeColor: string,
    holeFilled: boolean,
}

export interface Move {
    x: number,
    y: number,
    holeColor: string,
    holeFilled: boolean,
}

export interface Coord {
    x: number,
    y: number,
}
