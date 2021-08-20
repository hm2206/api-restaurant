import Route from '@ioc:Adonis/Core/Route';

const methods = require('../../start/method.json');

export default class RouteHelpers {

    static resolver(methodHttp: string, handle: string) {
        let method = methods[handle];
        if (typeof method != 'object') throw new Error("El método es invalido!!!");
        return Route[methodHttp](method?.url, handle);
    }

}

