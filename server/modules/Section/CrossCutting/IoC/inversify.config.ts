import { Container } from "inversify";
import { TYPES } from "./types";
import SectionService from "../../Services/section.service";
import SectionAppService from "../../AppServices/section.appservice";
import SectionRepository from "../../Infrastructure/Repositories/SectionRepository";

import ISectionRepository from '../../Domain/Interfaces/ISectionRepository';
import ISectionService from '../../Services/Interfaces/ISectionService';
import ISectionAppService from '../../AppServices/Interfaces/ISectionAppService';


import SectionMatchService from "../../Services/sectionMatch.service";
import SectionMatchAppService from "../../AppServices/sectionMatch.appservice";
import SectionMatchRepository from "../../Infrastructure/Repositories/SectionMatchRepository";

import ISectionMatchRepository from '../../Domain/Interfaces/ISectionMatchRepository';
import ISectionMatchService from '../../Services/Interfaces/ISectionMatchService';
import ISectionMatchAppService from '../../AppServices/Interfaces/ISectionMatchAppService';


var resolverContainer = new Container();
resolverContainer.bind<ISectionRepository>(TYPES.ISectionRepository).to(SectionRepository);
resolverContainer.bind<ISectionService>(TYPES.ISectionService).to(SectionService);
resolverContainer.bind<ISectionAppService>(TYPES.ISectionAppService).to(SectionAppService);

resolverContainer.bind<ISectionMatchRepository>(TYPES.ISectionMatchRepository).to(SectionMatchRepository);
resolverContainer.bind<ISectionMatchService>(TYPES.ISectionMatchService).to(SectionMatchService);
resolverContainer.bind<ISectionMatchAppService>(TYPES.ISectionMatchAppService).to(SectionMatchAppService);
export { resolverContainer };