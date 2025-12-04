import React, { useState } from 'react';
import { AppStage, Character } from './types';
import { Intro } from './views/Intro';
import { CharacterSelect } from './views/CharacterSelect';
import { Story } from './views/Story';
import { Game } from './views/Game';
import { Reward } from './views/Reward';
import { LEVEL_1_DATA, LEVEL_1_TARGETS, LEVEL_2_DATA, LEVEL_2_TARGETS } from './constants';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [character, setCharacter] = useState<Character | null>(null);

  const handleStart = () => setStage(AppStage.CHARACTER_SELECT);
  
  const handleCharacterSelect = (char: Character) => {
    setCharacter(char);
    setTimeout(() => setStage(AppStage.STORY), 1000); // Small delay for audio to finish
  };

  const handleStoryNext = () => setStage(AppStage.GAME_LEVEL_1);
  const handleLevel1Complete = () => setStage(AppStage.GAME_LEVEL_2);
  const handleLevel2Complete = () => setStage(AppStage.REWARD);
  
  const handleRestart = () => {
    setCharacter(null);
    setStage(AppStage.INTRO);
  };

  return (
    <div className="antialiased text-gray-800">
      {stage === AppStage.INTRO && (
        <Intro onStart={handleStart} />
      )}

      {stage === AppStage.CHARACTER_SELECT && (
        <CharacterSelect onSelect={handleCharacterSelect} />
      )}

      {stage === AppStage.STORY && character && (
        <Story character={character} onNext={handleStoryNext} />
      )}

      {stage === AppStage.GAME_LEVEL_1 && (
        <Game 
          levelData={LEVEL_1_DATA} 
          targetsData={LEVEL_1_TARGETS} 
          onComplete={handleLevel1Complete}
          instruction="Rengi bul! Meyve hangi renk?"
        />
      )}

      {stage === AppStage.GAME_LEVEL_2 && (
        <Game 
          levelData={LEVEL_2_DATA} 
          targetsData={LEVEL_2_TARGETS} 
          onComplete={handleLevel2Complete}
          instruction="Bu hayvan neyi sever? Eşleştir!"
        />
      )}

      {stage === AppStage.REWARD && character && (
        <Reward character={character} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;