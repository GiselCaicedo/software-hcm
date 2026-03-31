import { create } from "zustand";

interface TopBarActions {
  openImport: () => void;
  openIA: () => void;
}

interface TopBarActionsStore {
  actions: TopBarActions | null;
  setActions: (actions: TopBarActions | null) => void;
}

export const useTopBarActions = create<TopBarActionsStore>()((set) => ({
  actions: null,
  setActions: (actions) => set({ actions }),
}));
