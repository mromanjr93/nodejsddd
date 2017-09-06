import * as BlueBird from 'bluebird';
import OutletType from '../../Domain/Entities/OutletType';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../CrossCutting/IoC/types";

import IOutletTypeRepository from '../../Domain/Interfaces/IOutletTypeRepository';
const models = require('../../../../models');



@injectable()
export default class OutletTypeTypeRepository implements IOutletTypeRepository {

    insert(model: OutletType): BlueBird<OutletType> {
        return models.OutletType.create(model);
    }
    getById(id: number): BlueBird<OutletType> {
        return models.OutletType.findOne({
            where: { outletTypeId: id }
        })
    }
    getAll(): BlueBird<OutletType[]> {
        return models.OutletType.findAll({
            order: ['outletTypeDescription']
        });
    }
    update(id: number, model: OutletType): BlueBird<OutletType> {
        return models.OutletType.update(model, {
            where: { outletTypeId: id },
            fields: ['outletTypeDescription'],
            hooks: true,
            individualHooks: true
        }).then(() => {
            return this.getById(id);
        });
    }
    delete(id: number): BlueBird<boolean> {
        return models.OutletType.destroy({
            where: { outletTypeId: id }
        });
    }    
}