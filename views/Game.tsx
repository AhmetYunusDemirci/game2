import React, { useState, useEffect } from 'react';
import { PuzzleItem, SoundEffect } from '../types';
import { audioService } from '../services/audioService';
import { Button } from '../components/Button';
import { ArrowRight, RefreshCcw } from 'lucide-react';

interface GameProps {
  levelData: PuzzleItem[];
  targetsData: PuzzleItem[];
  onComplete: () => void;
  instruction: string;
}

export const Game: React.FC<GameProps> = ({ levelData, targetsData, onComplete, instruction }) => {
  const [sources, setSources] = useState<PuzzleItem[]>(levelData);
  const [targets, setTargets] = useState<PuzzleItem[]>(targetsData);
  const [draggedItem, setDraggedItem] = useState<PuzzleItem | null>(null);
  const [matches, setMatches] = useState<Record<string, boolean>>({});
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  useEffect(() => {
    audioService.speak(instruction);
    // Shuffle sources for randomness
    setSources([...levelData].sort(() => Math.random() - 0.5));
  }, [levelData, instruction]);

  useEffect(() => {
    // Check win condition
    const allMatched = targets.every(t => matches[t.id]);
    if (allMatched && !isLevelComplete) {
      setIsLevelComplete(true);
      audioService.playSound(SoundEffect.SUCCESS);
      audioService.speak("Tebrikler! Hepsini buldun!");
    }
  }, [matches, targets, isLevelComplete]);

  // Touch/Mouse Handlers
  const handleDragStart = (item: PuzzleItem) => {
    if (matches[item.matchId] || matches[item.id]) return; // Already matched
    setDraggedItem(item);
    audioService.playSound(SoundEffect.POP);
  };

  const handleDrop = (targetItem: PuzzleItem) => {
    if (!draggedItem) return;
    
    // Check if it's a match
    if (draggedItem.matchId === targetItem.id) {
      // Correct match
      audioService.playSound(SoundEffect.SUCCESS);
      setMatches(prev => ({ ...prev, [targetItem.id]: true, [draggedItem.id]: true }));
    } else {
      // Wrong match
      audioService.playSound(SoundEffect.ERROR);
    }
    setDraggedItem(null);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-green-100 p-4 relative overflow-hidden">
      {/* Confetti effect if complete could go here */}
      
      <div className="flex-1 flex flex-col justify-center items-center gap-12 max-w-5xl mx-auto w-full">
        
        {/* Source Row (Draggables) */}
        <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
          {sources.map(item => {
            const isMatched = Object.keys(matches).some(key => matches[key] && (key === item.id || matches[item.matchId])); // Simplified logic check
            if (isMatched) return <div key={item.id} className="w-24 h-24 md:w-32 md:h-32" />; // Placeholder to keep layout stable

            return (
              <div
                key={item.id}
                draggable={!isMatched}
                onDragStart={() => handleDragStart(item)}
                onTouchStart={() => handleDragStart(item)}
                // For simplified touch logic, we'd need global touch move tracking, 
                // but for this snippet we rely on click-click or desktop drag for robustness in XML constraint.
                // Let's implement a simple "Click Source then Click Target" for reliability on all devices
                onClick={() => handleDragStart(item)}
                className={`
                  ${item.color} w-24 h-24 md:w-32 md:h-32 rounded-full 
                  flex items-center justify-center text-5xl md:text-6xl cursor-pointer
                  shadow-[0_8px_0_rgba(0,0,0,0.2)] transition-transform
                  ${draggedItem?.id === item.id ? 'scale-110 ring-4 ring-white animate-pulse' : 'hover:scale-105'}
                `}
              >
                {item.content}
              </div>
            );
          })}
        </div>

        <div className="text-center opacity-50 font-bold text-gray-500">
          👇 Eşleştir 👇
        </div>

        {/* Target Row (Droppables) */}
        <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
          {targets.map(target => {
             const isMatched = matches[target.id];

             return (
              <div
                key={target.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(target)}
                onClick={() => { if(draggedItem) handleDrop(target); }}
                className={`
                  ${target.color} w-24 h-24 md:w-32 md:h-32 rounded-2xl
                  flex items-center justify-center text-5xl md:text-6xl transition-all
                  border-4 border-dashed border-gray-400
                  ${isMatched ? 'border-solid border-white scale-110 shadow-lg !bg-green-400' : ''}
                `}
              >
                {/* Show content only if matched or if it's the target visual (like a shadow or color) */}
                {isMatched ? '✅' : target.content} 
              </div>
            );
          })}
        </div>
      </div>

      {isLevelComplete && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 pop-in">
          <div className="bg-white p-8 rounded-3xl text-center shadow-2xl flex flex-col items-center gap-6">
            <div className="text-8xl animate-bounce">⭐</div>
            <h2 className="text-4xl font-bold text-green-600">Harika İş!</h2>
            <Button onClick={onComplete} variant="success" icon={<ArrowRight />}>
              Sıradaki
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};