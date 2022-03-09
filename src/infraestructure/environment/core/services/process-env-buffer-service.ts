import {Inject} from '@nestjs/common';
import {existsSync, readFileSync} from 'fs';

import {FileNotExists} from '../errors/file-not-exists';
import {IEnvironment} from '../interfaces/environment';

export class ProcessEnvBufferService implements IEnvironment<Buffer> {
  getValueByKey(key: string): Buffer {
    const path = this.processEnvService.getValueByKey(key);

    const fileExists = existsSync(path);

    if (!fileExists) {
      throw FileNotExists.make(path);
    }

    const file = readFileSync(path);
    return file;
  }

  constructor(
    @Inject('IProcessEnvService')
    private processEnvService: IEnvironment<string>
  ) {}
}
