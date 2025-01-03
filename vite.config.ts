import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr(), viteCompression()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
