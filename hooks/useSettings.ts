import { useState } from 'react';
import { GameSettings, Language } from '../types';

export const useSettings = () => {
  const [language, setLanguage] = useState<Language>('es');
  const [settings, setSettings] = useState<GameSettings>({
    impostorCount: 1,
    selectedCategory: 'random',
    impostorKnowsOthers: false,
    revealRoleAfterVote: true,
  });
  const [isImpostorCountManual, setIsImpostorCountManual] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  return {
    language,
    setLanguage,
    settings,
    setSettings,
    isImpostorCountManual,
    setIsImpostorCountManual,
    showAllCategories,
    setShowAllCategories
  };
};
