import React from 'react';
import { audioService } from '../services/audioService';
import { SoundEffect } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseStyle = "transform transition-all duration-200 active:scale-95 shadow-[0_8px_0_rgb(0,0,0,0.2)] hover:shadow-[0_4px_0_rgb(0,0,0,0.2)] hover:translate-y-1 active:translate-y-2 rounded-3xl font-bold text-2xl flex items-center justify-center gap-3 py-6 px-10";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-400 text-white border-b-blue-700",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border-b-gray-300",
    success: "bg-green-500 hover:bg-green-400 text-white border-b-green-700"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioService.playSound(SoundEffect.CLICK);
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="text-4xl">{icon}</span>}
      {children}
    </button>
  );
};