"use client";
import { create } from "zustand";

interface UIState {
  calendarOpen: boolean;
  toggleCalendar: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  calendarOpen: true,
  toggleCalendar: () => set((s) => ({ calendarOpen: !s.calendarOpen })),
}));
