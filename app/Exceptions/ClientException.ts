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
| new ClientException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ClientException extends Exception {

    constructor() {
        let message = "La aplicación cliente no está permitido";
        super(message);
        this.message = message;
        this.code = 'E_DENY_CLIENT';
        this.status = 401
    }

}
