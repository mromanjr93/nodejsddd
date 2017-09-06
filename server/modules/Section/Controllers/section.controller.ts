import { Request, Response } from 'express';
import * as _ from 'lodash';

import ISectionAppService from '../AppServices/Interfaces/ISectionAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class SectionController {

    private sectionAppService: ISectionAppService;

    constructor(
        @inject(TYPES.ISectionAppService) sectionAppService: ISectionAppService
    ) {
        this.sectionAppService = sectionAppService;
     }
    
        getAll(req: Request, res: Response) {
            this.sectionAppService
                .getAll()
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
        }
    
        insert(req: Request, res: Response) {
            this.sectionAppService
                .insert(req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.dbErrorHandler, res))
                .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
        }
    
        getById(req: Request, res: Response) {
            const sectionId = parseInt(req.params.id);
            this.sectionAppService
                .getById(sectionId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
        }
    
        update(req: Request, res: Response) {
            const sectionId = parseInt(req.params.id);
            this.sectionAppService
                .update(sectionId, req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuário'));
        }
    
        delete(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.sectionAppService
                .delete(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));
    
        }
}