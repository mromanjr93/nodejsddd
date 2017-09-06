import Dispatcher from '../../Domain/Entities/Dispatcher';
import * as BlueBird from 'BlueBird';

export default interface ISectionService {
    toConversorQueue(providerId:number, model:Dispatcher[]):BlueBird<any>;
    process(providerId:number, model:Dispatcher[]):BlueBird<any>;
}