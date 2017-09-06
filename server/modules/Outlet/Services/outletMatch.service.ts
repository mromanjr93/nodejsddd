import IOutletMatchService from './Interfaces/IOutletMatchService';
import IOutletMatchRepository from '../Domain/Interfaces/IOutletMatchRepository';
import OutletMatch from '../Domain/Entities/OutletMatch';
import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class OutletMatchService implements IOutletMatchService {
    private outletMatchRepository: IOutletMatchRepository;
    constructor(
        @inject(TYPES.IOutletRepository) outletMatchRepository: IOutletMatchRepository,

    ) {
        this.outletMatchRepository = outletMatchRepository;
    }

    insert(model: OutletMatch): BlueBird<OutletMatch> {
        return this.outletMatchRepository.insert(model);
    }

    getById(id: number): BlueBird<OutletMatch> {
        return this.outletMatchRepository.getById(id);
    }

    getAll(): BlueBird<Array<OutletMatch>> {
        return this.outletMatchRepository.getAll();
    }

    update(id, model: OutletMatch): BlueBird<OutletMatch> {
        return this.outletMatchRepository.update(id, model);
    }

    delete(id: number): BlueBird<boolean> {
        return this.outletMatchRepository.delete(id);
    }
}