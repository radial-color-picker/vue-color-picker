import path from 'path';
import vue from '@vitejs/plugin-vue';

export default {
    plugins: [vue()],
    define: {
        __DEV__: true,
    },
};
