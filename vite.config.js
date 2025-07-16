// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Prueba con 5174, o 3000, o 8080. ¡Cualquier puerto libre!
  },
});