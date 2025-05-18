import React from 'react';
import { PieceData } from '../types/gameTypes';
import { LucideCrop as LucideProps } from 'lucide-react';
import * as Icons from 'lucide-react';

interface SquareProps {
  row: number;
  col: number;
  isBlack: boolean;
  piece: PieceData | null;
  sign?: string;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ 
  isBlack, 
  piece, 
  sign, 
  isSelected, 
  isValidMove, 
  onClick 
}) => {
  let bgColor = isBlack ? 'bg-gray-800' : 'bg-white';
  
  if (isSelected) {
    bgColor = 'bg-blue-300';
  } else if (isValidMove) {
    bgColor = isBlack ? 'bg-green-800/50' : 'bg-green-200/80';
  }

  const pieceColor = piece?.player === 'A' ? 'text-red-500' : 'text-blue-500';

  // Map traffic sign names to Lucide icons
  const getTrafficIcon = (signName: string): React.FC<LucideProps> => {
    const iconMap: { [key: string]: React.FC<LucideProps> } = {
      'warning': Icons.AlertTriangle,
      'no-entry': Icons.XCircle,
      'parking': Icons.SquareParking,
      'pedestrian': Icons.Person,
      'bicycle': Icons.Bike,
      'traffic-light': Icons.Traffic,
      'construction': Icons.HardHat,
      'one-way': Icons.ArrowRight,
      'no-u-turn': Icons.Undo,
      'roundabout': Icons.RotateCcw,
      'curve-right': Icons.CornerRightDown,
      'curve-left': Icons.CornerLeftDown,
      'y-intersection': Icons.GitBranch,
      'narrow-bridge': Icons.MinusSquare,
      'overtaking': Icons.CarFront,
      'winding-road': Icons.WavyLine,
      'road-narrows': Icons.ArrowRightFromLine,
      'landslide': Icons.Mountain,
      'first-aid': Icons.Heart,
      'slippery': Icons.Waves,
      'right-turn': Icons.ArrowRight,
      'crossroads': Icons.Plus,
      'falling-rocks': Icons.Cloud,
      'give-way': Icons.ArrowDown,
      'steep-hill': Icons.TrendingUp,
      'left-turn': Icons.ArrowLeft,
      'pedestrian-crossing': Icons.PersonStanding,
      'no-stopping': Icons.Ban,
      'no-bicycles': Icons.BikeLock
    };

    return iconMap[signName] || Icons.CircleDot;
  };

  return (
    <div 
      className={`${bgColor} aspect-square w-full h-full min-w-10 min-h-10 relative flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={onClick}
    >
      {/* Traffic sign (on white squares) */}
      {!isBlack && sign && (
        <div className="absolute inset-1 flex items-center justify-center">
          {sign === 'stop' ? (
            <img 
              src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Stop%20sign/Flat/stop_sign_flat.png" 
              alt="Stop Sign"
              className="w-8 h-8 object-contain opacity-70"
            />
          ) : (
            React.createElement(getTrafficIcon(sign), {
              size: 24,
              className: "text-gray-700 opacity-50"
            })
          )}
        </div>
      )}

      {/* Piece (traffic cone) */}
      {piece && (
        <div 
          className={`${pieceColor} ${isSelected ? 'animate-highlight' : ''} z-10`}
          style={{ 
            width: '70%', 
            height: '70%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M4.5,19.5h15v2h-15V19.5z M10.23,7.83C9.6,5.9,9,4,9,4h6c0,0-0.6,1.9-1.23,3.83L10.23,7.83z M19.84,18.5H4.16
              l0.88-3.03C5.44,14.09,6.74,13,8.19,13h7.63c1.45,0,2.75,1.09,3.15,2.47L19.84,18.5z M15.05,11.15
              c-0.14,0.76-0.26,1.42-0.35,1.85h-5.4c-0.09-0.43-0.21-1.09-0.35-1.85c-0.38-2.01-0.83-4.39-1.09-5.7h8.27
              C15.88,6.76,15.43,9.14,15.05,11.15z" />
          </svg>
        </div>
      )}

      {/* Valid move indicator */}
      {isValidMove && !piece && (
        <div className="absolute w-1/3 h-1/3 rounded-full bg-green-500/60 animate-pulse"></div>
      )}
    </div>
  );
};

export default Square;