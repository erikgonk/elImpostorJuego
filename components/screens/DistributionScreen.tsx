import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Fingerprint,
  Skull,
  CheckCircle2
} from 'lucide-react';
import Button from '../Button';
import { t } from '../../translations';
import { GameState, Language, GameSettings } from '../../types';

interface DistributionScreenProps {
  gameState: GameState;
  distributionIndex: number;
  handleRevealNext: () => void;
  handleDistributionDone: () => void;
  language: Language;
  settings: GameSettings;
}

const DistributionScreen: React.FC<DistributionScreenProps> = ({
  gameState,
  distributionIndex,
  handleRevealNext,
  handleDistributionDone,
  language,
  settings
}) => {
  const renderDistributionPass = () => {
    const player = gameState.players[distributionIndex];
    return (
      <div className="flex flex-col items-center justify-center h-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-900 -z-10"></div>
        
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="text-center space-y-4 mb-10">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-light">{t('passDeviceTo', language)}</p>
            <h2 className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] px-4">{player.name}</h2>
          </div>
          
          <div onClick={handleRevealNext} className="cursor-pointer w-48 h-48 bg-slate-800/50 rounded-full flex items-center justify-center mb-12 border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.2)] animate-pulse hover:scale-105 transition-transform">
            <Fingerprint className="w-24 h-24 text-violet-500" />
          </div>
        </div>

        <div className="w-full max-w-xs pb-6">
          <Button onClick={handleRevealNext} fullWidth className="text-lg">
            <Eye className="w-6 h-6" /> {t('seeRole', language)}
          </Button>
        </div>
      </div>
    );
  };

  const renderDistributionReveal = () => {
    const player = gameState.players[distributionIndex];
    const isImpostor = player.role === 'impostor';
    
    // Get other impostors for the "impostors know each other" feature
    const otherImpostors = settings.impostorKnowsOthers && isImpostor
      ? gameState.players.filter(p => p.role === 'impostor' && p.id !== player.id)
      : [];

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
                    {otherImpostors.length > 0 && (
                      <div className="py-2 px-4 rounded-lg bg-rose-950/50 border border-rose-500/20">
                        <p className="text-rose-300 font-medium text-xs mb-2">{t('otherImpostors', language)}:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {otherImpostors.map(imp => (
                            <span key={imp.id} className="px-2 py-1 bg-rose-500/20 rounded-full text-rose-200 text-xs font-bold">
                              {imp.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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

  return gameState.status === 'distribution_pass' ? renderDistributionPass() : renderDistributionReveal();
};

export default DistributionScreen;
