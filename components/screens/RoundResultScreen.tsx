import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import Button from '../Button';
import { t } from '../../translations';
import { GameState, Language, GameSettings } from '../../types';

interface RoundResultScreenProps {
  gameState: GameState;
  language: Language;
  nextRound: () => void;
  settings: GameSettings;
}

const RoundResultScreen: React.FC<RoundResultScreenProps> = ({
  gameState,
  language,
  nextRound,
  settings
}) => {
  const eliminatedPlayer = gameState.players.find(p => p.id === gameState.eliminatedPlayerId);
  const wasImpostor = eliminatedPlayer?.role === 'impostor';
  const showRole = settings.revealRoleAfterVote;

  return (
    <div className="flex flex-col items-center h-full text-center px-4 relative">
       {/* Background Glow */}
       <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${
         showRole 
           ? (wasImpostor ? 'from-emerald-500 via-transparent' : 'from-rose-500 via-transparent')
           : 'from-slate-500 via-transparent'
       } to-transparent -z-10`}></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="space-y-2 mb-8">
            <p className="text-slate-400 text-sm uppercase tracking-widest">{t('eliminatedSubject', language)}</p>
            <h2 className="text-3xl font-black text-white">{eliminatedPlayer?.name}</h2>
          </div>

          <div className={`w-40 h-40 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 mb-8 ${
            showRole
              ? (wasImpostor ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 'bg-rose-900/20 border-rose-500 text-rose-500')
              : 'bg-slate-800/50 border-slate-500 text-slate-400'
          }`}>
            {showRole ? (
              wasImpostor ? <CheckCircle2 className="w-20 h-20" /> : <AlertTriangle className="w-20 h-20" />
            ) : (
              <HelpCircle className="w-20 h-20" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className={`text-2xl font-black uppercase tracking-tight ${
              showRole
                ? (wasImpostor ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]')
                : 'text-slate-300'
            }`}>
              {showRole 
                ? (wasImpostor ? t('impostorEliminated', language) : t('wasAlly', language))
                : t('playerEliminated', language)
              }
            </h3>
            <p className="text-slate-300 font-light text-sm">
              {showRole
                ? (wasImpostor ? t('threatNeutralized', language) : t('errorImpostorActive', language))
                : t('identityHidden', language)
              }
            </p>
          </div>
      </div>

      <div className="w-full max-w-xs pb-6 flex-shrink-0">
          <Button fullWidth onClick={nextRound} variant={showRole && wasImpostor ? 'primary' : 'secondary'}>
          {t('continueMission', language)}
          </Button>
      </div>
    </div>
  );
};

export default RoundResultScreen;
