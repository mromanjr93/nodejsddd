import IProviderService from './Interfaces/IProviderService';
import IProviderRepository from '../Domain/Interfaces/IProviderRepository';
import Provider from '../Domain/Entities/Provider';
import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class ProviderService implements IProviderService {
    private ProviderRepository:IProviderRepository;
    constructor(
        @inject(TYPES.IProviderRepository) ProviderRepository: IProviderRepository,

    ) {
        this.ProviderRepository = ProviderRepository;
    }

    insert(model:Provider):BlueBird<Provider>{
        return this.ProviderRepository.insert(model);
    }

    getById(id:number):BlueBird<Provider>{
        return this.ProviderRepository.getById(id);
    }

    getAll():BlueBird<Array<Provider>>{
        return this.ProviderRepository.getAll();
    }
    
    update(id, model:Provider):BlueBird<Provider>{
        return this.ProviderRepository.update(id, model);
    }   

    delete(id:number):BlueBird<boolean>{
        return this.ProviderRepository.delete(id);
    }
}