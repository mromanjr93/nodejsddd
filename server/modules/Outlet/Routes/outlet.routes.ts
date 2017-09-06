import { Request, Response } from 'express';
import OutletController from '../Controllers/outlet.controller';
import IOutletAppService from '../AppServices/Interfaces/IOutletAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const outletAppService = resolverContainer.get<IOutletAppService>(TYPES.IOutletAppService);
const outletController = new OutletController(outletAppService);
class OutletRoutes {

    
    constructor(            
    ) {        
        
    }

    index(req: Request, res: Response) {        
        return outletController.getAll(req, res);
    }

    insert(req: Request, res: Response) {        
        return outletController.insert(req, res);
    }

    findOne(req: Request, res: Response) {
        return outletController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return outletController.update(req, res);
    }

    destroy(req: Request, res: Response) {
        return outletController.delete(req, res);
    }
}

export default new OutletRoutes();