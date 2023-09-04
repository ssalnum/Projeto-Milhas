import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { DepoimentoModule } from './depoimento.module';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [DepoimentoModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET depoimentos`, () => {
        return request(app.getHttpServer())
            .get('/depoimentos')
            .expect(200)
    });

    it(`/Post depoimentos`, () => {
        return request(app.getHttpServer())
            .post('/depoimentos')
            .send({
                id: "2",
                foto: "foto555",
                depoimento: "depoimento555",
                nome: "nome555"
            })
            .expect(201)
    });

    it(`/Put depoimentos "/:id"`, () => {
        return request(app.getHttpServer())
            .put('/depoimentos/1')
            .send({
                foto: "foto222",
                depoimento: "depoimento222",
                nome: "nome222"
            })
            .expect(200)
    });

    it(`/Delete depoimentos "/:id"`, () => {
        return request(app.getHttpServer())
            .delete('/depoimentos/1')
            .expect(200)
    });

    afterAll(async () => {
        await app.close();
    });
});