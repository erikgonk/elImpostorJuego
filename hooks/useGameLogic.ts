import { useState } from 'react';
import { GameState, GameSettings, Language } from '../types';
import { getCategories } from '../constants';
import { generatePlayers, checkWinCondition } from '../services/gameLogic';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'setup',
    players: [],
    currentRound: 1,
    secretWord: '',
    currentCategoryName: '',
    winner: null,
    eliminatedPlayerId: null,
    startingPlayerId: null,
    showStartingPlayer: false
  });

  const [distributionIndex, setDistributionIndex] = useState(0);
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);

  const startGame = (playerNames: string[], settings: GameSettings, language: Language) => {
    const categories = getCategories(language);
    let category;
    
    if (settings.selectedCategory === 'random') {
      category = categories[Math.floor(Math.random() * categories.length)];
    } else {
      category = categories.find(c => c.id === settings.selectedCategory) || categories[0];
    }
    
    const randomWord = category.words[Math.floor(Math.random() * category.words.length)];

    const newPlayers = generatePlayers(playerNames, settings.impostorCount);
    
    // Pick a random starting player
    const startingPlayer = newPlayers[Math.floor(Math.random() * newPlayers.length)];

    setGameState({
      status: 'distribution_pass',
      players: newPlayers,
      currentRound: 1,
      secretWord: randomWord,
      currentCategoryName: category.name,
      winner: null,
      eliminatedPlayerId: null,
      startingPlayerId: startingPlayer.id,
      showStartingPlayer: false
    });
    setDistributionIndex(0);
  };

  const handleRevealNext = () => {
    setGameState(prev => ({ ...prev, status: 'distribution_reveal' }));
  };

  const handleDistributionDone = () => {
    if (distributionIndex < gameState.players.length - 1) {
      setDistributionIndex(prev => prev + 1);
      setGameState(prev => ({ ...prev, status: 'distribution_pass' }));
    } else {
      // Show starting player screen for round 1
      setGameState(prev => ({ ...prev, status: 'playing', showStartingPlayer: true }));
    }
  };

  const startVoting = () => {
    setSelectedSuspectId(null);
    setGameState(prev => ({ ...prev, status: 'voting' }));
  };

  const handleEliminate = (playerId: string, updateScoresCallback: (winner: 'allies' | 'impostors', players: GameState['players']) => void) => {
    const updatedPlayers = gameState.players.map(p => 
      p.id === playerId ? { ...p, isAlive: false } : p
    );

    const winner = checkWinCondition(updatedPlayers);

    if (winner) {
      updateScoresCallback(winner, updatedPlayers);
    }

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
      eliminatedPlayerId: playerId,
      winner: winner,
      status: winner ? 'game_over' : 'round_result'
    }));
  };

  const nextRound = () => {
    setGameState(prev => ({ 
      ...prev, 
      currentRound: prev.currentRound + 1, 
      status: 'playing',
      eliminatedPlayerId: null
    }));
  };

  const resetGame = () => {
    setGameState({
      status: 'setup',
      players: [],
      currentRound: 1,
      secretWord: '',
      currentCategoryName: '',
      winner: null,
      eliminatedPlayerId: null,
      startingPlayerId: null,
      showStartingPlayer: false
    });
    setSelectedSuspectId(null);
  };

  const setShowStartingPlayer = (show: boolean) => {
    setGameState(prev => ({ ...prev, showStartingPlayer: show }));
  };

  return {
    gameState,
    setGameState,
    distributionIndex,
    selectedSuspectId,
    setSelectedSuspectId,
    startGame,
    handleRevealNext,
    handleDistributionDone,
    startVoting,
    handleEliminate,
    nextRound,
    resetGame,
    setShowStartingPlayer
  };
};
