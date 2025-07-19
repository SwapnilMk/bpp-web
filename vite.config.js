import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import webfontDownload from 'vite-plugin-webfont-dl';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        webfontDownload([
            'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap',
        ], {
            injectAsStyleTag: true, // Inject fonts as <style> tag
            minifyCss: true, // Minify CSS in production
            embedFonts: false, // Keep fonts as separate files for caching
            async: true, // Non-blocking font loading
            cache: true, // Cache fonts locally for offline dev
        }),
        TanStackRouterVite(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            // fix loading all icon chunks in dev mode
            // https://github.com/tabler/tabler-icons/issues/1233
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
    server: {
        port: 5173,
    },
});
