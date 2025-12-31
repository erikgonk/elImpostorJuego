import { useState, useRef } from 'react';
import { t } from '../translations';
import { Language } from '../types';

export const usePlayers = (language: Language) => {
  const [inputName, setInputName] = useState('');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addPlayer = () => {
    if (inputName.trim()) {
      const name = inputName.trim();
      
      if (playerNames.includes(name)) {
        // Clear existing timeout to prevent early dismissal
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
        
        setErrorMsg(t('playerExists', language));
        setErrorKey(prev => prev + 1); // Force re-render/restart animation
        setInputName('');
        
        // Set new timeout
        errorTimeoutRef.current = setTimeout(() => {
          setErrorMsg(null);
          errorTimeoutRef.current = null;
        }, 3000);
        return;
      }

      setPlayerNames([...playerNames, name]);
      setInputName('');
      
      // Clear error immediately on success
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }
      setErrorMsg(null);
    }
  };

  const removePlayerName = (index: number) => {
    const newNames = [...playerNames];
    newNames.splice(index, 1);
    setPlayerNames(newNames);
  };

  const resetPlayers = () => {
    setPlayerNames([]);
    setInputName('');
  };

  return {
    inputName,
    setInputName,
    playerNames,
    setPlayerNames,
    errorMsg,
    errorKey,
    addPlayer,
    removePlayerName,
    resetPlayers
  };
};
