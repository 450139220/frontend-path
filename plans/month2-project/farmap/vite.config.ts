import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		open: true,
		// hmr: false,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			// '~': resolve(__dirname),
		},
	},
});
