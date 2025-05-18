export type Player = 'A' | 'B';

export interface Position {
  row: number;
  col: number;
}

export interface PieceData {
  player: Player;
  id: number;
  onWhiteSquare: boolean;
}

export interface SquareData {
  piece: PieceData | null;
  signId?: string;
}

export interface QuestionData {
  question: string;
  options: string[];
  correct: string;
  hint: string;
}

export interface GameState {
  board: SquareData[][];
  whiteDeck: QuestionData[];
  blackDeck: QuestionData[];
}