module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },

  moduleFileExtensions: ['js', 'vue', 'json', 'gql', 'graphql'],
  transform: {
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql',

    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',

    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|PNG|ttf|woff|woff2)$':
      'jest-transform-stub'
  },

  modulePathIgnorePatterns: [
    '<rootDir>/util_packages/',
    '<rootDir>/tests/e2e',
    '<rootDir>/components/thridParty',
    '<rootDir>/dist/',
    'util_scripts'
  ],

  cacheDirectory: '<rootDir>/tmp/cache/jest',
  coverageDirectory: '<rootDir>/coverage-frontend/',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ]
}
