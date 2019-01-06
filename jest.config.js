module.exports = {
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
    },
    // allow using absolute import specifiers in test files
    // with a webpack-like alias '@/src/ColorPicker.vue'
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
    testURL: 'http://localhost/',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/ColorPicker.vue'],
    coverageReporters: ['html', 'text-summary'],
};
