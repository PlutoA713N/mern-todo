import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('env:', env, mode, process.cwd());
  console.log('VITE_BACKEND_URL:', env.VITE_BACKEND_URL, env); // Debugging line
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/tasks': env.VITE_BACKEND_URL || 'http://localhost:5000',
      },
    },
  });
};
