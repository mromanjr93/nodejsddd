import { Request, Response } from 'express';
import * as _ from 'lodash';

import IDispatcherAppService from '../AppServices/Interfaces/IDispatcherAppService';
import Handlers from '../../../api/responses/handlers';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";

@injectable()
export default class DispatcherController {

    private dispatcherAppService: IDispatcherAppService;

    constructor(
        @inject(TYPES.IDispatcherAppService) dispatcherAppService: IDispatcherAppService
    ) {
        this.dispatcherAppService = dispatcherAppService;
    }

    toConversorQueue(req: Request, res: Response) {
        const providerId = parseInt(req.params.id);
        this.dispatcherAppService
            .toConversorQueue(providerId, req.body)
            .then(_.partial(Handlers.onSuccess, res))            
            .catch(_.partial(Handlers.onError, res, 'Erro ao processar mídias e cadernos'));
    }
}