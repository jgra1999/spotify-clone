interface Props {
	image: string
	title: string
	artists: string[]
}

export function CurrentSong({ image, title, artists }: Props) {
	return (
		<div className='flex items-center gap-5 relative overflow-hidden'>
			<picture className='w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden'>
				<img src={image} alt={`Song - ${title}`} />
			</picture>

			<div className='flex flex-col'>
				<h3 className='font-semibold text-sm'>{title}</h3>

				<span className='text-xs opacity-60'>{artists?.join(',')}</span>
			</div>
		</div>
	)
}
