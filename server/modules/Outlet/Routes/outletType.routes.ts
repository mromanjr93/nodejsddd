import { Request, Response } from 'express';
import OutletTypeController from '../Controllers/outletType.controller';
import IOutletTypeAppService from '../AppServices/Interfaces/IOutletTypeAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const outletTypeAppService = resolverContainer.get<IOutletTypeAppService>(TYPES.IOutletTypeAppService);
const outletTypeController = new OutletTypeController(outletTypeAppService);
class OutletTypeRoutes {

    
    constructor(            
    ) {        
        
    }

    index(req: Request, res: Response) {        
        return outletTypeController.getAll(req, res);
    }

    insert(req: Request, res: Response) {        
        return outletTypeController.insert(req, res);
    }

    findOne(req: Request, res: Response) {
        return outletTypeController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return outletTypeController.update(req, res);
    }

    destroy(req: Request, res: Response) {
        return outletTypeController.delete(req, res);
    }
}

export default new OutletTypeRoutes();