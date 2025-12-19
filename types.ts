export type Role = 'ally' | 'impostor';

export type Language = 'es' | 'en';

export type GameStatus = 
  | 'setup' 
  | 'distribution_pass' // "Give phone to X"
  | 'distribution_reveal' // "X sees their role"
  | 'playing' 
  | 'voting' 
  | 'round_result' 
  | 'game_over';

export interface Player {
  id: string;
  name: string;
  role: Role;
  isAlive: boolean;
}

export interface Category {
  id: string;
  name: string;
  words: string[];
}

export interface GameSettings {
  impostorCount: number;
}

export interface GameState {
  status: GameStatus;
  players: Player[];
  currentRound: number;
  secretWord: string;
  currentCategoryName: string;
  winner: 'allies' | 'impostors' | null;
  eliminatedPlayerId: string | null;
}

export type ScoreMap = Record<string, number>;