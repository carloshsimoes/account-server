import type {Config} from '@jest/types';

import baseConfig from '../../jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  rootDir: '../../',
  testTimeout: 10000,
  collectCoverageFrom: [
    '<rootDir>/src/**/controllers/**/*-controller.ts',
    '<rootDir>/src/**/entities/**/*-entity.ts',
    '<rootDir>/src/**/services/**/*-service.ts',
    '<rootDir>/src/**/repositories/**/*-repository.ts',
    '<rootDir>/src/**/factories/**/*-factory.ts',
    '<rootDir>/src/**/exceptions/**/*.ts',
  ],
  coverageDirectory: 'coverage/integration',
  testMatch: ['<rootDir>/test/integration/**/*.spec.ts'],
};

export default config;
