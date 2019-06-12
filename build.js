const fse = require('fs-extra');
const zlib = require('zlib');
const chalk = require('chalk');
const ui = require('cliui')({ width: 80 });
const { log, logWithSpinner, stopSpinner, clearConsole, done } = require('@vue/cli-shared-utils');

const { rollup } = require('rollup');
const vue = require('rollup-plugin-vue');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const cjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');

const isJS = name => /\.js$/.test(name);
const isCSS = name => /\.css$/.test(name);
const formatSize = size => (size / 1024).toFixed(2) + ' KiB';
const makeRow = (a, b, c) => `  ${a}\t    ${b}\t ${c}`;

const printStats = () => {
    const outputDir = './dist';

    const assets = fse
        .readdirSync(outputDir)
        .filter(fileName => isCSS(fileName) || isJS(fileName))
        .map(fileName => {
            const filePath = `${outputDir}/${fileName}`;

            const { size } = fse.statSync(filePath);
            const gzipped = zlib.gzipSync(fse.readFileSync(filePath)).length;

            return {
                name: `${outputDir}/${fileName}`,
                size: formatSize(size),
                gzipped: formatSize(gzipped),
            };
        })
        .sort((a, b) => {
            // move CSS files to be last
            if (isCSS(a.name) && isJS(b.name)) return 1;

            // otherwise sort alphabetically
            return a.name.localeCompare(b.name);
        });

    ui.div(
        makeRow(chalk.cyan.bold('File'), chalk.cyan.bold('Size'), chalk.cyan.bold('Gzipped')) +
            `\n\n` +
            assets
                .map(({ name, size, gzipped }) =>
                    makeRow(isJS(name) ? chalk.green(name) : chalk.blue(name), size, gzipped)
                )
                .join(`\n`)
    );

    log(`\n${ui.toString()}\n\n  ${chalk.gray(`Images and other types of assets omitted.`)}\n`);
};

const build = async ({ format, minify = false }) => {
    const outputDir = './dist';

    const inputOptions = {
        input: './src/ColorPicker.vue',
        external: ['vue'],
        plugins: [
            // Replace env variable with 'production' for umd.min.js and 'development' for 'umd.js'
            // Leave the process.env.NODE_ENV in CommonJS and ESM builds which are exclusively used only in JS bundlers like Webpack & Rollup
            format === 'umd' &&
                replace({
                    'process.env.NODE_ENV': JSON.stringify(
                        process.env.NODE_ENV || minify ? 'production' : 'development'
                    ),
                }),
            cjs(),
            nodeResolve(),
            postcss({
                extract: `${outputDir}/vue-color-picker${minify ? '.min' : ''}.css`,
                inject: false,
                minimize: minify,
                sourceMap: minify,
            }),
            vue({
                css: false,
                style: {
                    postcssCleanOptions: {
                        disabled: !minify,
                    },
                },
                template: { optimizeSSR: format === 'cjs' },
            }),
            babel({
                exclude: ['node_modules/**'],
                babelrc: false,
                presets: [['@vue/babel-preset-app', { useBuiltIns: false }]],
            }),
            minify && terser(),
        ],
    };

    const bundle = await rollup(inputOptions);

    return bundle.write({
        format,
        globals: { vue: 'Vue' },
        file: `${outputDir}/vue-color-picker.${format}${minify ? '.min' : ''}.js`,
        name: 'VueColorPicker',
        sourcemap: minify,
    });
};

const bundle = () => {
    const entries = [{ format: 'umd' }, { format: 'umd', minify: true }, { format: 'cjs' }, { format: 'esm' }];

    return Promise.all(entries.map(e => build(e)));
};

(async () => {
    await fse.remove('./dist');

    log();
    logWithSpinner('Building for production as library (commonjs, esm, umd, umd-min)...');

    const start = Date.now();

    await bundle();

    stopSpinner();
    clearConsole();

    done(chalk.green(`Compiled successfully in ${Date.now() - start}ms`));
    printStats();
})();
