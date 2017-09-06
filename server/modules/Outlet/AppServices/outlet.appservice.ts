
import IOutletService from '../Services/Interfaces/IOutletService';
import IOutletAppService from './Interfaces/IOutletAppService';
import Outlet from '../Domain/Entities/Outlet';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as BlueBird from 'bluebird';

@injectable()
export default class OutletAppService implements IOutletAppService {
    private outletService: IOutletService;
    constructor(
        @inject(TYPES.IOutletService) outletService: IOutletService
    ) {
        this.outletService = outletService;
    }
    insert(model: Outlet): BlueBird<Outlet> {
        return this.outletService.insert(model);
    }

    getById(id: number): BlueBird<Outlet> {
        return this.outletService.getById(id);
    }

    getAll(): BlueBird<Array<Outlet>> {
        return this.outletService.getAll();
    }

    update(id:number,model: Outlet): BlueBird<Outlet> {
        return this.outletService.update(id,model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.outletService.delete(id);
    }
}