import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { usePlayerStore } from 'src/store/player'

interface Props {
	id?: string
	size: string
}

export function CardPlayButton({ id, size }: Props) {
	const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(
		(state) => state
	)

	const isPlayingPlaylist = isPlaying && currentMusic.playlist.id === id

	const handleClick = async () => {
		if (isPlayingPlaylist) {
			setIsPlaying(false)
			return
		}

		// fetch(`/api/get-info-playlist.json?id=${id}`)
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		const { songs, playlist } = data

		// 		setIsPlaying(true)
		// 		setCurrentMusic({ songs, playlist, song: songs[0] })

		// 		console.log({ songs, playlist })
		// 	})

		try {
			const res = await fetch(`/api/get-info-playlist.json?id=${id}`)
			const data = await res.json()

			const { songs, playlist } = data

			setIsPlaying(true)
			setCurrentMusic({ songs, playlist, song: songs[0] })
		} catch (error) {
			console.log('🚀 ~ file: card-play-button.tsx:37 ~ handleClick ~ error:', error)
		}
	}

	return (
		<button
			onClick={handleClick}
			className='rounded-full bg-green-500 hover:bg-green-400 hover:scale-110 transition-all p-4'
		>
			{isPlayingPlaylist ? (
				<PauseIcon
					className={`fill-black ${size === 'large' ? 'w-7 h-7' : 'w-5 h-5'}`}
				/>
			) : (
				<PlayIcon
					className={`fill-black ${size === 'large' ? 'w-7 h-7' : 'w-5 h-5'}`}
				/>
			)}
		</button>
	)
}
