import {Inject} from '@nestjs/common';

import {ValueUndefined} from '../errors/value-undefined';
import {IEnvironment} from '../interfaces/environment';

export class ProcessEnvService implements IEnvironment<string> {
  getValueByKey(key: string): string {
    const value = this.processEnv[key];

    if (!value) {
      throw ValueUndefined.make(key);
    }

    return value;
  }

  constructor(@Inject('ProcessEnv') private processEnv: NodeJS.ProcessEnv) {}
}
