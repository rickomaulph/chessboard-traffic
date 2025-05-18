import { SquareData } from '../types/gameTypes';
import { boardConfig } from '../data/boardConfig';

export function initializeBoard(): SquareData[][] {
  const board: SquareData[][] = [];
  
  // Create empty board
  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      board[row][col] = {
        piece: null,
        signId: (row + col) % 2 === 0 ? boardConfig[row][col].sign : null
      };
    }
  }
  
  // Place Team A pieces (top two rows)
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 8; col++) {
      const isWhiteSquare = (row + col) % 2 === 0;
      board[row][col].piece = {
        player: 'A',
        id: row * 8 + col,
        onWhiteSquare: isWhiteSquare
      };
    }
  }
  
  // Place Team B pieces (bottom two rows)
  for (let row = 6; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isWhiteSquare = (row + col) % 2 === 0;
      board[row][col].piece = {
        player: 'B',
        id: (row - 6) * 8 + col,
        onWhiteSquare: isWhiteSquare
      };
    }
  }
  
  return board;
}

export function isValidMove(from: { row: number, col: number }, to: { row: number, col: number }, piece: { onWhiteSquare: boolean }): boolean {
  // Check if the move is within one square in any direction
  const rowDiff = Math.abs(from.row - to.row);
  const colDiff = Math.abs(from.col - to.col);
  
  // Check if target square is same color as piece's current square
  const toSquareIsWhite = (to.row + to.col) % 2 === 0;
  
  return rowDiff <= 1 && 
         colDiff <= 1 && 
         (rowDiff > 0 || colDiff > 0) && 
         toSquareIsWhite === piece.onWhiteSquare;
}

export function checkEndRowBonus(row: number, player: 'A' | 'B'): boolean {
  // Team A gets bonus for reaching row 7 (index 7)
  // Team B gets bonus for reaching row 0
  return (player === 'A' && row === 7) || (player === 'B' && row === 0);
}