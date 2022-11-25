import { boardType } from "../store/ducks/Board.ducks";

// Joue un coup remplissant le trou, et mettant une couleur, et ajoute dans movesHistory le coup joué
export const playMove = (cell: CellType, movesCount: number, movesHistory : Move[], boardArray: boardType) => {
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
    return 
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
