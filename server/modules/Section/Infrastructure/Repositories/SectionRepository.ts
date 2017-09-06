import * as BlueBird from 'bluebird';
import Section from '../../Domain/Entities/Section';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../CrossCutting/IoC/types";

import ISectionRepository from '../../Domain/Interfaces/ISectionRepository';
const models = require('../../../../models');



@injectable()
export default class SectionRepository implements ISectionRepository {

    insert(model: Section): BlueBird<Section> {
        return models.Section.create(model);
    }
    getById(id: number): BlueBird<Section> {
        return models.Section.findOne({
            where: { sectionId: id }
        })
    }
    getAll(): BlueBird<Section[]> {
        return models.Section.findAll({
            order: ['sectionName']
        });
    }
    update(id: number, model: Section): BlueBird<Section> {
        return models.Section.update(model, {
            where: { SectionId: id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        }).then(() => {
            return this.getById(id);
        });
    }
    delete(id: number): BlueBird<boolean> {
        return models.Section.destroy({
            where: { sectionId: id }
        });
    }

    getByProviderSectionId(providerId: number, id: number): BlueBird<Section> {
        return models.Section.findOne({
            where: { sectionProviderSectionId: id, sectionProviderId: providerId }
        }).then((section) => {            
            return section != null ? section.dataValues : null;
        });
    }
}