import {HttpStatus, INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as request from 'supertest';

import {apiModule} from '../../../../../../src/application/api/api-bootstrap.module';
import {CreateAdminReq} from '../../../../../../src/application/api/controllers/user/dtos/create-admin-req';
import {CreateCustomerReq} from '../../../../../../src/application/api/controllers/user/dtos/create-customer-req';
import {jane} from '../../../../../__hosts__/guests/jane';
import {teddy} from '../../../../../__hosts__/guests/teddy';

describe('Given Jwt Ingress', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(apiModule).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('When William "Man in Black" attempt to create Jane without authorization header', () => {
    it('Should throw Unauthorized', async () => {
      const createAdminUserReq = new CreateAdminReq();
      createAdminUserReq.name = jane.name;
      createAdminUserReq.email = jane.email;
      createAdminUserReq.cpf = jane.cpf;
      createAdminUserReq.password = jane.password;
      createAdminUserReq.street = jane.addresses[0].street;
      createAdminUserReq.complement = jane.addresses[0].complement;
      createAdminUserReq.neighborhood = jane.addresses[0].neighborhood;
      createAdminUserReq.city = jane.addresses[0].city;
      createAdminUserReq.state = jane.addresses[0].state;
      createAdminUserReq.zipCode = jane.addresses[0].zipCode;

      const response = await request(app.getHttpServer())
        .post('/users/admin')
        .send(createAdminUserReq);

      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('When William "Man in Black" attempt to create Jane with wrong authorization header', () => {
    it('Should throw Unauthorized', async () => {
      const createAdminUserReq = new CreateAdminReq();
      createAdminUserReq.name = jane.name;
      createAdminUserReq.email = jane.email;
      createAdminUserReq.cpf = jane.cpf;
      createAdminUserReq.password = jane.password;
      createAdminUserReq.street = jane.addresses[0].street;
      createAdminUserReq.complement = jane.addresses[0].complement;
      createAdminUserReq.neighborhood = jane.addresses[0].neighborhood;
      createAdminUserReq.city = jane.addresses[0].city;
      createAdminUserReq.state = jane.addresses[0].state;
      createAdminUserReq.zipCode = jane.addresses[0].zipCode;

      const response = await request(app.getHttpServer())
        .post('/users/admin')
        .set('Authorization', 'Bearer wrong-token')
        .send(createAdminUserReq);

      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('When Teaddy attempt to create his customer user', () => {
    it('Should create Teddy', async () => {
      const createCustomerUserReq = new CreateCustomerReq();
      createCustomerUserReq.name = teddy.name;
      createCustomerUserReq.email = teddy.email;
      createCustomerUserReq.cpf = teddy.cpf;
      createCustomerUserReq.password = teddy.password;

      const response = await request(app.getHttpServer())
        .post('/users/customer')
        .send(createCustomerUserReq);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
    });
  });
});
