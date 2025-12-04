import { Character } from './types';

export const CHARACTERS: Character[] = [
  { id: 'c1', name: 'Pamuk', color: 'bg-pink-400', emoji: '🐰', description: 'Tavşan' },
  { id: 'c2', name: 'Boncuk', color: 'bg-blue-400', emoji: '🐱', description: 'Kedi' },
  { id: 'c3', name: 'Cesur', color: 'bg-orange-400', emoji: '🦁', description: 'Aslan' },
  { id: 'c4', name: 'Zıpzıp', color: 'bg-green-400', emoji: '🐸', description: 'Kurbağa' },
];

export const LEVEL_1_DATA = [
  { id: 's1', content: '🍎', matchId: 'm1', type: 'source', color: 'bg-red-500' },
  { id: 's2', content: '🍌', matchId: 'm2', type: 'source', color: 'bg-yellow-400' },
  { id: 's3', content: '🍇', matchId: 'm3', type: 'source', color: 'bg-purple-600' },
];

export const LEVEL_1_TARGETS = [
  { id: 'm2', content: '🟡', matchId: 's2', type: 'target', color: 'bg-yellow-200' },
  { id: 'm3', content: '🟣', matchId: 's3', type: 'target', color: 'bg-purple-200' },
  { id: 'm1', content: '🔴', matchId: 's1', type: 'target', color: 'bg-red-200' },
];

export const LEVEL_2_DATA = [
  { id: 'a1', content: '🐶', matchId: 'b1', type: 'source', color: 'bg-amber-700' },
  { id: 'a2', content: '🐝', matchId: 'b2', type: 'source', color: 'bg-yellow-500' },
  { id: 'a3', content: '🐟', matchId: 'b3', type: 'source', color: 'bg-blue-500' },
];

export const LEVEL_2_TARGETS = [
  { id: 'b3', content: '🌊', matchId: 'a3', type: 'target', color: 'bg-blue-200' }, // Fish -> Water
  { id: 'b1', content: '🦴', matchId: 'a1', type: 'target', color: 'bg-amber-200' }, // Dog -> Bone
  { id: 'b2', content: '🍯', matchId: 'a2', type: 'target', color: 'bg-yellow-100' }, // Bee -> Honey
];