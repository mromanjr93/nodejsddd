import { Request, Response } from 'express';
import * as _ from 'lodash';

import IOutletAppService from '../AppServices/Interfaces/IOutletAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class OutletController {

    private outletAppService: IOutletAppService;

    constructor(
        @inject(TYPES.IOutletAppService) outletAppService: IOutletAppService
    ) {
        this.outletAppService = outletAppService;
     }
    
        getAll(req: Request, res: Response) {
            this.outletAppService
                .getAll()
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
        }
    
        insert(req: Request, res: Response) {
            this.outletAppService
                .insert(req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.dbErrorHandler, res))
                .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
        }
    
        getById(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletAppService
                .getById(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
        }
    
        update(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletAppService
                .update(outletId, req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuário'));
        }
    
        delete(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletAppService
                .delete(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));
    
        }
}