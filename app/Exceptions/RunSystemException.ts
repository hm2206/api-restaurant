import { Exception } from '@adonisjs/core/build/standalone'

export default class RunSystemException extends Exception {

    constructor() {
        let message = "Error al cargar el sistema";
        super(message)
        this.message = message;
        this.code = "E_RUN_SYSTEM";
        this.status = 501;
    }

}
