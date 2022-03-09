import type {Config} from '@jest/types';

import baseConfig from '../../jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  rootDir: '../../',
  collectCoverageFrom: [
    '<rootDir>/src/**/controllers/**/*-controller.ts',
    '<rootDir>/src/**/entities/**/*-entity.ts',
    '<rootDir>/src/**/services/**/*-service.ts',
    '<rootDir>/src/**/repositories/**/*-repository.ts',
  ],
  coverageDirectory: 'coverage/unit',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
};

export default config;
