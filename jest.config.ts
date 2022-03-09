import type {Config} from '@jest/types';

const baseConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  reporters: ['default'],
  clearMocks: true,
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
};

export default baseConfig;
