import { Request, Response } from 'express';
import * as _ from 'lodash';

import ISectionMatchAppService from '../AppServices/Interfaces/ISectionMatchAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class SectionMatchController {

    private sectionMatchAppService: ISectionMatchAppService;

    constructor(
        @inject(TYPES.ISectionMatchAppService) sectionMatchAppService: ISectionMatchAppService
    ) {
        this.sectionMatchAppService = sectionMatchAppService;
     }
    
        getAll(req: Request, res: Response) {
            this.sectionMatchAppService
                .getAll()
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
        }
    
        insert(req: Request, res: Response) {
            this.sectionMatchAppService
                .insert(req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.dbErrorHandler, res))
                .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
        }
    
        getById(req: Request, res: Response) {
            const sectionId = parseInt(req.params.id);
            this.sectionMatchAppService
                .getById(sectionId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
        }
    
        update(req: Request, res: Response) {
            const sectionId = parseInt(req.params.id);
            this.sectionMatchAppService
                .update(sectionId, req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuário'));
        }
    
        delete(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.sectionMatchAppService
                .delete(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));
    
        }
}