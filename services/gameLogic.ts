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
  const players: Player[] = names.map(name => ({
    id: crypto.randomUUID(),
    name,
    role: 'ally' as Role, // default
    isAlive: true
  }));

  // 1. Shuffle to randomize who gets which role conceptually
  let shuffled = shuffleArray(players);
  
  // 2. Assign impostors to the first N players
  for (let i = 0; i < impostorCount; i++) {
    if (shuffled[i]) {
      shuffled[i].role = 'impostor';
    }
  }

  // 3. CRITICAL: Shuffle AGAIN so the impostors aren't always at indices 0, 1, 2...
  // This ensures the first person to pick up the phone isn't always the impostor.
  return shuffleArray(shuffled);
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