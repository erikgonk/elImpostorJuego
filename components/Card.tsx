import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-slate-800/40 
        backdrop-blur-xl 
        border border-white/5 
        rounded-3xl 
        p-6 
        shadow-xl 
        shadow-black/20
        ${onClick ? 'cursor-pointer hover:bg-slate-700/50 hover:border-white/10 transition-all duration-300' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;