import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			base: path.resolve(__dirname, './src/utils/base.ts'),
		},
	},
});
