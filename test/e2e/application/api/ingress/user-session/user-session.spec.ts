import {HttpStatus, INestApplication} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Test} from '@nestjs/testing';
import * as request from 'supertest';

import {apiModule} from '../../../../../../src/application/api/api-bootstrap.module';
import {IJwtContent} from '../../../../../../src/application/api/interfaces/jwt-content';
import {maeveSessions} from '../../../../../__hosts__/admins/maeve';

describe('Given Jwt Ingress', () => {
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

  describe('When Maeve attempt to refresh her user', () => {
    it('Should find Maeve', async () => {
      const jwtContent: IJwtContent = {
        userId: maeveSessions[0].userId,
        sessionId: maeveSessions[0].id,
      };

      const jwtToken = jwtService.sign(jwtContent);

      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `bearer ${jwtToken}`)
        .send();

      expect(response.statusCode).toEqual(HttpStatus.OK);
    });
  });
});
