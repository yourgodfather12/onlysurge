import { create } from 'zustand';
import { Platform, PlatformConnection } from '@/types/dashboard';

interface PlatformState {
  platforms: PlatformConnection[];
  currentPlatform: Platform | 'all';
  isLoading: boolean;
  error: string | null;
  connectedPlatforms: Platform[];
  isConnecting: boolean;
  activePlatform?: Platform;
  setConnectedPlatforms: (platforms: Platform[]) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPlatform: (platform: Platform | 'all') => void;
  addPlatform: (platform: PlatformConnection) => void;
  removePlatform: (platformId: string) => void;
  updatePlatform: (platformId: string, updates: Partial<PlatformConnection>) => void;
  refreshPlatforms: () => Promise<void>;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  platforms: [],
  currentPlatform: 'all',
  isLoading: false,
  error: null,
  connectedPlatforms: [],
  isConnecting: false,

  setConnectedPlatforms: (platforms) => set({ connectedPlatforms: platforms }),
  setIsConnecting: (isConnecting) => set({ isConnecting }),
  setError: (error) => set({ error }),
  setCurrentPlatform: (platform) => set({ currentPlatform: platform }),

  addPlatform: (platform) => set((state) => ({
    platforms: [...state.platforms, platform]
  })),

  removePlatform: (platformId) => set((state) => ({
    platforms: state.platforms.filter((p) => p.id !== platformId)
  })),

  updatePlatform: (platformId, updates) => set((state) => ({
    platforms: state.platforms.map((p) =>
      p.id === platformId ? { ...p, ...updates } : p
    )
  })),

  refreshPlatforms: async () => {
    set({ isLoading: true, error: null });
    try {
      // API call simulation
      const mockPlatforms: PlatformConnection[] = [/* ... */];
      set({ platforms: mockPlatforms, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to refresh platforms', isLoading: false });
    }
  }
})); 