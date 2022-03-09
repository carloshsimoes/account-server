import {Test} from '@nestjs/testing';

import {environmentModule} from '../../../../../../src/infraestructure/environment/core/environment-bootstrap.module';
import {ValueIsNotNumber} from '../../../../../../src/infraestructure/environment/core/errors/value-is-not-number';
import {ValueUndefined} from '../../../../../../src/infraestructure/environment/core/errors/value-undefined';
import {IEnvironment} from '../../../../../../src/infraestructure/environment/core/interfaces/environment';

describe('Given Environment plugin', () => {
  let processEnvNumberService: IEnvironment<number>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(
      environmentModule
    ).compile();

    processEnvNumberService = moduleRef.get<IEnvironment<number>>(
      'IProcessEnvNumberService'
    );
  });

  it('Should get environment version in process.env', () => {
    const nodeEnvironmentVersion =
      processEnvNumberService.getValueByKey('NODE_ENV_VERSION');

    expect(nodeEnvironmentVersion).toBe(1);
  });

  it('Should throw ValueUndefined', () => {
    const key = '37EC0080-BF33-4DEF-8C3D-953AD7E3AF54';

    expect(() => processEnvNumberService.getValueByKey(key)).toThrow(
      ValueUndefined.make(key)
    );
  });

  it('Should throw ValueIsNotNumber', () => {
    const key = 'NODE_ENV';

    expect(() => processEnvNumberService.getValueByKey(key)).toThrow(
      ValueIsNotNumber.make(key)
    );
  });
});
