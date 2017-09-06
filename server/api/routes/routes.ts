import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/User/routes';
import OutletRoutes from '../../modules/Outlet/Routes/outlet.routes';
import OutletTypeRoutes from '../../modules/Outlet/Routes/outletType.routes';
import OutletMatchRoutes from '../../modules/Outlet/Routes/outletMatch.routes';
import SectionRoutes from '../../modules/Section/Routes/section.routes';
import SectionMatchRoutes from '../../modules/Section/Routes/sectionMatch.routes';
import ProviderRoutes from '../../modules/Provider/Routes/provider.routes';
import DispatcherRoutes from '../../modules/Dispatcher/Routes/dispatcher.routes';
import TokenRoutes from '../../modules/Auth/auth';

class Routes {    
    constructor() {
    }

    initRoutes(app: Application, auth: any): void {
        app.route('/api/users').all(auth.config().authenticate()).get(UserRoutes.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRoutes.findOne);
        app.route('/api/users').all(auth.config().authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(UserRoutes.destroy);
        app.route('/token').post(TokenRoutes.auth);

        app.route('/api/outlets').get(OutletRoutes.index);
        app.route('/api/outlets/:id').get(OutletRoutes.findOne);
        app.route('/api/outlets').post(OutletRoutes.insert);
        app.route('/api/outlets/:id').put(OutletRoutes.update);
        app.route('/api/outlets/:id').delete(OutletRoutes.destroy);

        app.route('/api/outlettypes').get(OutletTypeRoutes.index);
        app.route('/api/outlettypes/:id').get(OutletTypeRoutes.findOne);
        app.route('/api/outlettypes').post(OutletTypeRoutes.insert);
        app.route('/api/outlettypes/:id').put(OutletTypeRoutes.update);
        app.route('/api/outlettypes/:id').delete(OutletTypeRoutes.destroy);

        app.route('/api/outletmatches').get(OutletMatchRoutes.index);
        app.route('/api/outletmatches/:id').get(OutletMatchRoutes.findOne);
        app.route('/api/outletmatches').post(OutletMatchRoutes.insert);
        app.route('/api/outletmatches/:id').put(OutletMatchRoutes.update);
        app.route('/api/outletmatches/:id').delete(OutletMatchRoutes.destroy);

        app.route('/api/sections').get(SectionRoutes.index);
        app.route('/api/sections/:id').get(SectionRoutes.findOne);
        app.route('/api/sections').post(SectionRoutes.insert);
        app.route('/api/sections/:id').put(SectionRoutes.update);
        app.route('/api/sections/:id').delete(SectionRoutes.destroy);

        app.route('/api/sectionmatches').get(SectionMatchRoutes.index);
        app.route('/api/sectionmatches/:id').get(SectionMatchRoutes.findOne);
        app.route('/api/sectionmatches').post(SectionMatchRoutes.insert);
        app.route('/api/sectionmatches/:id').put(SectionMatchRoutes.update);
        app.route('/api/sectionmatches/:id').delete(SectionMatchRoutes.destroy);

        app.route('/api/providers').get(ProviderRoutes.index);
        app.route('/api/providers/:id').get(ProviderRoutes.findOne);
        app.route('/api/providers').post(ProviderRoutes.insert);
        app.route('/api/providers/:id').put(ProviderRoutes.update);
        app.route('/api/providers/:id').delete(ProviderRoutes.destroy);

        app.route('/api/dispatcher/:id').post(DispatcherRoutes.toConversorQueue);        
    }
}

export default new Routes();