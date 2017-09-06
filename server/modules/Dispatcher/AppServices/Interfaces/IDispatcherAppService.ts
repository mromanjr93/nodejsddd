import DispatcherDto from '../Dtos/DispatcherDto';
import * as BlueBird from 'Bluebird';
export default interface IDispatcherAppService  {
    toConversorQueue(providerId:number, model:DispatcherDto[]):BlueBird<any>;
    process(providerId:number,dispatcherDto:Array<DispatcherDto>):BlueBird<any>;
}

