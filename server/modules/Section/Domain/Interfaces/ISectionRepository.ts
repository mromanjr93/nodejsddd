import IRepositoryCrudBase from '../../../../shared/Interfaces/IRepositoryBase';
import * as BlueBird from 'BlueBird';
import Section from '../../Domain/Entities/Section';

export default interface ISectionRepository extends IRepositoryCrudBase<Section> {
    getByProviderSectionId(providerId:number,id:number):BlueBird<Section>;
}