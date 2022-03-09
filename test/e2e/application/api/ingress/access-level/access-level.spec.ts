import {HttpStatus, INestApplication} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Test} from '@nestjs/testing';
import * as request from 'supertest';

import {apiModule} from '../../../../../../src/application/api/api-bootstrap.module';
import {CreateAdminReq} from '../../../../../../src/application/api/controllers/user/dtos/create-admin-req';
import {IJwtContent} from '../../../../../../src/application/api/interfaces/jwt-content';
import {maeveSessions} from '../../../../../__hosts__/admins/maeve';
import {phill} from '../../../../../__hosts__/admins/phill';
import {rebusSessions} from '../../../../../__hosts__/customers/rebus';
import {jane} from '../../../../../__hosts__/guests/jane';
import {joe} from '../../../../../__hosts__/guests/joe';

describe('Given Access Level Ingress', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(apiModule).compile();
    jwtService = moduleRef.get<JwtService>(JwtService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('When Maeve attempt to create Jane', () => {
    it('Should create Jane', async () => {
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

      const jwtContent: IJwtContent = {
        userId: maeveSessions[0].userId,
        sessionId: maeveSessions[0].id,
      };

      const jwtToken = jwtService.sign(jwtContent);

      const response = await request(app.getHttpServer())
        .post('/users/admin')
        .set('Authorization', `bearer ${jwtToken}`)
        .send(createAdminUserReq);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
    });
  });

  describe('When Rebus attempt to create Jane', () => {
    it('Should throw Forbidden', async () => {
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

      const jwtContent: IJwtContent = {
        userId: rebusSessions[0].userId,
        sessionId: rebusSessions[0].id,
      };

      const jwtToken = jwtService.sign(jwtContent);

      const response = await request(app.getHttpServer())
        .post('/users/admin')
        .set('Authorization', `bearer ${jwtToken}`)
        .send(createAdminUserReq);

      expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
    });
  });

  describe('When Phill attempt to create Joe without session', () => {
    it('Should throw SessionNotFound', async () => {
      const createAdminUserReq = new CreateAdminReq();
      createAdminUserReq.name = joe.name;
      createAdminUserReq.email = joe.email;
      createAdminUserReq.cpf = joe.cpf;
      createAdminUserReq.password = joe.password;
      createAdminUserReq.street = joe.addresses[0].street;
      createAdminUserReq.complement = joe.addresses[0].complement;
      createAdminUserReq.neighborhood = joe.addresses[0].neighborhood;
      createAdminUserReq.city = joe.addresses[0].city;
      createAdminUserReq.state = joe.addresses[0].state;
      createAdminUserReq.zipCode = joe.addresses[0].zipCode;

      const jwtContent: IJwtContent = {
        userId: phill.id,
        sessionId: 'dacf18b2-0580-497d-9b7a-b097bcca52f9',
      };

      const jwtToken = jwtService.sign(jwtContent);

      const response = await request(app.getHttpServer())
        .post('/users/admin')
        .set('Authorization', `bearer ${jwtToken}`)
        .send(createAdminUserReq);

      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });
});
