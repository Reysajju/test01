import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  isAdmin: boolean;
  englishAccuracy: number[];
  mathScore: number;
  gameLevel: number;
  gameScore: number;
  setName: (name: string) => void;
  updateEnglishAccuracy: (accuracy: number) => void;
  updateMathScore: (score: number) => void;
  updateGameProgress: (level: number, score: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      isAdmin: false,
      englishAccuracy: [],
      mathScore: 0,
      gameLevel: 1,
      gameScore: 0,
      setName: (name) => set({ name }),
      updateEnglishAccuracy: (accuracy) =>
        set((state) => ({
          englishAccuracy: [...state.englishAccuracy, accuracy],
        })),
      updateMathScore: (score) =>
        set((state) => ({ mathScore: state.mathScore + score })),
      updateGameProgress: (level, score) =>
        set({ gameLevel: level, gameScore: score }),
    }),
    {
      name: 'user-storage',
    }
  )
);