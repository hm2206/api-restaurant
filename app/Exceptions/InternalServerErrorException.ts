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
| new InternalServerErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InternalServerErrorException extends Exception {

    constructor(message: string) {
        super(message);
        this.message = message
        this.code = "E_INTERNAL_SERVER";
        this.status = 500
    }

}
