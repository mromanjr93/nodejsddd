import { Request, Response } from 'express';
import OutletMatchController from '../Controllers/outletMatch.controller';
import IoutletMatchAppService from '../AppServices/Interfaces/IoutletMatchAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const outletMatchAppService = resolverContainer.get<IoutletMatchAppService>(TYPES.IOutletAppService);
const outletMatchController = new OutletMatchController(outletMatchAppService);
class OutletMatchRoutes {

    
    constructor(            
    ) {        
        
    }

    index(req: Request, res: Response) {        
        return outletMatchController.getAll(req, res);
    }

    insert(req: Request, res: Response) {        
        return outletMatchController.insert(req, res);
    }

    findOne(req: Request, res: Response) {
        return outletMatchController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return outletMatchController.update(req, res);
    }

    destroy(req: Request, res: Response) {
        return outletMatchController.delete(req, res);
    }
}

export default new OutletMatchRoutes();