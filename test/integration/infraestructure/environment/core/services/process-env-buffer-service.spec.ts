import {Test} from '@nestjs/testing';
import * as fs from 'fs';

import {environmentModule} from '../../../../../../src/infraestructure/environment/core/environment-bootstrap.module';
import {FileNotExists} from '../../../../../../src/infraestructure/environment/core/errors/file-not-exists';
import {ValueUndefined} from '../../../../../../src/infraestructure/environment/core/errors/value-undefined';
import {IEnvironment} from '../../../../../../src/infraestructure/environment/core/interfaces/environment';

describe('Given Environment plugin', () => {
  let processEnvBufferService: IEnvironment<Buffer>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(
      environmentModule
    ).compile();

    processEnvBufferService = moduleRef.get<IEnvironment<Buffer>>(
      'IProcessEnvBufferService'
    );
  });

  it('Should get package.json path in process.env', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const file = Buffer.from('53cc6e70-b120-4624-a818-0a0117d35d73');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(file);

    const packageJson = processEnvBufferService.getValueByKey('NODE_ENV_PATH');

    expect(packageJson.equals(file)).toBeTruthy();
  });

  it('Should throw ValueUndefined', () => {
    const key = 'C8C6CD79-C9C9-4047-A885-D62EBBAF6A5B';

    expect(() => processEnvBufferService.getValueByKey(key)).toThrow(
      ValueUndefined.make(key)
    );
  });

  it('Should throw FileNotExists', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const key = 'NODE_ENV_PATH';
    const path = '<rootDir>/package.json';

    expect(() => processEnvBufferService.getValueByKey(key)).toThrow(
      FileNotExists.make(path)
    );
  });
});
