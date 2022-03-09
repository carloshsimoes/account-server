import {Mock} from 'moq.ts';

import {ValueUndefined} from '../../../../../../src/infraestructure/environment/core/errors/value-undefined';
import {ProcessEnvService} from '../../../../../../src/infraestructure/environment/core/services/process-env-service';

describe('Given Environment Service', () => {
  const mockKey = 'MY_ENV';
  const mockValue = 'MY_VALUE';
  const processEnv = new Mock<NodeJS.ProcessEnv>()
    .setup(mock => mock[mockKey])
    .returns(mockValue)
    .object();

  const service = new ProcessEnvService(processEnv);

  describe('When attempt to access value from environment', () => {
    it('Should return text from environment key', () => {
      const value = service.getValueByKey(mockKey);

      expect(value).toBe(mockValue);
    });

    it('Should throw value undefined', () => {
      const mockKey = 'NOT_MY_KEY';
      expect(() => service.getValueByKey(mockKey)).toThrow(
        ValueUndefined.make(mockKey)
      );
    });
  });
});
