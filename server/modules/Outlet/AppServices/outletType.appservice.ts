import IOutletTypeService from '../Services/Interfaces/IOutletTypeService';
import IOutletTypeAppService from './Interfaces/IOutletTypeAppService';
import OutletType from '../Domain/Entities/OutletType';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class OutletTypeAppService implements IOutletTypeAppService {
    private outletTypeService: IOutletTypeService;
    constructor(
        @inject(TYPES.IOutletTypeService) outletTypeService: IOutletTypeService
    ) {
        this.outletTypeService = outletTypeService;
    }
    insert(model: OutletType): BlueBird<OutletType> {
        return this.outletTypeService.insert(model);
    }

    getById(id: number): BlueBird<OutletType> {
        return this.outletTypeService.getById(id);
    }

    getAll(): BlueBird<Array<OutletType>> {
        return this.outletTypeService.getAll();
    }

    update(id:number,model: OutletType): BlueBird<OutletType> {
        return this.outletTypeService.update(id,model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.outletTypeService.delete(id);
    }
}