import IRepositoryCrudBase from '../../../../shared/Interfaces/IRepositoryBase';
import Outlet from '../../Domain/Entities/Outlet';

import * as BlueBird from 'BlueBird';

export default interface IOutletRepository extends IRepositoryCrudBase<Outlet> {
    getByProviderOutletId(providerId:number,id:number):BlueBird<Outlet>;
}