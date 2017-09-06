import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { app, request, expect } from '../config/helpers';

describe('Testes de Integração', () => {

    'use strict';
    const config = require('../../../server/config/env/config')();
    const model = require('../../../server/models/');

    let id;
    let token;


    const userTest = {
        id: 1,
        name: 'User Test',
        email: 'user@test.com',
        password: '123456'
    }

    const userDefault = {
        id: 2,
        name: 'User Default',
        email: 'user@default.com',
        password: '123456'
    }

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
            .then(() => {
                return model.User.create(userDefault);
            })
            .then(user => {
                model.User.create(userTest)
                    .then(() => {
                        token = jwt.encode({ id: user.id }, config.secret);
                        done();
                    });
            });
    });

    describe('POST /token', () => {
        it('Deve receber um JWT', done => {
            const credentials = {
                email : userDefault.email,
                password : userDefault.password
            };

            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.token).to.equal(`${token}`);
                    done(error);
                });
        });

        it('Não deve gerar um token', done=>{
            const credentials = {
                email: 'email@emailqualquer.com',
                password : 'qualquer'
            };
            
            request(app)
            .post('/token')
            .send(credentials)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                expect(res.body).to.empty;
                done(error);
            });

        });
    });

    

    describe('GET /api/users', () => {
        it('Deve retornar um JSON com todos os usuários', done => {
            request(app)
                .get('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                });
        });
    });

    describe('GET /api/users/:id', () => {
        it('Deve retornar um JSON com UM usuário', done => {
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(userDefault.id);
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password'
                    ]);
                    id = res.body.payload.id;
                    done(error);
                });

        });
    });

    describe('POST /api/users', () => {
        it('Deve criar um usuário', done => {
            const user = {
                id : 3,
                name: "Teste",
                email: 'usuario@email.com',
                password: 'novouser'
            }

            request(app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.name).to.be.eql(user.name);
                    done(error);
                });
        });
    });

    describe('PUT /api/users/:id', () => {
        it('Deve atualizar um usuário', done => {
            const user = {
                name: "Teste"
            }

            request(app)
                .put(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);                    
                    expect(res.body.payload.id).to.be.eql(userDefault.id);
                    expect(res.body.payload.name).to.be.eql(user.name);
                    done(error);
                });

        });
    });
    

    describe('DELETE /api/users/:id', () => {
        it('Deve deletar um usuário', done => {

            request(app)
                .delete(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200);
                    done(error);
                });
        });
    });
});