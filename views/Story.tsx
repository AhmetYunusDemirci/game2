import React, { useEffect, useState } from 'react';
import { Character } from '../types';
import { generateStory } from '../services/geminiService';
import { audioService } from '../services/audioService';
import { Button } from '../components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StoryProps {
  character: Character;
  onNext: () => void;
}

export const Story: React.FC<StoryProps> = ({ character, onNext }) => {
  const [storyText, setStoryText] = useState<string>("Hikaye hazırlanıyor...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
        // Fallback text initially while fetching
        audioService.speak(`${character.name} ile maceraya hazır mısın?`);
        
        try {
            const text = await generateStory(character.name, character.description);
            setStoryText(text);
            setLoading(false);
            // Play the AI generated story
            setTimeout(() => {
                 audioService.speak(text);
            }, 500);
        } catch (e) {
            setStoryText("Maceramız başlıyor!");
            setLoading(false);
        }
    };
    loadStory();
  }, [character]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-indigo-900 p-8 text-center">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl border-4 border-white/20 shadow-2xl pop-in">
        <div className="text-9xl mb-6 animate-bounce">{character.emoji}</div>
        
        {loading ? (
           <div className="flex flex-col items-center gap-4 text-white">
             <Sparkles className="animate-spin" size={48} />
             <p className="text-2xl">Büyülü sözler yazılıyor...</p>
           </div>
        ) : (
          <>
            <p className="text-white text-3xl font-medium leading-relaxed mb-8">
              {storyText}
            </p>
            <Button onClick={onNext} variant="success" icon={<ArrowRight />}>
              Devam Et
            </Button>
          </>
        )}
      </div>
    </div>
  );
};