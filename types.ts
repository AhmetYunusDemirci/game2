export enum AppStage {
  INTRO = 'INTRO',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  STORY = 'STORY',
  GAME_LEVEL_1 = 'GAME_LEVEL_1',
  GAME_LEVEL_2 = 'GAME_LEVEL_2',
  REWARD = 'REWARD',
}

export interface Character {
  id: string;
  name: string;
  color: string;
  emoji: string;
  description: string;
}

export interface PuzzleItem {
  id: string;
  content: string; // Emoji or image URL
  matchId: string;
  type: 'source' | 'target';
  isMatched?: boolean;
  color?: string;
}

export interface DragItem {
  id: string;
  type: string;
}

export enum SoundEffect {
  CLICK = 'click',
  SUCCESS = 'success',
  POP = 'pop',
  ERROR = 'error'
}