import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve("/src/api"),
      "@core": path.resolve("/src/core"),
      "@hooks": path.resolve("/src/hooks"),
      "@libs": path.resolve("/src/libs"),
      "@ui": path.resolve("/src/ui"),
      "@stores": path.resolve("/src/stores"),
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    }
  }
})
