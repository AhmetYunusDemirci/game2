import React, { useEffect } from 'react';
import { Button } from '../components/Button';
import { audioService } from '../services/audioService';
import { Play } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
  useEffect(() => {
    // Attempt to say welcome, though browser might block until interaction
    // We will rely on the button click mainly
  }, []);

  const handleStart = () => {
    audioService.initAudioContext();
    audioService.speak("Merhaba! Oyuna başlamak için tıkla.");
    setTimeout(onStart, 1000);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-100 p-4">
      <div className="mb-10 text-center animate-bounce">
        <h1 className="text-6xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] stroke-black tracking-wider mb-4">
          RENKLİ<br/>DÜNYA
        </h1>
        <div className="flex gap-4 justify-center text-6xl mt-4">
          <span className="animate-pulse delay-75">🎨</span>
          <span className="animate-pulse delay-150">🦁</span>
          <span className="animate-pulse delay-300">🧩</span>
        </div>
      </div>
      
      <Button onClick={handleStart} variant="success" icon={<Play size={40} />}>
        OYNA
      </Button>
    </div>
  );
};