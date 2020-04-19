const { rollup } = require('rollup');
const vue = require('rollup-plugin-vue');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const cjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');

const fileNameBase = 'vue-color-picker';

const build = async ({ format, minify = false }) => {
    const inputOptions = {
        input: './src/wrapper.js',
        external: ['vue'],
        plugins: [
            // Replace env variable with 'production' for umd.min.js and 'development' for 'umd.js'
            // Leave the process.env.NODE_ENV in CommonJS and ESM builds
            // which are exclusively used only in JS bundlers like Webpack & Rollup
            format === 'umd' &&
                replace({
                    'process.env.NODE_ENV': JSON.stringify(
                        process.env.NODE_ENV || minify ? 'production' : 'development'
                    ),
                }),
            cjs(),
            nodeResolve(),
            postcss({
                extract: format === 'umd' && `${fileNameBase}${minify ? '.min' : ''}.css`,
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
        file: `dist/${fileNameBase}.${format}${minify ? '.min' : ''}.js`,
        name: 'VueColorPicker',
        sourcemap: minify,
    });
};

const bundle = () => {
    const entries = [{ format: 'umd' }, { format: 'umd', minify: true }, { format: 'cjs' }, { format: 'esm' }];

    return Promise.all(entries.map(e => build(e)));
};

module.exports.bundle = bundle;
