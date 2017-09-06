import * as BlueBird from 'bluebird';
import SectionMatch from '../../Domain/Entities/SectionMatch';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../CrossCutting/IoC/types";

import ISectionMatchRepository from '../../Domain/Interfaces/ISectionMatchRepository';
const models = require('../../../../models');



@injectable()
export default class SectionMatchRepository implements ISectionMatchRepository {

    insert(model: SectionMatch): BlueBird<SectionMatch> {
        return models.SectionMatch.create(model);
    }
    getById(id: number): BlueBird<SectionMatch> {
        return models.SectionMatch.findOne({
            where: { SectionMatchId: id }
        })
    }
    getAll(): BlueBird<SectionMatch[]> {
        return models.SectionMatch.findAll({
            order: ['sectionMatchId']
        });
    }
    update(id: number, model: SectionMatch): BlueBird<SectionMatch> {
        return models.SectionMatch.update(model, {
            where: { SectionMatchId: id },
            fields: ['sectionMatchId'],
            hooks: true,
            individualHooks: true
        }).then(() => {
            return this.getById(id);
        });
    }
    delete(id: number): BlueBird<boolean> {
        return models.SectionMatch.destroy({
            where: { sectionMatchId: id }
        });
    }
}