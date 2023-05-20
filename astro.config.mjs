import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  server: { port: 80, host: '0.0.0.0' },
  vite: {
    server: {
      proxy: {
        '/trang-chu': {
          target: '/',
          secure: false,
          changeOrigin: false,
          rewrite: (path) => {
            path = path.replace('trang-chu', 'home');
            return path;
          },
        },
        '/en/home-page': {
          target: '/',
          secure: false,
          changeOrigin: false,
          rewrite: (path) => {
            path = path.replace('home-page', 'home');
            return path;
          },
        }
      }
    }
  }
});