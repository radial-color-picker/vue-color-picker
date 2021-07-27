const vue = require('@vitejs/plugin-vue');
const fse = require('fs-extra');
const path = require('path');
const { build } = require('vite');
const chalk = require('chalk');
const readline = require('readline');

const { printStats } = require('./print-stats');

const fileNameBase = 'vue-color-picker';

const getBuildConfig = ({ formats, minify }) => {
    return {
        define: {
            // @workaround vite replaces process.env.NODE_ENV with 'production' during build
            // after dead code elimination is applied the whole if branch is removed
            // what we want instead is to remove it only in UMD builds
            __DEV__: formats.includes('umd') ? false : 'process.env.NODE_ENV === "development"',
        },
        logLevel: 'silent',
        configFile: false,
        plugins: [vue()],
        build: {
            emptyOutDir: false,
            minify,
            brotliSize: false,
            sourcemap: !!minify,
            lib: {
                entry: path.resolve(__dirname, '../src/wrapper.js'),
                name: 'VueColorPicker',
                formats,
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue',
                    },
                    entryFileNames: `${fileNameBase}.[format].${!!minify ? 'min.js' : 'js'}`,
                    assetFileNames: `${fileNameBase}.${!!minify ? 'min.[ext]' : '[ext]'}`,
                },
            },
        },
    };
};

(async () => {
    try {
        if (process.stdout.isTTY) {
            console.log('\n'.repeat(process.stdout.rows));

            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
        }

        await fse.remove('dist');

        console.log('Building for production as library (commonjs, es, umd, umd-min)...');

        await build(getBuildConfig({ formats: ['es', 'cjs'] }));
        await build(getBuildConfig({ formats: ['umd'], minify: false }));
        await build(getBuildConfig({ formats: ['umd'], minify: true }));

        printStats();
    } catch (err) {
        console.error('\n' + chalk.red(err.message));
        console.error(err.stack);
        process.exit(1);
    }
})();
