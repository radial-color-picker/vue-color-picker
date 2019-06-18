const fse = require('fs-extra');
const zlib = require('zlib');
const ui = require('cliui')({ width: 80 });
const { log, chalk } = require('@vue/cli-shared-utils');

const outputDir = 'dist';

const isJS = name => /\.js$/.test(name);
const isCSS = name => /\.css$/.test(name);
const formatSize = size => (size / 1024).toFixed(2) + ' KiB';
const makeRow = (a, b, c) => `  ${a}\t    ${b}\t ${c}`;

const printStats = () => {
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

module.exports.printStats = printStats;
