import React, { useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Square from './Square';
import QuestionModal from './QuestionModal';
import { boardConfig } from '../data/boardConfig';
import { isValidMove } from '../utils/boardUtils';

const GameBoard: React.FC = () => {
  const { 
    gameState, 
    selectedPiece, 
    setSelectedPiece, 
    validMoves,
    calculateValidMoves,
    showQuestion,
    movePiece,
    currentPlayer
  } = useContext(GameContext);

  // Calculate valid moves when a piece is selected
  useEffect(() => {
    if (selectedPiece) {
      calculateValidMoves(selectedPiece);
    }
  }, [selectedPiece, calculateValidMoves]);

  const handleSquareClick = (row: number, col: number) => {
    // If there's a question showing, don't allow board interaction
    if (showQuestion) return;

    const clickedSquare = { row, col };
    const hasPiece = gameState.board[row][col].piece;
    
    // If a piece is already selected, try to move it
    if (selectedPiece) {
      const selectedPieceData = gameState.board[selectedPiece.row][selectedPiece.col].piece;
      if (!selectedPieceData) return;

      // Check if the clicked square is a valid move
      const isValidMoveTarget = isValidMove(
        selectedPiece,
        clickedSquare,
        selectedPieceData
      );
      
      if (isValidMoveTarget && validMoves.some(move => move.row === row && move.col === col)) {
        movePiece(selectedPiece, clickedSquare);
      } else if (hasPiece && hasPiece.player === currentPlayer) {
        // If clicking on another of our pieces, select that one instead
        setSelectedPiece(clickedSquare);
      } else {
        // Clicking elsewhere deselects
        setSelectedPiece(null);
      }
    } 
    // If no piece is selected and clicking on our own piece, select it
    else if (hasPiece && hasPiece.player === currentPlayer) {
      setSelectedPiece(clickedSquare);
    }
  };

  return (
    <div className="relative">
      {showQuestion && <QuestionModal />}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-9 grid-rows-9 board-shadow rounded-md overflow-hidden border-4 border-gray-800">
          {/* Column labels (a-h) */}
          <div className="bg-gray-700 text-white flex items-center justify-center font-bold">
            {/* Corner cell */}
          </div>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((col, i) => (
            <div key={`col-${i}`} className="bg-gray-700 text-white flex items-center justify-center font-bold">
              {col}
            </div>
          ))}

          {/* Board with row labels */}
          {gameState.board.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {/* Row label (1-8) */}
              <div className="bg-gray-700 text-white flex items-center justify-center font-bold">
                {8 - rowIndex}
              </div>
              
              {/* Squares in this row */}
              {row.map((square, colIndex) => (
                <Square
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  isBlack={(rowIndex + colIndex) % 2 === 1}
                  piece={square.piece}
                  sign={square.signId}
                  isSelected={
                    selectedPiece && 
                    selectedPiece.row === rowIndex && 
                    selectedPiece.col === colIndex
                  }
                  isValidMove={validMoves.some(
                    move => move.row === rowIndex && move.col === colIndex
                  )}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">
            {currentPlayer === 'A' ? 'Tim A' : 'Tim B'} Giliran
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;