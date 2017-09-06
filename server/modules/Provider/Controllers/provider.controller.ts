import { Request, Response } from 'express';
import * as _ from 'lodash';

import IProviderAppService from '../AppServices/Interfaces/IProviderAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class ProviderController {

    private providerAppService: IProviderAppService;

    constructor(
        @inject(TYPES.IProviderAppService) providerAppService: IProviderAppService
    ) {
        this.providerAppService = providerAppService;
     }
    
        getAll(req: Request, res: Response) {
            this.providerAppService
                .getAll()
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
        }
    
        insert(req: Request, res: Response) {
            this.providerAppService
                .insert(req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.dbErrorHandler, res))
                .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`));
        }
    
        getById(req: Request, res: Response) {
            const providerId = parseInt(req.params.id);
            this.providerAppService
                .getById(providerId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
        }
    
        update(req: Request, res: Response) {
            const providerId = parseInt(req.params.id);
            this.providerAppService
                .update(providerId, req.body)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar usuário'));
        }
    
        delete(req: Request, res: Response) {
            const outletId = parseInt(req.params.id);
            this.providerAppService
                .delete(outletId)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));
    
        }
}