import type {Config} from '@jest/types';

import baseConfig from '../../jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  rootDir: '../../',
  testTimeout: 100000,
  collectCoverageFrom: [
    '<rootDir>/src/application/api/ingress/**/*.ts',
    '<rootDir>/src/application/api/**/*.filter.ts',
  ],
  coverageDirectory: 'coverage/e2e',
  testMatch: ['<rootDir>/test/e2e/**/*.spec.ts'],
};

export default config;
