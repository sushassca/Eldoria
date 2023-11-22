import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from './socket/webSocketPluginVite';

/** @type {import('vite').UserConfig} */
const config = {
    server: {
        port: 443,
        host: true
    },
    preview: {
        port: 443
    },
    plugins: [sveltekit(), webSocketServer]
};

export default config;