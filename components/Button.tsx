import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-2xl font-bold tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group";
  
  const variants = {
    // Electric Violet Gradient
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/50 hover:shadow-violet-600/50 border border-violet-500/20",
    // Glassy White
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
    // Neon Red
    danger: "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/50 hover:shadow-rose-600/50 border border-rose-500/20",
    // Ghost
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none blur-xl"></div>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;