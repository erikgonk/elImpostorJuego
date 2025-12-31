import React from 'react';
import { 
  HelpCircle, 
  X
} from 'lucide-react';
import Button from '../Button';
import { t } from '../../translations';
import { Language } from '../../types';

interface HowToPlayModalProps {
  language: Language;
  setShowHowToPlay: (show: boolean) => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  language,
  setShowHowToPlay
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl shadow-violet-900/20 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/5 bg-slate-800/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-violet-400" />
            {t('howToPlayTitle', language)}
          </h2>
          <button 
            onClick={() => setShowHowToPlay(false)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold border border-violet-500/30">1</div>
            <div>
              <h3 className="font-bold text-white mb-1">{t('step1Title', language)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t('step1Desc', language)}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/30">2</div>
            <div>
              <h3 className="font-bold text-white mb-1">{t('step2Title', language)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t('step2Desc', language)}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold border border-rose-500/30">3</div>
            <div>
              <h3 className="font-bold text-white mb-1">{t('step3Title', language)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t('step3Desc', language)}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold border border-yellow-500/30">4</div>
            <div>
              <h3 className="font-bold text-white mb-1">{t('step4Title', language)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t('step4Desc', language)}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/5 bg-slate-800/30">
          <Button fullWidth onClick={() => setShowHowToPlay(false)}>
            {t('close', language)}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default HowToPlayModal;
