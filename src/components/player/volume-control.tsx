import { Slider } from './slider'
import { usePlayerStore } from 'src/store/player'
import { MaxVolumeIcon, MediumVolumeIcon, OffVolumeIcon } from '../icons/icons'
import { useRef } from 'react'

export default function VolumeControl() {
	const { volume, setVolume } = usePlayerStore((state) => state)
	const previousVolumeRef = useRef(volume)

	const isVolumeSilenced = volume < 0.1

	const handleClickSilence = () => {
		if (isVolumeSilenced) {
			// si el volumen es menor a 0.1 entonces lo seteamos a su valor anterior
			setVolume(previousVolumeRef.current)
		} else {
			//si el volumen es mayor a 0.1 entonces guardamos en la referencia el valor de volumen anterior
			// y seteamos el volumen a 0
			previousVolumeRef.current = volume
			setVolume(0)
		}
	}
	return (
		<div className='flex justify-center gap-x-2'>
			<button
				className='opacity-80 hover:opacity-95 transition-opacity duration-100'
				onClick={handleClickSilence}
			>
				{volume === 0 && <OffVolumeIcon />}
				{volume > 0 && volume < 0.5 && <MediumVolumeIcon />}
				{volume >= 0.5 && <MaxVolumeIcon />}
			</button>
			<Slider
				defaultValue={[100]}
				max={100}
				min={0}
				value={[volume * 100]}
				className='w-[95px]'
				onValueChange={(value: any) => {
					const [newValue] = value
					const volumeValue = newValue / 100
					setVolume(volumeValue)
				}}
			/>
		</div>
	)
}
