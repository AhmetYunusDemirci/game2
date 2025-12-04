import React, { useEffect } from 'react';
import { CHARACTERS } from '../constants';
import { Character } from '../types';
import { audioService } from '../services/audioService';
import { SoundEffect } from '../types';

interface CharacterSelectProps {
  onSelect: (char: Character) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
  useEffect(() => {
    audioService.speak("Lütfen bir arkadaş seç.");
  }, []);

  const handleSelect = (char: Character) => {
    audioService.playSound(SoundEffect.POP);
    audioService.speak(`${char.name} seçildi! Harika!`);
    onSelect(char);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-yellow-50 p-4">
      <h2 className="text-4xl font-bold text-orange-500 mb-10 drop-shadow-md">Karakterini Seç</h2>
      
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-4xl">
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={() => handleSelect(char)}
            className={`${char.color} wiggle aspect-square rounded-3xl shadow-[0_10px_0_rgba(0,0,0,0.2)] 
              active:translate-y-2 active:shadow-none transition-all
              flex flex-col items-center justify-center p-6`}
          >
            <div className="text-7xl mb-2 drop-shadow-lg">{char.emoji}</div>
            <span className="text-white font-bold text-xl tracking-wide uppercase">{char.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};