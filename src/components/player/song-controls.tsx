import React, { useEffect, useState } from 'react'
import { Slider } from './slider'

export default function SongControls({
	audio
}: {
	audio: React.Ref<HTMLAudioElement>
}) {
	const [currentTime, setCurrentTime] = useState(0)
	const duration = audio?.current?.duration ?? 0
	useEffect(() => {
		audio.current.addEventListener('timeupdate', handleTimeUpdate)

		return () => {
			audio?.current.removeEventListener('timeupdate', handleTimeUpdate)
		}
	}, [])

	const handleTimeUpdate = () => {
		setCurrentTime(audio?.current.currentTime)
	}

	const formatTime = (time: number) => {
		if (time === null) return '00:00'
		// formateamos los minutos dividiendo los segundos entre 60
		const minutes = Math.floor(time / 60)
		// formateamos los segundos obteniendo el resto de la division de los segundos entre 60
		const seconds = Math.floor(time % 60)

		// convertimos los segundos en un string
		// con el método padStart() aseguramos que los minutos y los segundos tengan dos dígitos y si solo tiene un dígito le agregamos un 0
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	return (
		<div className='flex gap-x-3 pt-2'>
			<span className='opacity-50 w-12 text-right'>{formatTime(currentTime)}</span>

			<Slider
				defaultValue={[0]}
				value={[currentTime]}
				max={duration}
				min={0}
				className='w-[400px]'
				onValueChange={(value: any) => {
					if (audio) audio.current.currentTime = value
				}}
			/>

			<span className='opacity-50 w-12'>
				{duration ? formatTime(duration) : '00:00'}
			</span>
		</div>
	)
}
