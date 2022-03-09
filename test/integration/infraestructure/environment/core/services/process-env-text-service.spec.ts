import {Test} from '@nestjs/testing';

import {environmentModule} from '../../../../../../src/infraestructure/environment/core/environment-bootstrap.module';
import {ValueUndefined} from '../../../../../../src/infraestructure/environment/core/errors/value-undefined';
import {IEnvironment} from '../../../../../../src/infraestructure/environment/core/interfaces/environment';

describe('Given Environment plugin', () => {
  let processEnvTextService: IEnvironment<string>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(
      environmentModule
    ).compile();

    processEnvTextService = moduleRef.get<IEnvironment<string>>(
      'IProcessEnvTextService'
    );
  });

  it('Should get node environment in process.env', () => {
    const nodeEnvironment = processEnvTextService.getValueByKey('NODE_ENV');

    expect(nodeEnvironment).toBe('test');
  });

  it('Should throw ValueUndefined', () => {
    const key = '7C4F5B5D-AF35-4567-9555-E36F97B7200F';

    expect(() => processEnvTextService.getValueByKey(key)).toThrow(
      ValueUndefined.make(key)
    );
  });
});
