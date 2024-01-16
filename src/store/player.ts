import { create } from 'zustand'

interface MusicData {
	playlist: any
	song: any
	songs: []
}

type State = {
	isPlaying: boolean
	currentMusic: MusicData
	volume: number
}

type Actions = {
	setIsPlaying: (isPlaying: boolean) => void
	setCurrentMusic: (currentMusic: MusicData) => void
	setVolume: (volume: number) => void
}
export const usePlayerStore = create<State & Actions>((set) => ({
	isPlaying: false,
	currentMusic: { playlist: null, song: null, songs: [] },
	volume: 1,

	setIsPlaying: (isPlaying) => set({ isPlaying }),
	setCurrentMusic: (currentMusic) => set({ currentMusic }),
	setVolume: (volume) => set({ volume })
}))
