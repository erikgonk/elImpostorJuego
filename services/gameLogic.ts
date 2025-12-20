import { Player, Role } from '../types';

// Fisher-Yates Shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generatePlayers = (names: string[], impostorCount: number): Player[] => {
  // Create players in order
  const players: Player[] = names.map(name => ({
    id: crypto.randomUUID(),
    name,
    role: 'ally' as Role, // default
    isAlive: true
  }));

  // Create an array of indices [0, 1, ... n-1]
  const indices = Array.from({ length: names.length }, (_, i) => i);
  
  // Shuffle indices to pick impostors randomly
  const shuffledIndices = shuffleArray(indices);
  
  // Select the first 'impostorCount' indices as impostors
  const impostorIndices = new Set(shuffledIndices.slice(0, impostorCount));

  // Assign roles based on selected indices
  players.forEach((player, index) => {
    if (impostorIndices.has(index)) {
      player.role = 'impostor';
    }
  });

  // Return players in original order (to preserve turn order)
  return players;
};

export const checkWinCondition = (players: Player[]): 'allies' | 'impostors' | null => {
  const activeImpostors = players.filter(p => p.isAlive && p.role === 'impostor').length;
  const totalAlive = players.filter(p => p.isAlive).length;

  // Win condition: All impostors eliminated
  if (activeImpostors === 0) {
    return 'allies';
  }

  // Win condition: Only 2 players left and one is an impostor
  // (Impostors win because they can't be voted out by majority anymore)
  if (totalAlive <= 2 && activeImpostors > 0) {
    return 'impostors';
  }

  return null;
};