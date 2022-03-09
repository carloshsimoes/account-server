import {Algorithm} from 'jsonwebtoken';

export interface IApiConfiguration {
  server: {
    port: number;
  };

  jwt: {
    publicKey: Buffer;
    algorithm: Algorithm;
  };
}
