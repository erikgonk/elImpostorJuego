import React from 'react';
import { 
  Play, 
  Film, 
  Users, 
  Skull
} from 'lucide-react';
import Button from '../Button';
import { t } from '../../translations';
import { GameState, Language, GameSettings } from '../../types';

interface PlayingScreenProps {
  gameState: GameState;
  language: Language;
  startVoting: () => void;
  setShowStartingPlayer: (show: boolean) => void;
  settings: GameSettings;
}

const PlayingScreen: React.FC<PlayingScreenProps> = ({
  gameState,
  language,
  startVoting,
  setShowStartingPlayer,
  settings
}) => {
  const startingPlayer = gameState.players.find(p => p.id === gameState.startingPlayerId);
  const impostorsLeft = gameState.players.filter(p => p.isAlive && p.role === 'impostor').length;
  
  // Show starting player overlay for round 1
  if (gameState.showStartingPlayer && gameState.currentRound === 1 && startingPlayer) {
    return (
      <div className="flex flex-col items-center justify-center h-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/30 via-slate-900 to-slate-900 -z-10"></div>
        
        <div className="flex-1 flex flex-col items-center justify-center w-full text-center space-y-6 animate-fade-in">
          <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-yellow-500/20 mb-4 text-yellow-400 border-2 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.3)]">
            <Play className="w-12 h-12 fill-current" />
          </div>
          
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-light mb-2">{t('startingPlayerDesc', language)}</p>
            <h2 className="text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] px-4">
              {t('startingPlayer', language, startingPlayer.name)}
            </h2>
          </div>
          
          <div className="mt-8 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl inline-block">
            <p className="text-yellow-300 text-xs font-medium">{gameState.currentCategoryName}</p>
          </div>
        </div>

        <div className="w-full max-w-xs pb-6">
          <Button 
            onClick={() => setShowStartingPlayer(false)} 
            fullWidth 
            className="text-lg"
          >
            {t('tapToContinue', language)}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full pt-4 pb-4">
      {/* Header with Category Focus */}
      <div className="flex flex-col items-center mb-4 px-2 flex-shrink-0">
         {/* Top Bar: Round & Status */}
         <div className="flex items-center justify-between w-full mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t('round', language, gameState.currentRound)}
              </span>
              {settings.revealRoleAfterVote && (
                <span className="px-2 py-1 rounded-lg bg-rose-900/30 border border-rose-500/20 text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                  {t('impostorsLeft', language, impostorsLeft)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              {t('missionInProgress', language)}
            </p>
         </div>
         
         {/* Category Card - Prominent */}
         <div className="w-full bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 border border-violet-500/20 rounded-2xl p-4 text-center relative overflow-hidden shadow-lg shadow-violet-900/10">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50"></div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Film className="w-3 h-3 text-violet-400" />
              <p className="text-violet-300 text-[10px] font-bold uppercase tracking-widest">{t('category', language)}</p>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
              {gameState.currentCategoryName}
            </h2>
         </div>
      </div>

      {/* Starting Player Info - NEW */}
      {startingPlayer && (
        <div className="mx-2 mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <p className="text-yellow-500/70 text-[10px] font-bold uppercase tracking-wider">{t('starts', language)}</p>
            <p className="text-yellow-100 font-bold text-sm">{startingPlayer.name}</p>
          </div>
        </div>
      )}

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

export default PlayingScreen;
