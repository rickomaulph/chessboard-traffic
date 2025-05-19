import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import RuleModal from './components/RuleModal';
import SignBriefing from './components/SignBriefing';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  const [showRules, setShowRules] = useState(true);
  const [showBriefing, setShowBriefing] = useState(false);

  const startGame = () => {
    setShowRules(false);
    setShowBriefing(true);
  };

  const startPlaying = () => {
    setShowBriefing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold"> SATE ELANG (salah tebak, kena tilang!)</h1>
          <button 
            onClick={() => setShowRules(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded transition-colors"
          >
            Rules
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex flex-col md:flex-row md:items-start gap-6">
        <GameProvider>
          {showRules && <RuleModal onClose={startGame} />}
          {showBriefing && <SignBriefing onClose={startPlaying} />}
          <div className="flex-1 flex flex-col items-center">
            <GameBoard />
          </div>
          <div className="w-full md:w-80">
            <ScoreBoard />
          </div>
        </GameProvider>
      </main>

      <footer className="bg-blue-800 text-white py-3 text-center text-sm">
        <div className="container mx-auto">
          <p>SATE ELANG (salah tebak, kena tilang!) - Educational Game © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;