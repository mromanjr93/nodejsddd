
import IDispatcherService from '../Services/Interfaces/IDispatcherService';
import IDispatcherAppService from './Interfaces/IDispatcherAppService';
import DispatcherDto from './Dtos/DispatcherDto';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class DispatcherAppService implements IDispatcherAppService {
    
    private dispatcherService: IDispatcherService;
    constructor(
        @inject(TYPES.IDispatcherService) dispatcherService: IDispatcherService
    ) {
        this.dispatcherService = dispatcherService;
    }

    toConversorQueue(providerId:number, dispatcherDto: DispatcherDto[]): BlueBird<any> {
        return this.dispatcherService.toConversorQueue(providerId, dispatcherDto);
    }

    process(providerId:number, dispatcherDto: DispatcherDto[]): BlueBird<any> {
        return this.dispatcherService.process(providerId, dispatcherDto);
    }    
}