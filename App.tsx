import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Settings, 
  Play, 
  Eye, 
  EyeOff, 
  Trash2, 
  Plus,
  Skull,
  CheckCircle2,
  AlertTriangle,
  Crown,
  Home,
  RotateCcw,
  Zap,
  Fingerprint,
  Ghost,
  Trophy,
  List
} from 'lucide-react';

import { CATEGORIES, MIN_PLAYERS, getCategories } from './constants';
import { GameSettings, GameState, ScoreMap, Language } from './types';
import { generatePlayers, checkWinCondition } from './services/gameLogic';
import Button from './components/Button';
import Card from './components/Card';
import { t } from './translations';

const App: React.FC = () => {
  // --- STATE ---
  const [language, setLanguage] = useState<Language>('es');
  const [settings, setSettings] = useState<GameSettings>({
    impostorCount: 1,
  });

  const [inputName, setInputName] = useState('');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  
  // Persistent Scores & Match Count
  const [scores, setScores] = useState<ScoreMap>({});
  const [matchCount, setMatchCount] = useState(0);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);

  // Game State
  const [gameState, setGameState] = useState<GameState>({
    status: 'setup',
    players: [],
    currentRound: 1,
    secretWord: '',
    currentCategoryName: '',
    winner: null,
    eliminatedPlayerId: null
  });

  const [distributionIndex, setDistributionIndex] = useState(0);

  // --- HELPERS ---

  const addPlayer = () => {
    if (inputName.trim()) {
      const name = inputName.trim();
      setPlayerNames([...playerNames, name]);
      // Initialize score if new
      if (scores[name] === undefined) {
        setScores(prev => ({ ...prev, [name]: 0 }));
      }
      setInputName('');
    }
  };

  const removePlayerName = (index: number) => {
    const newNames = [...playerNames];
    newNames.splice(index, 1);
    setPlayerNames(newNames);
  };

  const updateScores = (winnerTeam: 'allies' | 'impostors', currentPlayers: typeof gameState.players) => {
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

  // --- GAME FLOW ACTIONS ---

  const startGame = () => {
    if (playerNames.length < MIN_PLAYERS) return;

    const categories = getCategories(language);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const randomWord = category.words[Math.floor(Math.random() * category.words.length)];

    const newPlayers = generatePlayers(playerNames, settings.impostorCount);

    setMatchCount(prev => prev + 1);
    setShowFullLeaderboard(false);

    setGameState({
      status: 'distribution_pass',
      players: newPlayers,
      currentRound: 1,
      secretWord: randomWord,
      currentCategoryName: category.name,
      winner: null,
      eliminatedPlayerId: null
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
      setGameState(prev => ({ ...prev, status: 'playing' }));
    }
  };

  const startVoting = () => {
    setGameState(prev => ({ ...prev, status: 'voting' }));
  };

  const handleEliminate = (playerId: string) => {
    const updatedPlayers = gameState.players.map(p => 
      p.id === playerId ? { ...p, isAlive: false } : p
    );

    const winner = checkWinCondition(updatedPlayers);

    if (winner) {
      updateScores(winner, updatedPlayers);
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

  const resetToHome = () => {
    setGameState({
      status: 'setup',
      players: [],
      currentRound: 1,
      secretWord: '',
      currentCategoryName: '',
      winner: null,
      eliminatedPlayerId: null
    });
    setPlayerNames([]);
    setInputName('');
    setScores({});
    setMatchCount(0);
  };

  const playAgainSamePlayers = () => {
    startGame();
  };

  // --- RENDERING SUB-SCREENS ---

  const renderSetup = () => (
    <div className="flex flex-col h-full py-4">
      {/* Header */}
      <div className="text-center space-y-1 mb-6 flex-shrink-0 relative">
        <button 
          onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')}
          className="absolute top-0 right-0 p-2 text-xs font-bold text-slate-500 hover:text-white transition-colors"
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>
        <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Ghost className="w-6 h-6 text-white" />
            </div>
        </div>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight uppercase">
          {t('appTitle', language)}
        </h1>
        
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-1 space-y-4 min-h-0">
        <Card>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-400" />
            {t('players', language)} ({playerNames.length})
          </h2>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              placeholder={t('addPlayerPlaceholder', language)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
            />
            <button 
              onClick={addPlayer}
              className="bg-violet-600 text-white p-2.5 rounded-xl hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/20"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-2">
            {playerNames.map((name, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-white/5 rounded-xl border border-white/5 animate-fade-in">
                <span className="font-medium text-slate-200 ml-2 text-sm">{name}</span>
                <button onClick={() => removePlayerName(idx)} className="text-slate-500 hover:text-rose-500 p-1.5 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {playerNames.length === 0 && (
              <p className="text-center text-slate-600 italic text-xs py-6 border-2 border-dashed border-slate-700 rounded-xl">
                {t('addMinPlayers', language, MIN_PLAYERS)}
              </p>
            )}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Settings className="w-4 h-4 text-violet-400" />
              {t('impostors', language)}
            </h2>
          </div>
          
          <div className="flex gap-2">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => setSettings(s => ({...s, impostorCount: num}))}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 border ${
                  settings.impostorCount === num 
                  ? 'bg-violet-600/20 text-violet-300 border-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.3)]' 
                  : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </Card>

        <div className="text-xs text-slate-500 flex gap-2 items-start bg-slate-900/50 p-3 rounded-lg border border-white/5">
            <Zap className="w-3 h-3 text-yellow-500 mt-0.5 shrink-0" />
            <span>{t('randomCategory', language)}</span>
        </div>
      </div>

      {/* Footer Fixed */}
      <div className="pt-4 flex-shrink-0">
        <Button 
          fullWidth 
          onClick={startGame} 
          disabled={playerNames.length < MIN_PLAYERS}
          className={playerNames.length < MIN_PLAYERS ? 'opacity-50 cursor-not-allowed grayscale' : ''}
        >
          <Play className="w-5 h-5 fill-current" /> {t('startMission', language)}
        </Button>
      </div>
    </div>
  );

  const renderDistributionPass = () => {
    const player = gameState.players[distributionIndex];
    return (
      <div className="flex flex-col items-center justify-center h-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-900 -z-10"></div>
        
        <div className="text-center space-y-4 mb-10">
          <p className="text-slate-400 text-sm uppercase tracking-widest font-light">{t('passDeviceTo', language)}</p>
          <h2 className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] px-4">{player.name}</h2>
        </div>
        
        <div onClick={handleRevealNext} className="cursor-pointer w-48 h-48 bg-slate-800/50 rounded-full flex items-center justify-center mb-12 border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.2)] animate-pulse hover:scale-105 transition-transform">
           <Fingerprint className="w-24 h-24 text-violet-500" />
        </div>

        <Button onClick={handleRevealNext} className="px-10 py-4 text-lg w-full max-w-xs">
          <Eye className="w-6 h-6" /> {t('seeRole', language)}
        </Button>
      </div>
    );
  };

  const renderDistributionReveal = () => {
    const player = gameState.players[distributionIndex];
    const isImpostor = player.role === 'impostor';

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center w-full flex-1 flex flex-col justify-center">
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">{t('confidential', language, player.name)}</p>
           
           <div className={`relative overflow-hidden rounded-3xl border-2 mx-2 p-1 ${isImpostor ? 'border-rose-500/50 bg-rose-900/10' : 'border-cyan-500/50 bg-cyan-900/10'}`}>
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
              
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-[20px] py-10 px-4 text-center space-y-6 relative z-10">
                {isImpostor ? (
                  <div className="space-y-6">
                    <div className="inline-block p-3 rounded-full bg-rose-500/20 text-rose-500 mb-2 animate-bounce">
                        <Skull className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-rose-500 tracking-tight uppercase drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                      {t('impostor', language)}
                    </h2>
                    <div className="py-2 px-4 rounded-lg bg-rose-950/50 border border-rose-500/20 inline-block">
                        <p className="text-rose-300 font-medium text-sm">{t('category', language)}: <span className="text-white font-bold">{gameState.currentCategoryName}</span></p>
                    </div>
                    <p className="text-slate-400 text-xs px-2 leading-relaxed whitespace-pre-line">
                      {t('impostorDesc', language)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                     <div className="inline-block p-3 rounded-full bg-cyan-500/20 text-cyan-400 mb-2">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2">
                        {gameState.currentCategoryName}
                      </p>
                      <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                        {gameState.secretWord}
                      </h2>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {t('findIntruder', language)}
                    </p>
                  </div>
                )}
              </div>
           </div>
        </div>

        <div className="w-full max-w-xs pb-6">
          <Button variant="secondary" onClick={handleDistributionDone} fullWidth>
             <EyeOff className="w-5 h-5" /> {t('hide', language)}
          </Button>
        </div>
      </div>
    );
  };

  const renderPlaying = () => {
    return (
      <div className="flex flex-col h-full pt-4 pb-4">
        {/* Header Compacto */}
        <div className="flex justify-between items-end mb-4 px-2 border-b border-white/5 pb-3 flex-shrink-0">
          <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">{t('missionInProgress', language)}</p>
              <h2 className="text-xl font-black text-white">{t('round', language, gameState.currentRound)}</h2>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-[10px] font-bold text-violet-300 uppercase tracking-wider">
            {gameState.currentCategoryName}
          </div>
        </div>

        {/* MAIN FOCUS: PLAYER GRID */}
        <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2 flex-shrink-0">
                <Users className="w-3 h-3" /> {t('activeSubjects', language)}
            </h3>
            
            <div className="flex-1 overflow-y-auto px-1 pb-4">
              <div className="grid grid-cols-2 gap-3">
                  {gameState.players.filter(p => p.isAlive).map(player => (
                  <div key={player.id} className="group bg-slate-800/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 relative overflow-hidden transition-all hover:bg-slate-800/60 aspect-square justify-center">
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-white/10 text-slate-300 font-bold text-lg group-hover:scale-110 transition-transform shadow-inner">
                          {player.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-200 truncate w-full text-center tracking-wide text-xs">{player.name}</span>
                  </div>
                  ))}
              </div>
              
              <div className="mt-6 text-center px-6 py-4 rounded-2xl bg-slate-900/50 border border-white/5 mx-2">
                 <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">{t('missionStatus', language)}</p>
                 <p className="text-slate-300 text-xs">{t('missionStatusDesc', language)}</p>
              </div>
            </div>
        </div>

        {/* Footer Fixed */}
        <div className="pt-2 flex-shrink-0 px-1">
          <Button fullWidth onClick={startVoting} variant="danger" className="shadow-rose-900/20">
            <Skull className="w-5 h-5" /> {t('finishAndVote', language)}
          </Button>
        </div>
      </div>
    );
  };

  const renderVoting = () => (
    <div className="flex flex-col h-full pt-6 pb-4">
      <div className="text-center space-y-2 mb-6 flex-shrink-0">
        <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-rose-500/10 mb-2 text-rose-500 border border-rose-500/20">
            <Skull className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t('execution', language)}</h2>
        <p className="text-rose-400 font-medium text-sm">{t('selectSuspect', language)}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-1 min-h-0 space-y-2">
        {gameState.players.filter(p => p.isAlive).map(player => (
          <button
            key={player.id}
            onClick={() => handleEliminate(player.id)}
            className="w-full group relative bg-slate-800/40 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-rose-500/50 hover:bg-rose-900/10 transition-all flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs border border-white/10 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    {player.name.charAt(0)}
                </div>
                <span className="font-bold text-base text-slate-200 group-hover:text-white">{player.name}</span>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-500">
                <Skull className="w-5 h-5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderRoundResult = () => {
    const eliminatedPlayer = gameState.players.find(p => p.id === gameState.eliminatedPlayerId);
    const wasImpostor = eliminatedPlayer?.role === 'impostor';

    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 relative">
         {/* Background Glow */}
         <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${wasImpostor ? 'from-emerald-500 via-transparent' : 'from-rose-500 via-transparent'} to-transparent -z-10`}></div>

        <div className="space-y-2 mb-8">
          <p className="text-slate-400 text-sm uppercase tracking-widest">{t('eliminatedSubject', language)}</p>
          <h2 className="text-3xl font-black text-white">{eliminatedPlayer?.name}</h2>
        </div>

        <div className={`w-40 h-40 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 mb-8 ${wasImpostor ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 'bg-rose-900/20 border-rose-500 text-rose-500'}`}>
          {wasImpostor ? <CheckCircle2 className="w-20 h-20" /> : <AlertTriangle className="w-20 h-20" />}
        </div>

        <div className="space-y-2 mb-10">
          <h3 className={`text-2xl font-black uppercase tracking-tight ${wasImpostor ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]'}`}>
            {wasImpostor ? t('impostorEliminated', language) : t('wasAlly', language)}
          </h3>
          <p className="text-slate-300 font-light text-sm">
            {wasImpostor 
              ? t('threatNeutralized', language) 
              : t('errorImpostorActive', language)}
          </p>
        </div>

        {wasImpostor && (
           <div className="bg-emerald-900/30 border border-emerald-500/30 p-3 rounded-xl w-full max-w-xs mb-8">
             <p className="text-[10px] uppercase text-emerald-300/70 font-bold mb-1">{t('keyword', language)}</p>
             <p className="text-xl font-bold text-white">{gameState.secretWord}</p>
           </div>
        )}

        <div className="w-full max-w-xs">
            <Button fullWidth onClick={nextRound} variant={wasImpostor ? 'primary' : 'secondary'}>
            {t('continueMission', language)}
            </Button>
        </div>
      </div>
    );
  };

  const renderGameOver = () => {
    const alliesWon = gameState.winner === 'allies';
    
    // Calculate winners based on teams
    const winningPlayers = gameState.players.filter(p => 
      (alliesWon && p.role === 'ally') || (!alliesWon && p.role === 'impostor')
    );

    // Leaderboard Data
    const sortedLeaderboard = Object.entries(scores)
      .sort(([, a], [, b]) => b - a);
    
    const top3 = sortedLeaderboard.slice(0, 3);
    const renderLeaderboard = showFullLeaderboard ? sortedLeaderboard : top3;

    return (
      <div className="flex flex-col h-full pt-6 pb-6 px-1">
        
        {/* Header Result */}
        <div className="text-center flex-shrink-0 mb-6">
          <div className={`relative inline-flex justify-center items-center mb-4 ${alliesWon ? 'text-yellow-400' : 'text-rose-500'}`}>
              <Crown className="w-16 h-16" />
              <div className={`absolute inset-0 blur-2xl opacity-50 ${alliesWon ? 'bg-yellow-500' : 'bg-rose-500'}`}></div>
          </div>
          
          <h1 className="text-4xl font-black text-white mb-1 tracking-tighter uppercase drop-shadow-lg">
            {alliesWon ? t('alliesWin', language) : t('impostorsWin', language)}
          </h1>
          <p className="text-slate-400 text-sm font-light">
            {alliesWon ? t('missionAccomplished', language) : t('infiltrationSuccess', language)}
          </p>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 px-1 space-y-4">
          
          {/* 1. Winners List (Always Show) */}
          <Card className="p-4 border-white/10 bg-slate-900/40">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">
              {t('roundWinners', language)}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {winningPlayers.map(p => (
                <span key={p.id} className={`px-3 py-1 rounded-full text-xs font-bold border ${alliesWon ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300' : 'bg-rose-500/20 border-rose-500/30 text-rose-300'}`}>
                  {p.name}
                </span>
              ))}
            </div>
            
             <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                 <div className="text-slate-500">
                   {t('word', language)}: <span className="text-white font-bold ml-1">{gameState.secretWord}</span>
                 </div>
                 <div className="text-slate-500">
                   {t('category', language)}: <span className="text-white font-bold ml-1">{gameState.currentCategoryName}</span>
                 </div>
            </div>
          </Card>

          {/* 2. Leaderboard (Show if matchCount > 1) */}
          {matchCount > 1 && (
            <div className="animate-fade-in">
               <div className="flex justify-between items-end mb-2 px-1">
                 <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                   <Trophy className="w-3 h-3" /> {t('globalRanking', language)}
                 </h3>
                 {!showFullLeaderboard && sortedLeaderboard.length > 3 && (
                   <button onClick={() => setShowFullLeaderboard(true)} className="text-[10px] text-slate-400 underline">
                     {t('viewAll', language)}
                   </button>
                 )}
                 {showFullLeaderboard && (
                    <button onClick={() => setShowFullLeaderboard(false)} className="text-[10px] text-slate-400 underline">
                     {t('viewTop3', language)}
                   </button>
                 )}
               </div>
               
               <div className="bg-slate-800/40 rounded-2xl border border-white/5 overflow-hidden">
                 {renderLeaderboard.map(([name, score], idx) => (
                   <div key={name} className="flex justify-between items-center p-3 border-b border-white/5 last:border-0 hover:bg-white/5">
                     <div className="flex items-center gap-3">
                       <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${idx === 0 ? 'bg-yellow-500 text-black' : idx === 1 ? 'bg-slate-300 text-black' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-400'}`}>
                         {idx + 1}
                       </span>
                       <span className="text-sm font-medium text-slate-200">{name}</span>
                     </div>
                     <span className="text-sm font-bold text-white">{score} {score === 1 ? t('victory', language) : t('victories', language)}</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex-shrink-0 space-y-3">
          <Button fullWidth onClick={playAgainSamePlayers} variant="primary">
             <RotateCcw className="w-5 h-5" /> {t('playAgain', language)}
          </Button>
          <Button fullWidth variant="ghost" onClick={resetToHome} className="py-3 text-sm">
             <Home className="w-4 h-4" /> {t('finishAndExit', language)}
          </Button>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER SWITCH ---
  // h-[100dvh] ensures full height on mobile browsers including address bar area
  return (
    <div className="h-[100dvh] bg-[#0f172a] text-slate-200 font-sans selection:bg-violet-500/30 selection:text-violet-200 overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed z-0"></div>
      
      <div className="flex-1 w-full max-w-md mx-auto relative px-4 z-10 h-full overflow-hidden">
        {gameState.status === 'setup' && renderSetup()}
        {gameState.status === 'distribution_pass' && renderDistributionPass()}
        {gameState.status === 'distribution_reveal' && renderDistributionReveal()}
        {gameState.status === 'playing' && renderPlaying()}
        {gameState.status === 'voting' && renderVoting()}
        {gameState.status === 'round_result' && renderRoundResult()}
        {gameState.status === 'game_over' && renderGameOver()}
      </div>
    </div>
  );
};

export default App;