import { Request, Response } from 'express';
import DispatcherController from '../Controllers/dispatcher.controller';
import IDispatcherAppService from '../AppServices/Interfaces/IDispatcherAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const dispatcherAppService = resolverContainer.get<IDispatcherAppService>(TYPES.IDispatcherAppService);
const dispatcherController = new DispatcherController(dispatcherAppService);

class DispatcherRoutes {    
    constructor(            
    ) {        
        
    }
    
    toConversorQueue(req: Request, res: Response) {        
        return dispatcherController.toConversorQueue(req, res);
    }    
}

export default new DispatcherRoutes();