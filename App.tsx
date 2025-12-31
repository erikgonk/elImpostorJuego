import React, { useState, useEffect } from 'react';
import { useSettings } from './hooks/useSettings';
import { usePlayers } from './hooks/usePlayers';
import { useScores } from './hooks/useScores';
import { useGameLogic } from './hooks/useGameLogic';

import SetupScreen from './components/screens/SetupScreen';
import DistributionScreen from './components/screens/DistributionScreen';
import PlayingScreen from './components/screens/PlayingScreen';
import VotingScreen from './components/screens/VotingScreen';
import RoundResultScreen from './components/screens/RoundResultScreen';
import GameOverScreen from './components/screens/GameOverScreen';
import HowToPlayModal from './components/modals/HowToPlayModal';

const App: React.FC = () => {
  // --- HOOKS ---
  const {
    language,
    setLanguage,
    settings,
    setSettings,
    isImpostorCountManual,
    setIsImpostorCountManual,
    showAllCategories,
    setShowAllCategories
  } = useSettings();

  const {
    inputName,
    setInputName,
    playerNames,
    setPlayerNames,
    errorMsg,
    errorKey,
    addPlayer,
    removePlayerName,
    resetPlayers
  } = usePlayers(language);

  const {
    scores,
    matchCount,
    showFullLeaderboard,
    setShowFullLeaderboard,
    initializeScore,
    updateScores,
    resetScores,
    incrementMatchCount
  } = useScores();

  const {
    gameState,
    setGameState,
    distributionIndex,
    selectedSuspectId,
    setSelectedSuspectId,
    startGame: startGameLogic,
    handleRevealNext,
    handleDistributionDone,
    startVoting,
    handleEliminate: handleEliminateLogic,
    nextRound,
    resetGame,
    setShowStartingPlayer
  } = useGameLogic();

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // --- EFFECTS ---

  // Update impostor count based on players if not manually set
  useEffect(() => {
    if (!isImpostorCountManual && playerNames.length > 0) {
      const calculatedImpostors = Math.max(1, Math.ceil(playerNames.length * 0.25));
      setSettings(prev => ({ ...prev, impostorCount: calculatedImpostors }));
    }
  }, [playerNames.length, isImpostorCountManual, setSettings]);

  // Initialize scores for new players
  useEffect(() => {
    playerNames.forEach(name => initializeScore(name));
  }, [playerNames, initializeScore]);


  // --- ACTIONS WRAPPERS ---

  const startGame = () => {
    startGameLogic(playerNames, settings, language);
    incrementMatchCount();
    setShowFullLeaderboard(false);
  };

  const handleEliminate = (playerId: string) => {
    handleEliminateLogic(playerId, updateScores);
  };

  const resetToHome = () => {
    resetGame();
    resetPlayers();
    resetScores();
  };

  const playAgainSamePlayers = () => {
    startGame();
  };

  // --- RENDER ---

  return (
    <div className="h-[100dvh] bg-[#0f172a] text-slate-200 font-sans selection:bg-violet-500/30 selection:text-violet-200 overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed z-0"></div>
      
      <div className="flex-1 w-full max-w-md mx-auto relative px-4 z-10 h-full overflow-hidden">
        {gameState.status === 'setup' && (
          <SetupScreen
            language={language}
            setLanguage={setLanguage}
            playerNames={playerNames}
            addPlayer={addPlayer}
            removePlayerName={removePlayerName}
            inputName={inputName}
            setInputName={setInputName}
            errorMsg={errorMsg}
            errorKey={errorKey}
            settings={settings}
            setSettings={setSettings}
            setIsImpostorCountManual={setIsImpostorCountManual}
            showAllCategories={showAllCategories}
            setShowAllCategories={setShowAllCategories}
            startGame={startGame}
            setShowHowToPlay={setShowHowToPlay}
          />
        )}
        
        {(gameState.status === 'distribution_pass' || gameState.status === 'distribution_reveal') && (
          <DistributionScreen
            gameState={gameState}
            distributionIndex={distributionIndex}
            handleRevealNext={handleRevealNext}
            handleDistributionDone={handleDistributionDone}
            language={language}
            settings={settings}
          />
        )}

        {gameState.status === 'playing' && (
          <PlayingScreen
            gameState={gameState}
            language={language}
            startVoting={startVoting}
            setShowStartingPlayer={setShowStartingPlayer}
            settings={settings}
          />
        )}

        {gameState.status === 'voting' && (
          <VotingScreen
            gameState={gameState}
            language={language}
            selectedSuspectId={selectedSuspectId}
            setSelectedSuspectId={setSelectedSuspectId}
            handleEliminate={handleEliminate}
          />
        )}

        {gameState.status === 'round_result' && (
          <RoundResultScreen
            gameState={gameState}
            language={language}
            nextRound={nextRound}
            settings={settings}
          />
        )}

        {gameState.status === 'game_over' && (
          <GameOverScreen
            gameState={gameState}
            language={language}
            scores={scores}
            matchCount={matchCount}
            showFullLeaderboard={showFullLeaderboard}
            setShowFullLeaderboard={setShowFullLeaderboard}
            playAgainSamePlayers={playAgainSamePlayers}
            resetToHome={resetToHome}
          />
        )}

        {showHowToPlay && (
          <HowToPlayModal
            language={language}
            setShowHowToPlay={setShowHowToPlay}
          />
        )}
      </div>
    </div>
  );
};

export default App;