import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'] // Add JSX file extension resolution
  },
  esbuild: {
    loader: 'jsx', // Set the esbuild loader to handle JSX syntax
  },
});
