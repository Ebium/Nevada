import { boardType } from "../store/ducks/Board.ducks"
import * as R from "ramda"
import { ReactNode } from "react"

// Joue un coup remplissant le trou, et mettant une couleur, et ajoute dans movesHistory le coup joué
export const playMove = (
  cell: CellType,
  movesCount: number,
  movesHistory: Move[],
  boardArray: boardType,
  pads: Pad[]
) => {
  if (movesCount === 0 || (!cell.disabled && cell.possibleMove)) {
    if (!cell?.holeFilled) {
      const oldMove: Move = {
        x: cell.x,
        y: cell.y,
        holeColor: cell.holeColor,
        holeFilled: cell.holeFilled,
      }
      //comptage de point simple
      let color
      const coo: Coord = {
        x: cell.x,
        y: cell.y,
      }
      let indi = getPadIndex(coo, pads)

      //tableau de coordonnées, vides ou pleines (rouge ou bleu)

      if (indi === -1) {
        console.log(
          "Erreur dans l'incrémentation du nombre de pions sur la tuile"
        )
      } else {
        if (movesCount % 2 === 0) {
          color = "red"
          pads[indi].firstPlayerCounter += 1

          //tableau de coordonnées des pions rouge placés
          //tri tableau
        } else {
          color = "blue"
          pads[indi].secondPlayerCounter += 1

          //tableau de coordonnées des pions bleu placés
          //tri tableau
        }
      }

      //sol 2
      //ajouter un stockage des coordonnées des pions placés pour chaque couleur afin de pouvoir parcourir les 2 listes (rouge et bleu)
      //parcourir la liste pour voir le nombre de pions limitrophes

      //sol 3
      //diagonale en plus

      /*movesCount % 2 === 0 ? "red" : "blue"*/

      boardArray[cell.x][cell.y].holeFilled = true
      boardArray[cell.x][cell.y].holeColor = color

      const newMovesHistory = movesHistory
      newMovesHistory.push(oldMove)

      return {
        newMovesHistory: newMovesHistory,
        movesCount: movesCount + 1,
        boardArray: boardArray,
      }
    }
  }
  return
}

//Renvoie le plateau avec les coups possibles
export const showPossibleMoves = (cell: Coord, boardArray: boardType) => {
  let possibleMoves = 0

  const copy = R.clone(boardArray)
  for (let y = 0; y < 10; y++) {
    const tmpCell = copy[cell.x][y]
    if (tmpCell.isFilled && !tmpCell.holeFilled && !tmpCell.disabled) {
      copy[cell.x][y].possibleMove = true
      possibleMoves++
    }
  }
  for (let x = 0; x < 10; x++) {
    const tmpCell = copy[x][cell.y]
    if (tmpCell.isFilled && !tmpCell.holeFilled && !tmpCell.disabled) {
      copy[x][cell.y].possibleMove = true
      possibleMoves++
    }
  }

  return { board: copy, possibleMoves: possibleMoves }
}

// Retourne la grille sans les coups possibles de l'ancien coup
export const removeOldPossibleMoves = (
  previousMove: Coord,
  boardArray: boardType
) => {
  const copy = R.clone(boardArray)
  for (let y = 0; y < 10; y++) {
    const tmpCell = copy[previousMove.x][y]
    if (tmpCell.isFilled) {
      copy[previousMove.x][y].possibleMove = false
    }
  }
  for (let x = 0; x < 10; x++) {
    const tmpCell = copy[x][previousMove.y]
    if (tmpCell.isFilled) {
      copy[x][previousMove.y].possibleMove = false
    }
  }
  return copy
}

// Retourne l'indice de la palette sur laquelle est 'cell' sinon retourne -1
export const getPadIndex = (cell: Coord, pads: Pad[]) => {
  for (let index = 0; index < pads.length; index++) {
    let pad = pads[index]
    if (pad.xCoords.includes(cell.x) && pad.yCoords.includes(cell.y)) {
      return index
    }
  }
  return -1
}

// Désactive une plaquette/palette/pad
// Rend les cases de la palettes noirs
export const disablePads = (
  boardArray: boardType,
  index: number | undefined,
  pads: Pad[]
) => {
  const copy = R.clone(boardArray)
  if (index !== undefined) {
    let pad = pads[index]
    if (pad) {
      pad.xCoords.forEach((x) => {
        pad.yCoords.forEach((y) => {
          copy[x][y].disabled = true
        })
      })
    }
  }
  return copy
}

export const enablePads = (
  boardArray: boardType,
  index: number | undefined,
  pads: Pad[]
) => {
  const copy = R.clone(boardArray)
  if (index !== undefined) {
    let pad = pads[index]
    pad.xCoords.forEach((x) => {
      pad.yCoords.forEach((y) => {
        copy[x][y].disabled = false
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
  isFilled: boolean
  color: any
  x: number
  y: number
  holeColor: string
  holeFilled: boolean
  disabled: boolean
  possibleMove: boolean
}

/* Interface d'un coup joué : utilisé pour le dernier coup joué
 * x: coordonnée x de la case
 * y: coordonnée y de la case
 * holeColor: couleur du trou
 * holeFilled: permet de savoir si le trou est rempli
 */
export interface Move {
  x: number
  y: number
  holeColor: string
  holeFilled: boolean
}

/* Interface d'une Coordonné
 * x: coordonnée x de la case
 * y: coordonnée y de la case
 */
export interface Coord {
  x: number
  y: number
}

/* Interface de l'historique des Pad/Palettes mises sur le plateau
 * Une palette a différent coordonnées sous formes de tableau [x1, y1], [x2, y2] ... ainsi de suite
 * coord : tableau des différentes coordonnées des palettes [[p1: [x1, y1], [x2, y2]], p2: [[x1, y1], [x2, y2]]]
 * avec pn l'indice de la palette dans le tableau
 */
export interface PadHistory {
  coord: number[][]
}

/* Interface d'un Pad/Palette
 * xCoords: contient toutes les coordonnées x du Pad/Palette
 * yCoords: contient toutes les coordonnées y du Pad/Palette
 * firstPlayerCounter: contient le nombre de boules du Premier joueur de la palette
 * secondPlayerCounter: contient le nombre de boules du Deuxième joueur de la palette
 */
export interface Pad {
  xCoords: number[]
  yCoords: number[]
  firstPlayerCounter: number
  secondPlayerCounter: number
}

export interface GraphicPad {
  x: number
  y: number
  compo: ReactNode
}

/* Interface d'une palette graphique (graphique = avec du design)
 * x: coordonnée x de la case
 * y: coordonnée y de la case
 * compo: component correspondant à une palette designée
 */
