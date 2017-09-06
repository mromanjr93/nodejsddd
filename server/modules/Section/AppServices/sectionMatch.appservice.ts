
import ISectionMatchService from '../Services/Interfaces/ISectionMatchService';
import ISectionMatchAppService from './Interfaces/ISectionMatchAppService';
import SectionMatch from '../Domain/Entities/SectionMatch';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class SectionMatchAppService implements ISectionMatchAppService {
    private sectionMatchService: ISectionMatchService;
    constructor(
        @inject(TYPES.ISectionMatchService) sectionMatchService: ISectionMatchService
    ) {
        this.sectionMatchService = sectionMatchService;
    }
    insert(model: SectionMatch): BlueBird<SectionMatch> {
        return this.sectionMatchService.insert(model);
    }

    getById(id: number): BlueBird<SectionMatch> {
        return this.sectionMatchService.getById(id);
    }

    getAll(): BlueBird<Array<SectionMatch>> {
        return this.sectionMatchService.getAll();
    }

    update(id:number,model: SectionMatch): BlueBird<SectionMatch> {
        return this.sectionMatchService.update(id,model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.sectionMatchService.delete(id);
    }
}