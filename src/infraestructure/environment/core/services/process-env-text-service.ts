import {Inject} from '@nestjs/common';

import {IEnvironment} from '../interfaces/environment';

export class ProcessEnvTextService implements IEnvironment<string> {
  getValueByKey(key: string): string {
    const value = this.processEnvService.getValueByKey(key);

    return value;
  }

  constructor(
    @Inject('IProcessEnvService')
    private processEnvService: IEnvironment<string>
  ) {}
}
