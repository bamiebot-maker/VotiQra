import { create } from 'zustand';

interface AppStore {
  selectedOrganizationId: string | null;
  setSelectedOrganizationId: (id: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedOrganizationId: null,
  setSelectedOrganizationId: (id: string | null) => set({ selectedOrganizationId: id }),
}));
