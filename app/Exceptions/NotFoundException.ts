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
| new NotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotFoundException extends Exception {

    constructor(message: string) {
        let tmpMessage = `No se encontró: ${message}`;
        super(tmpMessage);
        this.message = tmpMessage
        this.code = "E_NOT_FOUND";
        this.status = 404
    }
}
