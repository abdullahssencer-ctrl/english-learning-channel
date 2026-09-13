// src/store/useStore.js
import create from 'zustand';
import { devtools } from 'zustand/middleware';

// Global state: user, xp, streak, darkMode, lastStoryId, etc.
const useStore = create(devtools((set, get) => ({
  highlightedWordId: null,
  setHighlightedWordId: (id) => set({ highlightedWordId: id }),
  user: null,
  setUser: (user) => set({ user }),

  xp: 0,
  streak: 0,
  lastCompletedDate: null,
  addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  incrementStreak: () => {
    const today = new Date().toISOString().split('T')[0];
    const { lastCompletedDate, streak } = get();
    if (lastCompletedDate === today) return; // already counted today
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const newStreak = lastCompletedDate === yesterdayStr ? streak + 1 : 1;
    set({ streak: newStreak, lastCompletedDate: today });
  },

  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  lastStoryId: null,
  setLastStoryId: (id) => set({ lastStoryId: id }),
}));

export default useStore;
