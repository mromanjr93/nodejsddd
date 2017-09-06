import AmqpConnection from '../../../shared/Helpers/amqp.connection';

import IDispatcherService from './Interfaces/IDispatcherService';
import IOutletRepository from '../../Outlet/Domain/Interfaces/IOutletRepository';
import ISectionRepository from '../../Section/Domain/Interfaces/ISectionRepository';

import Dispatcher from '../Domain/Entities/Dispatcher';
import Outlet from '../../Outlet/Domain/Entities/Outlet';
import Section from '../../Section/Domain/Entities/Section';

import * as BlueBird from 'Bluebird';
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../CrossCutting/IoC/types";
import * as _ from 'lodash';


@injectable()
export default class DispatcherService implements IDispatcherService {

    private outletRepository: IOutletRepository;
    private sectionRepository: ISectionRepository;

    constructor(
        @inject(TYPES.IOutletRepository) outletRepository: IOutletRepository,
        @inject(TYPES.ISectionRepository) sectionRepository: ISectionRepository
    ) {
        this.outletRepository = outletRepository;
        this.sectionRepository = sectionRepository;
    }

    toConversorQueue(providerId: number, model: Dispatcher[]): BlueBird<any> {
        if (!model.length) {
            return BlueBird.resolve(false);
        }

        let conversorPreData = {
            providerId: providerId,
            payload: model
        };

        return this.publishToConversorQueue(conversorPreData);
    }

    process(providerId: number, model: Dispatcher[]): BlueBird<any> {
        if (!model.length) {
            return BlueBird.resolve(false);
        }

        return this.outletRepository
            .getByProviderOutletId(providerId, parseInt(model[0].IdVeiculo))
            .then((outlet) => {
                return (outlet == null) ? this.mapToOutlet(providerId, model[0]) : outlet;
            })
            .then((outlet) => {
                return (outlet.outletId != null)
                    ? outlet
                    : this.outletRepository.insert(outlet).then((res) => {
                        return res;
                    });
            })
            .then((outlet) => {
                let sections = [];
                let sectionsPromise: Array<BlueBird<Section>> = [];


                for (var i = 0; i < model.length; i++) {
                    let section = this.mapToSection(providerId, outlet.outletId, model[i]);
                    sections.push(section);
                }

                var sec = _.uniqWith(sections, _.isEqual);

                for (var i = 0; i < sec.length; i++) {
                    sectionsPromise.push(this.sectionRepository.getByProviderSectionId(providerId, sec[i].sectionProviderSectionId));
                }

                return BlueBird
                    .all(sectionsPromise)
                    .then((sections) => {
                        let insertedSections = [];
                        let insertedSectionsPromises = [];
                        for (var i = 0; i < sec.length; i++) {
                            if (sections[i] == null) {
                                insertedSectionsPromises.push(this.sectionRepository.insert(sec[i]));
                            }
                            else {
                                insertedSections.push(sections[i]);
                            }
                        }

                        if (insertedSectionsPromises.length) {
                            return BlueBird
                                .all(insertedSectionsPromises)
                                .then((inserts) => {
                                    let sections = [];
                                    for (var i = 0; i < inserts.length; i++) {
                                        sections.push(inserts[i].dataValues);
                                    }
                                    return sections;
                                });
                        }
                        return insertedSections;
                    });
            })
            .then((insertedSections) => {
                let pages = [];

                for (var i = 0; i < insertedSections.length; i++) {
                    for (var mi = 0; mi < model.length; mi++) {
                        if(insertedSections[i].sectionProviderSectionId == model[i].IdCaderno){
                            pages.push({
                                pageNumber: model[mi].NumeroPagina,
                                pageSource: model[mi].CaminhoFTP,
                                pageSectionId: insertedSections[i].sectionId
                            });
                        }                        
                    }
                }

                console.log('Seções Inseridas', insertedSections);
                console.log('\n\n\nPrimeira Seção', insertedSections[0]);
                console.log('\n\n\nPaginas', pages);
                this.publishToPagesQueue(model);
            });

    }

    private publishToConversorQueue(predata: any): BlueBird<any> {
        return AmqpConnection.connect()
            .then((ch) => {
                return ch.sendToQueue('conversor.predata', new Buffer(JSON.stringify(predata)));
            });
    }

    private publishToPagesQueue(dispatcher: Dispatcher[]) {
        AmqpConnection.connect()
            .then((ch) => {
                ch.sendToQueue('conversor.pages', new Buffer(JSON.stringify(dispatcher)));
            });
    }

    private mapToOutlet(providerId: number, model: Dispatcher) {
        let outlet = new Outlet();
        outlet.outletName = model.Veiculo;
        outlet.outletProviderId = providerId;
        outlet.outletProviderOutletId = parseInt(model.IdVeiculo);
        outlet.outletTypeId = model.IdMidia;
        return outlet;
    }

    private mapToSection(providerId: number, outletId: number, model: Dispatcher) {
        let section = new Section();
        section.sectionName = model.Caderno;
        section.sectionOutletId = outletId;
        section.sectionProviderSectionId = model.IdCaderno;
        section.sectionProviderId = providerId;
        return section;
    }
}