import IProviderService from '../Services/Interfaces/IProviderService';
import IProviderAppService from './Interfaces/IProviderAppService';
import Provider from '../Domain/Entities/Provider';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class ProviderAppService implements IProviderAppService {
    private providerService: IProviderService;
    constructor(
        @inject(TYPES.IProviderService) providerService: IProviderService
    ) {
        this.providerService = providerService;
    }
    insert(model: Provider): BlueBird<Provider> {
        return this.providerService.insert(model);
    }

    getById(id: number): BlueBird<Provider> {
        return this.providerService.getById(id);
    }

    getAll(): BlueBird<Array<Provider>> {
        return this.providerService.getAll();
    }

    update(id:number,model: Provider): BlueBird<Provider> {
        return this.providerService.update(id,model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.providerService.delete(id);
    }
}