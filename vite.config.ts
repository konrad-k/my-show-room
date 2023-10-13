import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite"
import EnvironmentPlugin from 'vite-plugin-environment';
import react from "@vitejs/plugin-react-swc"
import path from "path"

// https://vitejs.dev/config/
export default mode => {
  const env = loadEnv(mode, process.cwd(), "")
  return defineConfig({
    server: {
      port: Number(env.APP_PORT)
    },
    base: './',
    plugins: [react(), splitVendorChunkPlugin(), EnvironmentPlugin('all')],
    resolve: {
      alias: {
       '@assets': path.resolve(__dirname, './src/assets'),
       '@components': path.resolve(__dirname, './src/components'),
       '@modules': path.resolve(__dirname, './src/modules'),
       '@pages': path.resolve(__dirname, './src/pages'),
       '@utils': path.resolve(__dirname, './src/utils'),
       '@root': path.resolve(__dirname, './src'),
       },
     }, 
  })
}
