import {Mock} from 'moq.ts';

import {IEnvironment} from '../../../../../../src/infraestructure/environment';
import {ValueIsNotNumber} from '../../../../../../src/infraestructure/environment/core/errors/value-is-not-number';
import {ProcessEnvNumberService} from '../../../../../../src/infraestructure/environment/core/services/process-env-number-service';

describe('Given Environment Number Service', () => {
  const getValueByKeySpy = jest.fn();
  const processEnvService = new Mock<IEnvironment<string>>()
    .setup(mock => mock.getValueByKey)
    .returns(getValueByKeySpy)
    .object();

  const service = new ProcessEnvNumberService(processEnvService);

  describe('When attempt to access number from environment', () => {
    it('Should return number from environment key', () => {
      const mockValue = '10';
      getValueByKeySpy.mockReturnValue(mockValue);

      const mockKey = 'MY_ENV';
      const value = service.getValueByKey(mockKey);

      expect(value).toBe(Number(mockValue));
    });

    it('Should throw ValueIsNotNumber', () => {
      const mockValue = 'NOT AN NUMBER';
      getValueByKeySpy.mockReturnValue(mockValue);

      const mockKey = 'INVALID_MY_ENV';

      expect(() => service.getValueByKey(mockKey)).toThrow(
        ValueIsNotNumber.make(mockKey)
      );
    });
  });
});
