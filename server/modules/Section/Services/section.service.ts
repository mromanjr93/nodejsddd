import ISectionService from './Interfaces/ISectionService';
import ISectionRepository from '../Domain/Interfaces/ISectionRepository';
import Section from '../Domain/Entities/Section';
import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class SectionService implements ISectionService {
    private sectionRepository:ISectionRepository;
    constructor(
        @inject(TYPES.ISectionRepository) sectionRepository: ISectionRepository,

    ) {
        this.sectionRepository = sectionRepository;
    }

    insert(model:Section):BlueBird<Section>{
        return this.sectionRepository.insert(model);
    }

    getById(id:number):BlueBird<Section>{
        return this.sectionRepository.getById(id);
    }

    getAll():BlueBird<Array<Section>>{
        return this.sectionRepository.getAll();
    }
    
    update(id, model:Section):BlueBird<Section>{
        return this.sectionRepository.update(id, model);
    }   

    delete(id:number):BlueBird<boolean>{
        return this.sectionRepository.delete(id);
    }
}