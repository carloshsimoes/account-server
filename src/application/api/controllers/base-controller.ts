import {Envelope} from './base-response';

export abstract class BaseController {
  envelope<T>(payload: T): Envelope<T> {
    return {
      payload: payload,
    };
  }
}
