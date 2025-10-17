import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // This is the same as --host
    strictPort: true,
    port: 5173, // You can specify the port
    hmr: {
        clientPort: 443 // This is often needed in these types of cloud IDEs
    },
    allowedHosts: [
      'ide-rbcreact-rbchubhacks.services.oip.virtusa.dev'
    ]
  }
  
})
