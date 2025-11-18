import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // <-- Make sure this import is here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Make sure this 'resolve' section exists
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})