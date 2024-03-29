import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';

export default {
    plugins: [vue()],
    test: {
        environment: 'jsdom',
        coverage: {
            include: ['src/ColorPicker.vue'],
        },
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
};
