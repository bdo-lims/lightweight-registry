import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@fortawesome/free-brands-svg-icons', '@fortawesome/free-regular-svg-icons', '@fortawesome/free-solid-svg-icons']
	},
	
	resolve: {
		alias: {
			// these are the aliases and paths to them
			'@components': path.resolve('./src/lib/components'),
			'@lib': path.resolve('./src/lib'),
			'@utils': path.resolve('./src/lib/utils'),
			'@stores': path.resolve('./src/lib/stores')
		}
	}
};

export default config;
