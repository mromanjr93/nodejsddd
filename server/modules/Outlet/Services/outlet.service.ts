import IOutletService from './Interfaces/IOutletService';
import IOutletRepository from '../Domain/Interfaces/IOutletRepository';
import Outlet from '../Domain/Entities/Outlet';
import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class OutletService implements IOutletService {
    private outletRepository:IOutletRepository;
    constructor(
        @inject(TYPES.IOutletRepository) outletRepository: IOutletRepository,

    ) {
        this.outletRepository = outletRepository;
    }

    insert(model:Outlet):BlueBird<Outlet>{
        return this.outletRepository.insert(model);
    }

    getById(id:number):BlueBird<Outlet>{
        return this.outletRepository.getById(id);
    }

    getAll():BlueBird<Array<Outlet>>{
        return this.outletRepository.getAll();
    }
    
    update(id, model:Outlet):BlueBird<Outlet>{
        return this.outletRepository.update(id, model);
    }   

    delete(id:number):BlueBird<boolean>{
        return this.outletRepository.delete(id);
    }
}