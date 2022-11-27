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
// colorie en oranges les cases sur lesquelles peut jouer l'adversaire 
// à changer ???? parce que la possibilité de jouer se fait par couleurµ
// solution rajouter un autre boolean sur une case puis changer la couleur au render du composant ?
// pb rajout de ligne mais c'est mieux ?
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

// Retourne la grille sans les coups possibles de l'ancien coup,
// Remet seulement les couleurs du plateau initiale par rapport au coup possible de l'ancien coup 
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

// Retourne l'indice de la palette sur laquelle est 'cell' sinon retourne -1
export const getPadIndex = (cell: CellType, pads: Pad[]) => {
    pads.forEach((pad, index) => {
        // si cell.x et cell.y sont contenues dans les coordonnées x ET y de la palette, cela veut dire que cell contient la palette
        if(pad.xCoords.includes(cell.x) && pad.yCoords.includes(cell.y)){
            console.log(index)
            return index
        }
    })
    return -1
}

export const disablePads = (boardArray: boardType, disabledIndexPads: number[], pads: Pad[]) => {
    const copy = R.clone(boardArray)
    for(let index = 0; index < disabledIndexPads.length; index++){
        console.log(pads)
        let pad = pads[index]
        pad.xCoords.forEach((x) => {
            pad.yCoords.forEach((y) => {
                copy[x][y].color = "black"
            })
        })
    }
    return copy
}


export const enablePads = (boardArray: boardType, disabledIndexPads: number[], pads: Pad[]) => {
    const copy = R.clone(boardArray)
    for(let index = 0; index < disabledIndexPads.length; index++){
        let pad = pads[index]
        pad.xCoords.forEach((x) => {
            pad.yCoords.forEach((y) => {
                copy[x][y].color = "black"
            })
        })
    }
    return copy
}

/* Interface d'une cellule/carré/case
 * isFilled: permet de savoir si une case du plateau contient une case
 * color: couleur de la case
 * x: coordonnée x de la case 
 * y: coordonnée y de la case 
 * holeColor: couleur du trou
 * holeFilled: permet de savoir si le trou est rempli
 */
export interface CellType {
    isFilled: boolean,
    color: any,
    x: number,
    y: number,
    holeColor: string,
    holeFilled: boolean,
}

/* Interface d'un coup joué : utilisé pour le dernier coup joué
 * x: coordonnée x de la case 
 * y: coordonnée y de la case 
 * holeColor: couleur du trou
 * holeFilled: permet de savoir si le trou est rempli
 */
export interface Move {
    x: number,
    y: number,
    holeColor: string,
    holeFilled: boolean,
}

/* Interface d'une Coordonné
 * x: coordonnée x de la case 
 * y: coordonnée y de la case
 */
export interface Coord {
    x: number,
    y: number,
}

/* Interface de l'historique des Pad/Palettes mises sur le plateau
 * Une palette a différent coordonnées sous formes de tableau [x1, y1], [x2, y2] ... ainsi de suite
 * coord : tableau des différentes coordonnées des palettes [[p1: [x1, y1], [x2, y2]], p2: [[x1, y1], [x2, y2]]]
 * avec pn l'indice de la palette dans le tableau
 */
export interface PadHistory {
    coord: number[][];
}

/* Interface d'un Pad/Palette
 * xCoords: contient toutes les coordonnées x du Pad/Palette
 * yCoords: contient toutes les coordonnées y du Pad/Palette
 * firstPlayerCounter: contient le nombre de boules du Premier joueur de la palette
 * secondPlayerCounter: contient le nombre de boules du Deuxième joueur de la palette
 */
export interface Pad {
    xCoords: number[],
    yCoords: number[],
    firstPlayerCounter: number,
    secondPlayerCounter: number,
}

