import { Container } from "inversify";
import { TYPES } from "./types";
import ProviderService from "../../Services/provider.service";
import ProviderAppService from "../../AppServices/provider.appservice";
import ProviderRepository from "../../Infrastructure/Repositories/ProviderRepository";

import IProviderRepository from '../../Domain/Interfaces/IProviderRepository';
import IProviderService from '../../Services/Interfaces/IProviderService';
import IProviderAppService from '../../AppServices/Interfaces/IProviderAppService';

var resolverContainer = new Container();
resolverContainer.bind<IProviderRepository>(TYPES.IProviderRepository).to(ProviderRepository);
resolverContainer.bind<IProviderService>(TYPES.IProviderService).to(ProviderService);
resolverContainer.bind<IProviderAppService>(TYPES.IProviderAppService).to(ProviderAppService);
export { resolverContainer };