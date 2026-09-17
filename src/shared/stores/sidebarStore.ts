import { create } from "zustand";

interface SidebarState {
  collapsed: boolean;
  isPinned: boolean;
  setCollapsed: (collapsed: boolean) => void;
  togglePinned: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: true,
  isPinned: false,
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
  togglePinned: () =>
    set((state) => ({
      isPinned: !state.isPinned,
      collapsed: state.isPinned,
    })),
}));
