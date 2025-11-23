import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // 1. CRITICAL FOR GITHUB PAGES DEPLOYMENT
  // The 'base' must be set to your repository name, enclosed in slashes.
  base: "./", 
  
  plugins: [react()],
  
  // 2. Existing Path Alias Setup
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})