import { Request, Response } from 'express';
import SectionController from '../Controllers/section.controller';
import ISectionAppService from '../AppServices/Interfaces/ISectionAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const sectionAppService = resolverContainer.get<ISectionAppService>(TYPES.ISectionAppService);
const sectionController = new SectionController(sectionAppService);

class SectionRoutes {    
    constructor(            
    ) {        
        
    }

    index(req: Request, res: Response) {        
        return sectionController.getAll(req, res);
    }

    insert(req: Request, res: Response) {        
        return sectionController.insert(req, res);
    }

    findOne(req: Request, res: Response) {
        return sectionController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return sectionController.update(req, res);
    }

    destroy(req: Request, res: Response) {
        return sectionController.delete(req, res);
    }
}

export default new SectionRoutes();