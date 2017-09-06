import { Request, Response } from 'express';
import SectionMatchController from '../Controllers/sectionMatch.controller';
import ISectionMatchAppService from '../AppServices/Interfaces/ISectionMatchAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import { resolverContainer } from "../CrossCutting/IoC/inversify.config";


const sectionMatchAppService = resolverContainer.get<ISectionMatchAppService>(TYPES.ISectionMatchAppService);
const sectionMatchController = new SectionMatchController(sectionMatchAppService);

class SectionMatchRoutes {    
    constructor(            
    ) {        
        
    }

    index(req: Request, res: Response) {        
        return sectionMatchController.getAll(req, res);
    }

    insert(req: Request, res: Response) {        
        return sectionMatchController.insert(req, res);
    }

    findOne(req: Request, res: Response) {
        return sectionMatchController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return sectionMatchController.update(req, res);
    }

    destroy(req: Request, res: Response) {
        return sectionMatchController.delete(req, res);
    }
}

export default new SectionMatchRoutes();