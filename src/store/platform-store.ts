import { create } from 'zustand';
import { Platform } from '@/types/dashboard';

export const defaultPlatforms: Platform[] = [
  {
    id: 'onlyfans',
    name: 'OnlyFans',
    status: 'online',
    icon: '/platforms/onlyfans.svg',
  },
  {
    id: 'fansly',
    name: 'Fansly',
    status: 'online',
    icon: '/platforms/fansly.svg',
  },
  {
    id: 'manyvids',
    name: 'ManyVids',
    status: 'online',
    icon: '/platforms/manyvids.svg',
  },
]

interface PlatformState {
  currentPlatform: Platform | 'all'
  platforms: Platform[]
  setCurrentPlatform: (platform: Platform | 'all') => void
  setPlatforms: (platforms: Platform[]) => void
}

export const usePlatformStore = create<PlatformState>((set) => ({
  currentPlatform: 'all',
  platforms: defaultPlatforms,
  setCurrentPlatform: (platform) => set({ currentPlatform: platform }),
  setPlatforms: (platforms) => set({ platforms }),
})) 