import React, { useState, useEffect } from 'react';
import { trafficSigns } from '../data/trafficSigns';

interface SignBriefingProps {
  onClose: () => void;
}

const SignBriefing: React.FC<SignBriefingProps> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 menit

  useEffect(() => {
    if (timeLeft <= 0) {
      onClose();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-700">Pengenalan Rambu Lalu Lintas</h2>
            <div className="bg-red-600 text-white px-3 py-1 rounded-full font-mono">
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <p className="mb-4 text-gray-700">
            Pelajari rambu-rambu lalu lintas berikut dengan seksama. Anda perlu mengidentifikasi rambu-rambu ini selama permainan untuk mengambil bidak lawan di kotak putih.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {trafficSigns.map((sign, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md border hover-scale">
                <div className="flex justify-center mb-2">
                  <img 
                    src={`/signs/${sign.id}.png`} 
                    alt={sign.name}
                    className="h-16 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/60?text=Rambu';
                    }}
                  />
                </div>
                <p className="text-sm font-medium text-center">{sign.name}</p>
                <p className="text-xs text-gray-600 text-center mt-1">{sign.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Lewati & Mulai Bermain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignBriefing;