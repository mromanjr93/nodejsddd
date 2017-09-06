import ISectionMatchService from './Interfaces/ISectionMatchService';
import ISectionMatchRepository from '../Domain/Interfaces/ISectionMatchRepository';
import SectionMatch from '../Domain/Entities/SectionMatch';
import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class SectionMatchService implements ISectionMatchService {
    private sectionMatchRepository:ISectionMatchRepository;
    constructor(
        @inject(TYPES.ISectionMatchRepository) sectionMatchRepository: ISectionMatchRepository,

    ) {
        this.sectionMatchRepository = sectionMatchRepository;
    }

    insert(model:SectionMatch):BlueBird<SectionMatch>{
        return this.sectionMatchRepository.insert(model);
    }

    getById(id:number):BlueBird<SectionMatch>{
        return this.sectionMatchRepository.getById(id);
    }

    getAll():BlueBird<Array<SectionMatch>>{
        return this.sectionMatchRepository.getAll();
    }
    
    update(id, model:SectionMatch):BlueBird<SectionMatch>{
        return this.sectionMatchRepository.update(id, model);
    }   

    delete(id:number):BlueBird<boolean>{
        return this.sectionMatchRepository.delete(id);
    }
}