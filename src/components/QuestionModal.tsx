import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { whiteCards, blackCards } from '../data/questionCards';

const QuestionModal: React.FC = () => {
  const { 
    currentQuestion, 
    currentCapture, 
    answerQuestion, 
    updateScore, 
    currentPlayer, 
    endTurn
  } = useContext(GameContext);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [showHint, setShowHint] = useState(false);
  
  const isWhiteSquare = currentCapture?.isWhiteSquare;
  const questionDeck = isWhiteSquare ? whiteCards : blackCards;
  const question = currentQuestion 
    ? currentQuestion 
    : { question: 'Loading...', options: [], correct: '', hint: '' };

  // Timer effect
  useEffect(() => {
    if (remainingTime <= 0) {
      handleTimeUp();
      return;
    }
    
    const timer = setTimeout(() => {
      setRemainingTime(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [remainingTime]);

  const handleTimeUp = () => {
    setShowFeedback(true);
    updateScore(currentPlayer, -1);
    
    // After 2 seconds, end turn
    setTimeout(() => {
      answerQuestion(null);
      endTurn();
    }, 2000);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === question.correct;
    
    if (isCorrect) {
      // Correct answer - handle capture success
      setTimeout(() => {
        answerQuestion(answer);
      }, 1500);
    } else {
      // Wrong answer
      if (isWhiteSquare) {
        updateScore(currentPlayer, -1);
        // For white square, draw a card (second chance)
        setTimeout(() => {
          answerQuestion(answer);
        }, 1500);
      } else {
        // For black square, lose point and end turn
        updateScore(currentPlayer, -1);
        setTimeout(() => {
          answerQuestion(null);
          endTurn();
        }, 1500);
      }
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    updateScore(currentPlayer, -1); // Pay 1 point for a hint
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md animate-fade-in p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isWhiteSquare ? 'Traffic Sign Question' : 'Traffic Knowledge Question'}
          </h2>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {remainingTime}s
          </div>
        </div>
        
        {isWhiteSquare && currentCapture?.signImage && (
          <div className="mb-4 flex justify-center">
            <img 
              src={`/signs/${currentCapture.signImage}.png`} 
              alt="Traffic Sign" 
              className="h-32 object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/120?text=Sign';
              }}
            />
          </div>
        )}
        
        <p className="text-lg mb-4">{question.question}</p>
        
        {showHint && question.hint && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4">
            <p className="text-sm">{question.hint}</p>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              disabled={showFeedback}
              className={`w-full p-3 text-left rounded-md border ${
                showFeedback && option === question.correct
                  ? 'bg-green-100 border-green-500'
                  : showFeedback && option === selectedAnswer
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        
        {!showFeedback && !showHint && question.hint && (
          <button
            onClick={handleShowHint}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Use hint (-1 point)
          </button>
        )}
        
        {showFeedback && (
          <div className={`p-3 rounded-md ${
            selectedAnswer === question.correct 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {selectedAnswer === question.correct 
              ? 'Correct! You captured the opponent piece.' 
              : `Incorrect. The correct answer is: ${question.correct}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;