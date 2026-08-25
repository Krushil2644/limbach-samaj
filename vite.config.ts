import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import vercel from 'vite-plugin-vercel';
import vitePluginVercelApi from 'vite-plugin-vercel-api'

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_ASSET_PREFIX: process.env.CLOUDINARY_ASSET_PREFIX
  },
  // The Vercel plugins own .vercel/output; running them for the SSR pass
  // leaks entry-server.js into the public static directory.
  plugins: isSsrBuild ? [react()] : [react(), vercel(), vitePluginVercelApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  vercel: {},
  build: {
    rollupOptions: {
      output: {
        // Manual chunking is a client-only concern; applying it to the SSR
        // build fails because React is external there.
        manualChunks: isSsrBuild ? undefined : {
          // React and core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI libraries
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ],

          // Heavy third-party libraries
          'charts': ['recharts'],
          'image-gallery': ['react-image-gallery'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils': ['date-fns', 'lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority', 'cmdk']
        }
      }
    }
  }
}));
