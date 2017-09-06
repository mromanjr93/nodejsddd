import { Request, Response } from 'express';
import ProviderController from '../Controllers/provider.controller';
import IProviderAppService from '../AppServices/Interfaces/IProviderAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const providerAppService = resolverContainer.get<IProviderAppService>(TYPES.IProviderAppService);
const providerController = new ProviderController(providerAppService);

class ProviderRoutes {    
    constructor(            
    ) {        
        
    }

    index(req: Request, res: Response) {        
        return providerController.getAll(req, res);
    }

    insert(req: Request, res: Response) {        
        return providerController.insert(req, res);
    }

    findOne(req: Request, res: Response) {
        return providerController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return providerController.update(req, res);
    }

    destroy(req: Request, res: Response) {
        return providerController.delete(req, res);
    }
}

export default new ProviderRoutes();