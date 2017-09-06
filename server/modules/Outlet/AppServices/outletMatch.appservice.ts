import IOutletMatchService from '../Services/Interfaces/IOutletMatchService';
import IOutletMatchAppService from './Interfaces/IOutletMatchAppService';
import OutletMatch from '../Domain/Entities/OutletMatch';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class OutletMatchAppService implements IOutletMatchAppService {
    private outletMatchService: IOutletMatchService;
    constructor(
        @inject(TYPES.IOutletMatchService) outletMatchService: IOutletMatchService
    ) {
        this.outletMatchService = outletMatchService;
    }
    insert(model: OutletMatch): BlueBird<OutletMatch> {
        return this.outletMatchService.insert(model);
    }

    getById(id: number): BlueBird<OutletMatch> {
        return this.outletMatchService.getById(id);
    }

    getAll(): BlueBird<Array<OutletMatch>> {
        return this.outletMatchService.getAll();
    }

    update(id:number,model: OutletMatch): BlueBird<OutletMatch> {
        return this.outletMatchService.update(id,model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.outletMatchService.delete(id);
    }
}