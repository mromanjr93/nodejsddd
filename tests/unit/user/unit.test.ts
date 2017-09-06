import { testDouble, expect } from '../config/helpers';
import User from '../../../server/modules/User/service';


describe('Testes Unitários do Controller', () => {

    'use strict';
    const config = require('../../../server/config/env/config')();
    const model = require('../../../server/models/');

    const userDefault = {
        id: 1,
        name: 'User Default',
        email: 'user@default.com',
        password: '123456'
    }

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
            .then(() => {
                return model.User.create(userDefault).then(() => {
                    console.log('Usuário padrão criado');
                    done();
                })
            });
    });


    describe('Método Create', () => {
        it('Deve criar um novo usuário', () => {
            const novoUsuario = {
                id: 2,
                name: 'Novo Usuário',
                email: 'usuario@email.com',
                password: '123456'
            };



            return User.create(novoUsuario)
                .then(data => {
                    expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
                });

        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um usuário', () => {

            const usuarioAtualizado = {
                name: 'Nome atualizado',
                email: 'atualizado@email.com'
            };
            return User.update(userDefault.id, usuarioAtualizado).then(data => {
                expect(data).to.be.an('object');
            });
        });
    });    

    describe('Método Get Users', () => {
        it('Deve retornar uma lista de usuários', () => {
            return User.getAll().then(data => {
                expect(data).to.be.an('array');
            });
        });
    });

    describe('Método Delete', () => {
        it('Deve deletar um usuário', () => {

            return User.delete(userDefault.id).then(data => {
                expect(data).to.be.equal(1);
            });
        });
    });


    describe('Método getById', () => {
        it('Retornar um usuário de acordo com o ID passado', () => {
            User.getById(userDefault.id).then(data => {
                expect(data.id).to.be.eql(userDefault.id);
            });

        });
    });

    describe('Método getByEmail', () => {
        it('Retornar um usuário de acordo com o email passado', () => {
            User.getByEmail(userDefault.email).then(data => {
                expect(data.email).to.be.equal(userDefault.email);
            });
        });
    });
});
