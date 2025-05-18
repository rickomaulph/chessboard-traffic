import React, { createContext, useState, useCallback } from 'react';
import { 
  GameState, 
  PieceData, 
  Player, 
  Position, 
  QuestionData 
} from '../types/gameTypes';
import { initializeBoard, isValidMove, checkEndRowBonus } from '../utils/boardUtils';
import { whiteCards, blackCards } from '../data/questionCards';

// Randomly shuffle cards
const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface GameContextType {
  gameState: GameState;
  scores: { A: number; B: number };
  currentPlayer: Player;
  selectedPiece: Position | null;
  validMoves: Position[];
  showQuestion: boolean;
  currentCapture: { 
    position: Position; 
    isWhiteSquare: boolean;
    signImage?: string;
  } | null;
  currentQuestion: QuestionData | null;
  setSelectedPiece: (position: Position | null) => void;
  calculateValidMoves: (position: Position) => void;
  movePiece: (from: Position, to: Position) => void;
  answerQuestion: (answer: string | null) => void;
  updateScore: (player: Player, points: number) => void;
  endTurn: () => void;
  resetGame: () => void;
}

const defaultContext: GameContextType = {
  gameState: { 
    board: [], 
    whiteDeck: [], 
    blackDeck: [],
  },
  scores: { A: 10, B: 10 },
  currentPlayer: 'A',
  selectedPiece: null,
  validMoves: [],
  showQuestion: false,
  currentCapture: null,
  currentQuestion: null,
  setSelectedPiece: () => undefined,
  calculateValidMoves: () => undefined,
  movePiece: () => undefined,
  answerQuestion: () => undefined,
  updateScore: () => undefined,
  endTurn: () => undefined,
  resetGame: () => undefined
};

export const GameContext = createContext<GameContextType>(defaultContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    return {
      board: initializeBoard(),
      whiteDeck: shuffleArray(whiteCards),
      blackDeck: shuffleArray(blackCards)
    };
  });
  
  const [scores, setScores] = useState({ A: 10, B: 10 });
  const [currentPlayer, setCurrentPlayer] = useState<Player>('A');
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentCapture, setCurrentCapture] = useState<{
    position: Position;
    isWhiteSquare: boolean;
    signImage?: string;
  } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [secondChance, setSecondChance] = useState(false);

  // Calculate valid moves for a piece
  const calculateValidMoves = useCallback((position: Position) => {
    const { row, col } = position;
    const piece = gameState.board[row][col].piece;
    if (!piece) return;
    
    const possibleMoves: Position[] = [];
    
    // Check all 8 surrounding squares
    for (let r = Math.max(0, row - 1); r <= Math.min(7, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(7, col + 1); c++) {
        // Skip the current position
        if (r === row && c === col) continue;
        
        const targetSquare = gameState.board[r][c];
        
        // Check if move is valid based on color rules
        if (isValidMove({ row, col }, { row: r, col: c }, piece)) {
          // Square is empty or has an opponent's piece
          if (!targetSquare.piece || targetSquare.piece.player !== currentPlayer) {
            possibleMoves.push({ row: r, col: c });
          }
        }
      }
    }
    
    setValidMoves(possibleMoves);
  }, [gameState.board, currentPlayer]);

  // Move a piece
  const movePiece = useCallback((from: Position, to: Position) => {
    const piece = gameState.board[from.row][from.col].piece;
    if (!piece) return;
    
    const targetSquare = gameState.board[to.row][to.col];
    const isWhiteSquare = (to.row + to.col) % 2 === 0;
    
    // If target has an opponent's piece, initiate capture
    if (targetSquare.piece && targetSquare.piece.player !== currentPlayer) {
      setCurrentCapture({
        position: to,
        isWhiteSquare,
        signImage: isWhiteSquare ? gameState.board[to.row][to.col].signId : undefined
      });
      
      // Draw a question
      if (isWhiteSquare) {
        setCurrentQuestion({
          question: "Apa nama rambu lalu lintas ini?",
          options: ["Pilihan 1", "Pilihan 2", "Pilihan 3", "Pilihan 4"],
          correct: "Pilihan 1",
          hint: "Rambu ini sering ditemui di persimpangan."
        });
      } else {
        const question = gameState.blackDeck[0];
        setCurrentQuestion(question);
        
        setGameState(prev => ({
          ...prev,
          blackDeck: [...prev.blackDeck.slice(1), prev.blackDeck[0]]
        }));
      }
      
      setShowQuestion(true);
    } else {
      // Move to empty square
      const newBoard = [...gameState.board];
      
      // Remove piece from original position
      newBoard[from.row][from.col] = {
        ...newBoard[from.row][from.col],
        piece: null
      };
      
      // Place piece in new position
      newBoard[to.row][to.col] = {
        ...newBoard[to.row][to.col],
        piece: {
          ...piece,
          onWhiteSquare: isWhiteSquare
        }
      };
      
      setGameState(prev => ({
        ...prev,
        board: newBoard
      }));

      // Check for end row bonus
      if (checkEndRowBonus(to.row, piece.player)) {
        updateScore(piece.player, 1);
      }
      
      setSelectedPiece(null);
      setValidMoves([]);
      endTurn();
    }
  }, [gameState, currentPlayer]);

  // Update score
  const updateScore = useCallback((player: Player, points: number) => {
    setScores(prev => ({
      ...prev,
      [player]: Math.max(0, prev[player] + points)
    }));
  }, []);

  // Handle question answering
  const answerQuestion = useCallback((answer: string | null) => {
    if (!currentCapture || !currentQuestion) return;
    
    const isCorrect = answer === currentQuestion.correct;
    
    if (isCorrect) {
      // Successful capture
      const { position: to } = currentCapture;
      const from = selectedPiece!;
      const piece = gameState.board[from.row][from.col].piece;
      
      const newBoard = [...gameState.board];
      
      // Remove piece from original position
      newBoard[from.row][from.col] = {
        ...newBoard[from.row][from.col],
        piece: null
      };
      
      // Place piece in captured position
      newBoard[to.row][to.col] = {
        ...newBoard[to.row][to.col],
        piece: piece
      };
      
      setGameState(prev => ({
        ...prev,
        board: newBoard
      }));
      
      // Continue player's turn
      setSelectedPiece(to);
      calculateValidMoves(to);
    } else if (currentCapture.isWhiteSquare && !secondChance) {
      // For white capture, draw a second chance card
      const question = gameState.whiteDeck[0];
      
      setCurrentQuestion(question);
      setSecondChance(true);
      
      // Remove the card from the deck and add to the end
      setGameState(prev => ({
        ...prev,
        whiteDeck: [...prev.whiteDeck.slice(1), prev.whiteDeck[0]]
      }));
    } else {
      // Failed capture
      setSelectedPiece(null);
      setValidMoves([]);
      endTurn();
    }
    
    setShowQuestion(false);
    setCurrentCapture(null);
    setCurrentQuestion(null);
    
    if (secondChance) {
      setSecondChance(false);
    }
  }, [gameState, currentCapture, currentQuestion, selectedPiece, secondChance, calculateValidMoves]);

  // End current player's turn
  const endTurn = useCallback(() => {
    setCurrentPlayer(prev => prev === 'A' ? 'B' : 'A');
    setSelectedPiece(null);
    setValidMoves([]);
  }, []);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState({
      board: initializeBoard(),
      whiteDeck: shuffleArray(whiteCards),
      blackDeck: shuffleArray(blackCards)
    });
    setScores({ A: 10, B: 10 });
    setCurrentPlayer('A');
    setSelectedPiece(null);
    setValidMoves([]);
    setShowQuestion(false);
    setCurrentCapture(null);
    setCurrentQuestion(null);
    setSecondChance(false);
  }, []);

  const value = {
    gameState,
    scores,
    currentPlayer,
    selectedPiece,
    validMoves,
    showQuestion,
    currentCapture,
    currentQuestion,
    setSelectedPiece,
    calculateValidMoves,
    movePiece,
    answerQuestion,
    updateScore,
    endTurn,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};