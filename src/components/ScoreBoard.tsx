import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const ScoreBoard: React.FC = () => {
  const { scores, currentPlayer, gameState, resetGame } = useContext(GameContext);
  
  // Count remaining pieces for each player
  const piecesCount = {
    A: 0,
    B: 0
  };
  
  gameState.board.forEach(row => {
    row.forEach(square => {
      if (square.piece) {
        piecesCount[square.piece.player]++;
      }
    });
  });

  // Check for game over condition
  const isGameOver = scores.A <= 0 || scores.B <= 0 || piecesCount.A === 0 || piecesCount.B === 0;
  
  // Determine winner
  let winner = null;
  if (isGameOver) {
    if (scores.A <= 0 || piecesCount.A === 0) {
      winner = 'B';
    } else if (scores.B <= 0 || piecesCount.B === 0) {
      winner = 'A';
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Score Board</h2>
      
      {/* Team A */}
      <div className={`mb-4 p-3 rounded-md ${currentPlayer === 'A' ? 'bg-red-100 border-l-4 border-red-500' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-red-700">Team A</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-red-700 text-white px-2 py-1 rounded">
              {piecesCount.A} pieces
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-2xl font-bold">{scores.A}</div>
          <div className="text-sm text-gray-600">points</div>
        </div>
      </div>
      
      {/* Team B */}
      <div className={`mb-4 p-3 rounded-md ${currentPlayer === 'B' ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-blue-700">Team B</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-700 text-white px-2 py-1 rounded">
              {piecesCount.B} pieces
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-2xl font-bold">{scores.B}</div>
          <div className="text-sm text-gray-600">points</div>
        </div>
      </div>
      
      {/* Game Status */}
      <div className="bg-gray-100 p-3 rounded-md mb-4">
        <h3 className="font-semibold mb-1">Game Status</h3>
        <p className="text-sm">
          {isGameOver 
            ? `Game Over! Team ${winner} wins!` 
            : `Team ${currentPlayer}'s turn`}
        </p>
      </div>

      {/* Game Actions */}
      <div className="flex flex-col gap-2">
        {isGameOver && (
          <button 
            onClick={resetGame}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            Play Again
          </button>
        )}
        <button 
          onClick={() => window.location.reload()}
          className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;