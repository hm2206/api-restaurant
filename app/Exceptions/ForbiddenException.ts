import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ForbiddenException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/

const message = "Usted no posee los permisos necesarios para cierto contenido";

export default class ForbiddenException extends Exception {

    constructor() {
        super(message);
        this.message = message
        this.code = "E_FORBIDDEN";
        this.status = 403
    }

}
