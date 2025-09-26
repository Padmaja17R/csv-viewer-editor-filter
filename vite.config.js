import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/csv-viewer-editor-filter/',
  plugins: [react()],
})
