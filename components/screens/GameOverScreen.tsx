import React from 'react';
import { 
  Crown, 
  Trophy, 
  RotateCcw, 
  Home
} from 'lucide-react';
import Button from '../Button';
import Card from '../Card';
import { t } from '../../translations';
import { GameState, Language, ScoreMap } from '../../types';

interface GameOverScreenProps {
  gameState: GameState;
  language: Language;
  scores: ScoreMap;
  matchCount: number;
  showFullLeaderboard: boolean;
  setShowFullLeaderboard: (show: boolean) => void;
  playAgainSamePlayers: () => void;
  resetToHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  gameState,
  language,
  scores,
  matchCount,
  showFullLeaderboard,
  setShowFullLeaderboard,
  playAgainSamePlayers,
  resetToHome
}) => {
  const alliesWon = gameState.winner === 'allies';
  
  // Calculate winners based on teams
  const winningPlayers = gameState.players.filter(p => 
    (alliesWon && p.role === 'ally') || (!alliesWon && p.role === 'impostor')
  );

  // Leaderboard Data
  const sortedLeaderboard = Object.entries(scores)
    .sort(([, a], [, b]) => (b as number) - (a as number));
  
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

export default GameOverScreen;
