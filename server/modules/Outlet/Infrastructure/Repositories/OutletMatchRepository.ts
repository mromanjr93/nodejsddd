import * as BlueBird from 'bluebird';
import OutletMatch from '../../Domain/Entities/OutletMatch';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../CrossCutting/IoC/types";

import IOutletMatchRepository from '../../Domain/Interfaces/IOutletMatchRepository';
const models = require('../../../../models');



@injectable()
export default class OutletMatchRepository implements IOutletMatchRepository {

    insert(model: OutletMatch): BlueBird<OutletMatch> {
        return models.OutletMatch.create(model);
    }
    getById(id: number): BlueBird<OutletMatch> {        
        return models.OutletMatch.findOne({
            where: { OutletMatchId : id }
        })
    }
    getAll(): BlueBird<OutletMatch[]> {
        return models.OutletMatch.findAll({
            order: ['OutletMatchName']
        });        
    }
    update(id:number,model: OutletMatch): BlueBird<OutletMatch> {
        return models.OutletMatch.update(model, {
            where: { OutletMatchId : id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        }).then(() => {
            return this.getById(id);
        });
    }
    delete(id: number): BlueBird<boolean> {
        return models.OutletMatch.destroy({
            where: { OutletMatchId : id }
        });
    }

    getByProviderOutletMatchId(providerId: number, id: number): BlueBird<OutletMatch> {
        return models.OutletMatch.findOne({
            where: { OutletMatchProviderOutletMatchId : id, OutletMatchProviderId : providerId }
        });        
    }
}