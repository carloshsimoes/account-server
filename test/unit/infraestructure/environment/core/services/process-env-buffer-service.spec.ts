import * as fs from 'fs';
import {Mock} from 'moq.ts';

import {IEnvironment} from '../../../../../../src/infraestructure/environment';
import {FileNotExists} from '../../../../../../src/infraestructure/environment/core/errors/file-not-exists';
import {ProcessEnvBufferService} from '../../../../../../src/infraestructure/environment/core/services/process-env-buffer-service';

describe('Given Environment Buffer Service', () => {
  const getValueByKeySpy = jest.fn();
  const processEnvService = new Mock<IEnvironment<string>>()
    .setup(mock => mock.getValueByKey)
    .returns(getValueByKeySpy)
    .object();

  const service = new ProcessEnvBufferService(processEnvService);

  describe('When attempt to access file path from environment', () => {
    it('Should return buffer from path storage in environment key', () => {
      const mockPath = 'foo/bar/baz';
      getValueByKeySpy.mockReturnValue(mockPath);

      const expectedBuffer = Buffer.from('content of baz file');
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'readFileSync').mockReturnValue(expectedBuffer);

      const mockKey = 'MY_ENV';
      const value = service.getValueByKey(mockKey);

      expect(value.equals(expectedBuffer)).toBeTruthy();
    });

    it('Should throw FileNotExists', () => {
      const mockPath = 'foo/bar/baz';
      getValueByKeySpy.mockReturnValue(mockPath);

      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      const mockKey = 'MY_ENV';
      expect(() => service.getValueByKey(mockKey)).toThrow(
        FileNotExists.make(mockPath)
      );
    });
  });
});
