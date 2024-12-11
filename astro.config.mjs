// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true, // Binds to all network interfaces, enabling local network access
    port: 3000, // Default port (can be changed if needed)
  },
});
