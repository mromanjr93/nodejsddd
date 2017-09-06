import * as BlueBird from 'bluebird';
import Outlet from '../../Domain/Entities/Outlet';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../CrossCutting/IoC/types";

import IOutletRepository from '../../Domain/Interfaces/IOutletRepository';
const models = require('../../../../models');



@injectable()
export default class OutletRepository implements IOutletRepository {

    insert(model: Outlet): BlueBird<Outlet> {
        return models.Outlet.create(model);
    }
    getById(id: number): BlueBird<Outlet> {        
        return models.Outlet.findOne({
            where: { outletId : id }
        })
    }
    getAll(): BlueBird<Outlet[]> {
        return models.Outlet.findAll({
            order: ['outletName']
        });        
    }
    update(id:number,model: Outlet): BlueBird<Outlet> {
        return models.Outlet.update(model, {
            where: { outletId : id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        }).then(() => {
            return this.getById(id);
        });
    }
    delete(id: number): BlueBird<boolean> {
        return models.Outlet.destroy({
            where: { outletId : id }
        });
    }

    getByProviderOutletId(providerId: number, id: number): BlueBird<Outlet> {
        return models.Outlet.findOne({
            where: { outletProviderOutletId : id, outletProviderId : providerId }
        });        
    }
}