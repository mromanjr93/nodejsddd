import AmqpConnection from '../../shared/Helpers/amqp.connection';

import IDispatcherAppService from '../Dispatcher/AppServices/Interfaces/IDispatcherAppService';

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../Dispatcher/CrossCutting/IoC/types";
import { resolverContainer } from "../Dispatcher/CrossCutting/IoC/inversify.config";


const dispatcherAppService = resolverContainer.get<IDispatcherAppService>(TYPES.IDispatcherAppService);

AmqpConnection.connect()
    .then((ch) => {
        ch.prefetch(1);
        ch.consume('conversor.predata', (msg) => {            
            setTimeout(() => {
                let predata = JSON.parse(msg.content.toString());  
                dispatcherAppService.process(predata.providerId, predata.payload);              
                ch.ack(msg);
            },2000);
        });
    });