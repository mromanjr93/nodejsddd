import { Request, Response } from 'express';
import * as _ from 'lodash';

import IOutletMatchAppService from '../AppServices/Interfaces/IOutletMatchAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class OutletMatchController {

    private outletMatchAppService: IOutletMatchAppService;

    constructor(
        @inject(TYPES.IOutletMatchAppService) outletMatchAppService: IOutletMatchAppService
    ) {
        this.outletMatchAppService = outletMatchAppService;
     }
    
        getAll(req: Request, res: Response) {
            this.outletMatchAppService
                .getAll()
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
        }
    
        insert(req: Request, res: Response) {
            this.outletMatchAppService
                .insert(req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.dbErrorHandler, res))
                .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
        }
    
        getById(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletMatchAppService
                .getById(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
        }
    
        update(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletMatchAppService
                .update(outletId, req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuário'));
        }
    
        delete(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletMatchAppService
                .delete(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));    
        }
}