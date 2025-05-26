import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/tasks': env.VITE_BACKEND_URL || 'http://localhost:5000',
      },
    },
  });
};
