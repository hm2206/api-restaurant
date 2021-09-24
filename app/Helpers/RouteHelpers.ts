import Route from '@ioc:Adonis/Core/Route';
import { RouteContract } from '@ioc:Adonis/Core/Route';

const methods = require('../../start/method.json');

export default class RouteHelpers {

    public static resolver(methodHttp: string, handle: string, verify = true): RouteContract {
        let method = methods[handle];
        if (typeof method != 'object') throw new Error("El método es invalido!!!");
        const newRoute: RouteContract = Route[methodHttp](method?.url, handle);
        // if (verify) newRoute.middleware('allow');
        return newRoute
    }

}

