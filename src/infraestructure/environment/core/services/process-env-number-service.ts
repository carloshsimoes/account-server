import {Inject} from '@nestjs/common';

import {ValueIsNotNumber} from '../errors/value-is-not-number';
import {IEnvironment} from '../interfaces/environment';

export class ProcessEnvNumberService implements IEnvironment<number> {
  getValueByKey(key: string): number {
    const value = this.processEnvService.getValueByKey(key);

    const valueAsNumber = Number(value);

    if (isNaN(valueAsNumber)) {
      throw ValueIsNotNumber.make(key);
    }

    return valueAsNumber;
  }

  constructor(
    @Inject('IProcessEnvService')
    private processEnvService: IEnvironment<string>
  ) {}
}
