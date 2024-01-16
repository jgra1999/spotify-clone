/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				darkGray: '#121212',
				mediumGray: '#161616'
			}
		}
	},
	plugins: []
}
