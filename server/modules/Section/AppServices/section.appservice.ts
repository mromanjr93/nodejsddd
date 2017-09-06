
import ISectionService from '../Services/Interfaces/ISectionService';
import ISectionAppService from './Interfaces/ISectionAppService';
import Section from '../Domain/Entities/Section';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class SectionAppService implements ISectionAppService {
    private sectionService: ISectionService;
    constructor(
        @inject(TYPES.ISectionService) sectionService: ISectionService
    ) {
        this.sectionService = sectionService;
    }
    insert(model: Section): BlueBird<Section> {
        return this.sectionService.insert(model);
    }

    getById(id: number): BlueBird<Section> {
        return this.sectionService.getById(id);
    }

    getAll(): BlueBird<Array<Section>> {
        return this.sectionService.getAll();
    }

    update(id:number,model: Section): BlueBird<Section> {
        return this.sectionService.update(id,model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.sectionService.delete(id);
    }
}