module.exports = {
    // moduleFileExtensions: ['js', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    // allow using absolute import specifiers in test files
    // with a webpack-like alias '@/src/ColorPicker.vue'
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testEnvironment: 'jsdom',
    globals: {
        __DEV__: true,
    },
    testMatch: ['**/tests/unit/**/*.spec.js'],
    testURL: 'http://localhost/',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/ColorPicker.vue'],
};
