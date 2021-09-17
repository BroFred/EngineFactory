/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const hq = require('alias-hq');

const alias = hq.get('jest');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: alias,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
