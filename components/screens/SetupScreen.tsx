import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  Play, 
  Plus,
  AlertTriangle,
  Ghost,
  HelpCircle,
  ChevronLeft,
  Skull,
  Film,
  Shuffle,
  ChevronDown,
  X
} from 'lucide-react';
import Button from '../Button';
import { t } from '../../translations';
import { Language, GameSettings } from '../../types';
import { getCategories, MIN_PLAYERS } from '../../constants';

interface SetupScreenProps {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  playerNames: string[];
  addPlayer: () => void;
  removePlayerName: (index: number) => void;
  inputName: string;
  setInputName: (name: string) => void;
  errorMsg: string | null;
  errorKey: number;
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  setIsImpostorCountManual: React.Dispatch<React.SetStateAction<boolean>>;
  showAllCategories: boolean;
  setShowAllCategories: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
  setShowHowToPlay: (show: boolean) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({
  language,
  setLanguage,
  playerNames,
  addPlayer,
  removePlayerName,
  inputName,
  setInputName,
  errorMsg,
  errorKey,
  settings,
  setSettings,
  setIsImpostorCountManual,
  showAllCategories,
  setShowAllCategories,
  startGame,
  setShowHowToPlay
}) => {
  const [setupView, setSetupView] = useState<'main' | 'settings'>('main');

  const renderSetupMain = () => (
    <div className="flex flex-col h-full py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0 px-2">
        <button 
          onClick={() => setShowHowToPlay(true)}
          className="p-2 text-slate-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
          title={t('howToPlay', language)}
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Ghost className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {t('appTitle', language)}
          </h1>
        </div>
        
        <button 
          onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')}
          className="p-2 text-xs font-bold text-slate-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* Players List - Takes available space */}
      <div className="flex-1 overflow-y-auto px-1 min-h-0 mb-4">
        {playerNames.length > 0 ? (
          <div className="flex flex-wrap gap-2 content-start">
            {playerNames.map((name, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 pl-3 pr-1.5 py-2 bg-slate-800/80 rounded-full border border-white/10 animate-fade-in group"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-slate-200 text-sm">{name}</span>
                <button 
                  onClick={() => removePlayerName(idx)} 
                  className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
            <Users className="w-16 h-16 text-slate-600 mb-4" />
            <p className="text-slate-400 text-sm max-w-[200px]">
              {t('addMinPlayers', language, MIN_PLAYERS)}
            </p>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom above buttons */}
      <div className="flex-shrink-0 px-1 mb-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            placeholder={t('addPlayerPlaceholder', language)}
            className="flex-1 px-4 py-3.5 rounded-2xl border border-white/10 bg-slate-800/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-base"
          />
          <button 
            onClick={addPlayer}
            className="bg-violet-600 text-white p-3.5 rounded-2xl hover:bg-violet-500 active:scale-95 transition-all shadow-lg shadow-violet-900/30"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        
        {errorMsg && (
          <div 
            key={errorKey}
            className="mt-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-400 text-sm animate-[fadeOut_3s_ease-in-out_forwards]"
          >
            <style>
              {`
                @keyframes fadeOut {
                  0% { opacity: 1; }
                  70% { opacity: 1; }
                  100% { opacity: 0; }
                }
              `}
            </style>
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-3 px-1 flex-shrink-0">
        <Button 
          variant="secondary"
          onClick={() => setSetupView('settings')}
          className="flex-1 py-4"
        >
          <Settings className="w-5 h-5" /> {t('openSettings', language)}
        </Button>
        
        <Button 
          onClick={startGame} 
          disabled={playerNames.length < MIN_PLAYERS}
          className={`flex-[2] py-4 text-base ${playerNames.length < MIN_PLAYERS ? 'opacity-40 cursor-not-allowed' : 'shadow-xl shadow-violet-900/40'}`}
        >
          <Play className="w-5 h-5 fill-current" /> {t('startMission', language)}
        </Button>
      </div>
    </div>
  );

  const renderSetupSettings = () => {
    const categories = getCategories(language);
    const displayedCategories = showAllCategories ? categories : categories.slice(0, 5);
    
    return (
      <div className="flex flex-col h-full py-6">
        {/* Header */}
        <div className="flex items-center mb-6 px-2">
          <button 
            onClick={() => setSetupView('main')}
            className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-white ml-2">{t('settings', language)}</h2>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto px-1 space-y-4 min-h-0">
          
          {/* Impostors Count */}
          <div className="bg-slate-800/40 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <Skull className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t('impostors', language)}</p>
                <p className="text-slate-500 text-xs">{settings.impostorCount === 1 ? '1 impostor' : `${settings.impostorCount} impostores`}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => {
                    setSettings(s => ({...s, impostorCount: num}));
                    setIsImpostorCountManual(true);
                  }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    settings.impostorCount === num 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' 
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="bg-slate-800/40 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Film className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t('categorySelection', language)}</p>
                <p className="text-slate-500 text-xs">
                  {settings.selectedCategory === 'random' 
                    ? t('random', language) 
                    : categories.find(c => c.id === settings.selectedCategory)?.name || t('random', language)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSettings(s => ({...s, selectedCategory: 'random'}))}
                className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  settings.selectedCategory === 'random' 
                  ? 'bg-violet-600 text-white shadow-lg' 
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <Shuffle className="w-3 h-3" />
                {t('random', language)}
              </button>
              {displayedCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSettings(s => ({...s, selectedCategory: cat.id}))}
                  className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all truncate ${
                    settings.selectedCategory === cat.id 
                    ? 'bg-violet-600 text-white shadow-lg' 
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            {categories.length > 5 && (
              <button 
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="w-full mt-2 py-2 text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                {showAllCategories ? (
                  <>
                    {t('showLess', language)} <ChevronDown className="w-3 h-3 rotate-180" />
                  </>
                ) : (
                  <>
                    {t('showAll', language)} <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Impostor Knows Others */}
          <div className="bg-slate-800/40 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                  <Ghost className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('impostorKnowsOthers', language)}</p>
                  <p className="text-slate-500 text-xs">{t('impostorKnowsOthersDesc', language)}</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(s => ({...s, impostorKnowsOthers: !s.impostorKnowsOthers}))}
                className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
                  settings.impostorKnowsOthers 
                  ? 'bg-violet-600 justify-end' 
                  : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>
          </div>

          {/* Reveal Role After Vote */}
          <div className="bg-slate-800/40 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('revealRoleAfterVote', language)}</p>
                  <p className="text-slate-500 text-xs">{t('revealRoleAfterVoteDesc', language)}</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(s => ({...s, revealRoleAfterVote: !s.revealRoleAfterVote}))}
                className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
                  settings.revealRoleAfterVote 
                  ? 'bg-violet-600 justify-end' 
                  : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex-shrink-0 px-1 flex gap-3">
          <Button 
            variant="secondary"
            onClick={() => setSetupView('main')}
            className="flex-1 py-4"
          >
            {t('back', language)}
          </Button>
          
          <Button 
            onClick={startGame} 
            disabled={playerNames.length < MIN_PLAYERS}
            className={`flex-[2] py-4 text-base ${playerNames.length < MIN_PLAYERS ? 'opacity-40 cursor-not-allowed' : 'shadow-xl shadow-violet-900/40'}`}
          >
            <Play className="w-5 h-5 fill-current" /> {t('startMission', language)}
          </Button>
        </div>
      </div>
    );
  };

  return setupView === 'main' ? renderSetupMain() : renderSetupSettings();
};

export default SetupScreen;
