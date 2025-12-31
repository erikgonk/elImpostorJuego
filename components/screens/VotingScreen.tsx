import React from 'react';
import { 
  Film, 
  Skull
} from 'lucide-react';
import Button from '../Button';
import { t } from '../../translations';
import { GameState, Language } from '../../types';

interface VotingScreenProps {
  gameState: GameState;
  language: Language;
  selectedSuspectId: string | null;
  setSelectedSuspectId: (id: string | null) => void;
  handleEliminate: (id: string) => void;
}

const VotingScreen: React.FC<VotingScreenProps> = ({
  gameState,
  language,
  selectedSuspectId,
  setSelectedSuspectId,
  handleEliminate
}) => {
  const activePlayers = gameState.players.filter(p => p.isAlive);
  const isLargeGroup = activePlayers.length > 6;

  return (
    <div className="flex flex-col h-full pt-4 pb-4">
      {/* Main Focus: Category/Genre */}
      <div className="text-center mb-6 flex-shrink-0">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 mb-4 text-white shadow-lg shadow-violet-500/30">
            <Film className="w-8 h-8" />
        </div>
        <p className="text-slate-400 text-xs uppercase tracking-widest font-light mb-2">{t('category', language)}</p>
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 uppercase tracking-tight">
          {gameState.currentCategoryName}
        </h2>
      </div>
      
      {/* Voting Section */}
      <div className="flex-shrink-0 mb-4 px-1">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-center justify-center gap-3">
          <Skull className="w-5 h-5 text-rose-500" />
          <div>
            <p className="text-rose-400 font-bold text-sm">{t('execution', language)}</p>
            <p className="text-rose-300/70 text-xs">{t('selectSuspect', language)}</p>
          </div>
        </div>
      </div>

      {/* Players List - Scrollable */}
      <div className="flex-1 overflow-y-auto px-1 min-h-0">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 px-1">
          {t('playersLeft', language)} ({activePlayers.length})
        </p>
        <div className={`grid gap-2 ${isLargeGroup ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {activePlayers.map(player => {
            const isSelected = selectedSuspectId === player.id;
            return (
              <button
                key={player.id}
                onClick={() => setSelectedSuspectId(player.id)}
                className={`group border rounded-xl flex items-center gap-4 relative overflow-hidden transition-all ${isLargeGroup ? 'p-3' : 'p-6'} ${
                  isSelected 
                  ? 'bg-rose-600 border-rose-400 shadow-lg shadow-rose-900/40 scale-[1.02]' 
                  : 'bg-slate-800/40 border-white/5 hover:bg-rose-900/20 hover:border-rose-500/50'
                }`}
              >
                <div className={`rounded-full flex items-center justify-center font-bold border shadow-inner flex-shrink-0 transition-colors ${
                  isSelected 
                  ? 'bg-white text-rose-600 border-transparent' 
                  : 'bg-slate-700 text-slate-300 border-white/10 group-hover:bg-rose-500 group-hover:text-white'
                } ${isLargeGroup ? 'w-10 h-10 text-lg' : 'w-14 h-14 text-2xl'}`}>
                    {player.name.charAt(0).toUpperCase()}
                </div>
                <span className={`font-bold truncate transition-colors ${
                  isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                } ${isLargeGroup ? 'text-sm' : 'text-xl'}`}>{player.name}</span>
                
                {isSelected && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 text-white animate-pulse">
                      <Skull className="w-6 h-6" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex-shrink-0 px-1 pt-2">
        <Button 
          fullWidth 
          onClick={() => selectedSuspectId && handleEliminate(selectedSuspectId)} 
          variant="danger" 
          disabled={!selectedSuspectId}
          className={`shadow-rose-900/20 transition-all duration-300 ${!selectedSuspectId ? 'opacity-50 grayscale' : 'animate-pulse'}`}
        >
          <Skull className="w-5 h-5" /> {t('eliminate', language)}
        </Button>
      </div>
    </div>
  );
};

export default VotingScreen;
