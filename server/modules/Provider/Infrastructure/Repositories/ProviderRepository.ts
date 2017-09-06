import * as BlueBird from 'bluebird';
import Provider from '../../Domain/Entities/Provider';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../CrossCutting/IoC/types";

import IProviderRepository from '../../Domain/Interfaces/IProviderRepository';
const models = require('../../../../models');

@injectable()
export default class ProviderRepository implements IProviderRepository {
    insert(model: Provider): BlueBird<Provider> {
        return models.Provider.create(model);
    }
    getById(id: number): BlueBird<Provider> {        
        return models.Provider.findOne({
            where: { providerId : id }
        })
    }
    getAll(): BlueBird<Provider[]> {
        return models.Provider.findAll({
            order: ['providerName']
        });        
    }
    update(id:number,model: Provider): BlueBird<Provider> {
        return models.Provider.update(model, {
            where: { providerId : id },
            fields: ['providerName'],
            hooks: true,
            individualHooks: true
        }).then(() => {
            return this.getById(id);
        });
    }
    delete(id: number): BlueBird<boolean> {
        return models.Provider.destroy({
            where: { providerId : id }
        });
    }
}