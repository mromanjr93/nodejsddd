import { Container } from "inversify";
import { TYPES } from "./types";
import OutletService from "../../Services/outlet.service";
import OutletAppService from "../../AppServices/outlet.appservice";
import OutletRepository from "../../Infrastructure/Repositories/OutletRepository";

import OutletTypeService from "../../Services/outletType.service";
import OutletTypeAppService from "../../AppServices/outletType.appservice";
import OutletTypeRepository from "../../Infrastructure/Repositories/OutletTypeRepository";

import OutletMatchService from "../../Services/outletMatch.service";
import OutletMatchAppService from "../../AppServices/outletMatch.appservice";
import OutletMatchRepository from "../../Infrastructure/Repositories/OutletMatchRepository";

import IOutletRepository from '../../Domain/Interfaces/IOutletRepository';
import IOutletService from '../../Services/Interfaces/IOutletService';
import IOutletAppService from '../../AppServices/Interfaces/IOutletAppService';


import IOutletTypeRepository from '../../Domain/Interfaces/IOutletTypeRepository';
import IOutletTypeService from '../../Services/Interfaces/IOutletTypeService';
import IOutletTypeAppService from '../../AppServices/Interfaces/IOutletTypeAppService';


import IOutletMatchRepository from '../../Domain/Interfaces/IOutletMatchRepository';
import IOutletMatchService from '../../Services/Interfaces/IOutletMatchService';
import IOutletMatchAppService from '../../AppServices/Interfaces/IOutletMatchAppService';

var resolverContainer = new Container();
resolverContainer.bind<IOutletRepository>(TYPES.IOutletRepository).to(OutletRepository);
resolverContainer.bind<IOutletService>(TYPES.IOutletService).to(OutletService);
resolverContainer.bind<IOutletAppService>(TYPES.IOutletAppService).to(OutletAppService);

resolverContainer.bind<IOutletTypeRepository>(TYPES.IOutletTypeRepository).to(OutletTypeRepository);
resolverContainer.bind<IOutletTypeService>(TYPES.IOutletTypeService).to(OutletTypeService);
resolverContainer.bind<IOutletTypeAppService>(TYPES.IOutletTypeAppService).to(OutletTypeAppService);

resolverContainer.bind<IOutletMatchRepository>(TYPES.IOutletMatchRepository).to(OutletMatchRepository);
resolverContainer.bind<IOutletMatchService>(TYPES.IOutletMatchService).to(OutletMatchService);
resolverContainer.bind<IOutletMatchAppService>(TYPES.IOutletMatchAppService).to(OutletMatchAppService);
export { resolverContainer };