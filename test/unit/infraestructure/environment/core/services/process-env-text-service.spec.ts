import {Mock} from 'moq.ts';

import {IEnvironment} from '../../../../../../src/infraestructure/environment';
import {ProcessEnvTextService} from '../../../../../../src/infraestructure/environment/core/services/process-env-text-service';

describe('Given Environment Text Service', () => {
  const getValueByKeySpy = jest.fn();
  const processEnvService = new Mock<IEnvironment<string>>()
    .setup(mock => mock.getValueByKey)
    .returns(getValueByKeySpy)
    .object();

  const service = new ProcessEnvTextService(processEnvService);

  describe('When attempt to access text from environment', () => {
    it('Should return text from environment key', () => {
      const mockValue = 'MY_VALUE';
      getValueByKeySpy.mockReturnValue(mockValue);

      const mockKey = 'MY_ENV';
      const value = service.getValueByKey(mockKey);

      expect(value).toBe(mockValue);
    });
  });
});
