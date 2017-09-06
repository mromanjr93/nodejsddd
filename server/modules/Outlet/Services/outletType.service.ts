import IOutletTypeService from './Interfaces/IOutletTypeService';
import IOutletTypeRepository from '../Domain/Interfaces/IOutletTypeRepository';
import OutletType from '../Domain/Entities/OutletType';
import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class OutletTypeService implements IOutletTypeService {
    private outletTypeRepository: IOutletTypeRepository;
    constructor(
        @inject(TYPES.IOutletTypeRepository) outletTypeRepository: IOutletTypeRepository,

    ) {
        this.outletTypeRepository = outletTypeRepository;
    }

    insert(model: OutletType): BlueBird<OutletType> {
        return this.outletTypeRepository.insert(model);
    }

    getById(id: number): BlueBird<OutletType> {
        return this.outletTypeRepository.getById(id);
    }

    getAll(): BlueBird<Array<OutletType>> {
        return this.outletTypeRepository.getAll();
    }

    update(id, model: OutletType): BlueBird<OutletType> {
        return this.outletTypeRepository.update(id, model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.outletTypeRepository.delete(id);
    }
}