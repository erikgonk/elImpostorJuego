import { useState } from 'react';
import { ScoreMap, GameState } from '../types';

export const useScores = () => {
  const [scores, setScores] = useState<ScoreMap>({});
  const [matchCount, setMatchCount] = useState(0);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);

  const initializeScore = (playerName: string) => {
    if (scores[playerName] === undefined) {
      setScores(prev => ({ ...prev, [playerName]: 0 }));
    }
  };

  const updateScores = (winnerTeam: 'allies' | 'impostors', currentPlayers: GameState['players']) => {
    setScores(prevScores => {
      const newScores = { ...prevScores };
      currentPlayers.forEach(p => {
        // Award point if the player's role matches the winning team
        // (Even if they died, they win with their team)
        if (
          (winnerTeam === 'allies' && p.role === 'ally') ||
          (winnerTeam === 'impostors' && p.role === 'impostor')
        ) {
          newScores[p.name] = (newScores[p.name] || 0) + 1;
        }
      });
      return newScores;
    });
  };

  const resetScores = () => {
    setScores({});
    setMatchCount(0);
  };

  const incrementMatchCount = () => {
    setMatchCount(prev => prev + 1);
  };

  return {
    scores,
    matchCount,
    showFullLeaderboard,
    setShowFullLeaderboard,
    initializeScore,
    updateScores,
    resetScores,
    incrementMatchCount
  };
};
