import { useEffect, useRef, useState } from 'react'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { usePlayerStore } from 'src/store/player'
import { CurrentSong } from './player/current-song'
import VolumeControl from './player/volume-control'
import SongControls from './player/song-controls'

export function Player() {
	const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
		(state) => state
	)

	const audioRef = useRef<HTMLAudioElement>(null)
	const volumeRef = useRef(1)

	const handleClick = () => {
		setIsPlaying(!isPlaying)
	}

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}
	}, [isPlaying])

	useEffect(() => {
		if (audioRef.current) audioRef.current.volume = volume
	}, [volume])

	useEffect(() => {
		const { song, playlist, songs } = currentMusic

		if (song) {
			const source = `/music/${playlist.id}/0${song.id}.mp3`

			if (audioRef.current) {
				audioRef.current.src = source
				audioRef.current.volume = volume
				audioRef.current.play()
			}
		}
	}, [currentMusic])

	return (
		<>
			<div className='flex flex-row justify-between w-full px-1 z-50'>
				<div className='w-[200px]'>
					<CurrentSong {...currentMusic.song} />
				</div>

				<div className='grid place-content-center gap-4 flex-1'>
					<div className='flex justify-center flex-col items-center'>
						<button className='bg-white rounded-full p-2' onClick={handleClick}>
							{isPlaying ? (
								<PauseIcon className='w-6 h-6 fill-black' />
							) : (
								<PlayIcon className='w-6 h-6 fill-black' />
							)}
						</button>
						<SongControls audio={audioRef} />
						<audio ref={audioRef} />
					</div>
				</div>

				<div className='grid place-content-center'>
					<VolumeControl />
				</div>
				<audio ref={audioRef} />
			</div>
		</>
	)
}
