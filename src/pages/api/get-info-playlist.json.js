import { allPlaylists, songs as allSongs } from '@/libs/data'

export async function GET({ params, request }) {
	// const {id} = params;

	// get the id from the url search params
	const urlObject = new URL(request.url)
	const id = urlObject.searchParams.get('id')

	const playlist = allPlaylists.find((p) => p.id === id)
	const songs = allSongs.filter((s) => s.albumId === playlist?.albumId)

	return new Response(JSON.stringify({ playlist, songs }), {
		headers: { 'content-type': 'application/json' }
	})
}
