import { Request, Response } from 'express';
import * as _ from 'lodash';

import IOutletTypeAppService from '../AppServices/Interfaces/IOutletTypeAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class OutletTypeController {

    private outletTypeAppService: IOutletTypeAppService;

    constructor(
        @inject(TYPES.IOutletTypeAppService) outletTypeAppService: IOutletTypeAppService
    ) {
        this.outletTypeAppService = outletTypeAppService;
     }
    
        getAll(req: Request, res: Response) {
            console.log('aaaaa');
            this.outletTypeAppService
                .getAll()
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
        }
    
        insert(req: Request, res: Response) {
            this.outletTypeAppService
                .insert(req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.dbErrorHandler, res))
                .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
        }
    
        getById(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletTypeAppService
                .getById(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
        }
    
        update(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletTypeAppService
                .update(outletId, req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuário'));
        }
    
        delete(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.outletTypeAppService
                .delete(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));
    
        }
}