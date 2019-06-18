const fse = require('fs-extra');
const { log, logWithSpinner, stopSpinner, clearConsole, done, chalk, error } = require('@vue/cli-shared-utils');

const { printStats } = require('./print-stats');
const { bundle } = require('./roll');

(async () => {
    try {
        const start = Date.now();

        await fse.remove('dist');

        log();
        logWithSpinner('Building for production as library (commonjs, esm, umd, umd-min)...');

        await bundle();

        stopSpinner();
        clearConsole();

        done(chalk.green(`Compiled successfully in ${Date.now() - start}ms`));
        printStats();
    } catch (err) {
        stopSpinner();
        error(err);
        process.exit(1);
    }
})();
