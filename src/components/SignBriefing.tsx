import React, { useState, useEffect } from 'react';
import { trafficSigns } from '../data/trafficSigns';
import { signToEmoticon } from '../utils/emoticonMapping';

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
    <div className="fixed inset-0 bg-blue-100/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in shadow-2xl shadow-blue-200/50 border border-blue-200/30">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Pengenalan Rambu Lalu Lintas
            </h2>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full font-mono shadow-md">
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <p className="mb-6 text-blue-800/90 text-lg">
            Pelajari rambu-rambu lalu lintas berikut dengan seksama. Anda perlu mengidentifikasi rambu-rambu ini selama permainan untuk mengambil bidak lawan di kotak putih.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {trafficSigns.map((sign, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-xl border border-blue-100/70 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <img 
                    src={`/signs/${sign.id}.png`} 
                    alt={sign.name}
                    className="h-20 object-contain transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/60?text=Rambu';
                    }}
                  />
                </div>
                <p className="text-sm font-semibold text-center text-blue-800">{sign.name}</p>
                <p className="text-xs text-blue-600/80 text-center mt-2 leading-relaxed">
                  {signToEmoticon[sign.id]} {sign.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-300/50 hover:scale-105 font-medium text-lg"
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
