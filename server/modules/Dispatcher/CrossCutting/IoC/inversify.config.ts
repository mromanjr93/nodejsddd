import { Container } from "inversify";
import { TYPES } from "./types";
import DispatcherService from "../../Services/Dispatcher.service";
import DispatcherAppService from "../../AppServices/Dispatcher.appservice";
import OutletRepository from "../../../Outlet/Infrastructure/Repositories/OutletRepository";
import SectionRepository from "../../../Section/Infrastructure/Repositories/SectionRepository";


import IDispatcherService from '../../Services/Interfaces/IDispatcherService';
import IDispatcherAppService from '../../AppServices/Interfaces/IDispatcherAppService';
import IOutletRepository from '../../../Outlet/Domain/Interfaces/IOutletRepository';
import ISectionRepository from '../../../Section/Domain/Interfaces/ISectionRepository';

var resolverContainer = new Container();
resolverContainer.bind<IDispatcherService>(TYPES.IDispatcherService).to(DispatcherService);
resolverContainer.bind<IDispatcherAppService>(TYPES.IDispatcherAppService).to(DispatcherAppService);
resolverContainer.bind<IOutletRepository>(TYPES.IOutletRepository).to(OutletRepository);
resolverContainer.bind<ISectionRepository>(TYPES.ISectionRepository).to(SectionRepository);
export { resolverContainer };