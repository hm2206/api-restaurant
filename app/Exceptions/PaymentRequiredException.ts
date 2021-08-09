import { Exception } from '@adonisjs/core/build/standalone'
import PaymentItem from 'App/Helpers/PaymentItem';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new PaymentRequiredException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/

let message = "Los datos son requeridos"

export default class PaymentRequiredException extends Exception {

    errors = {}

    constructor(newErrors: PaymentItem[]) {
        super(message);
        this.code = "E_PAYMENT_REQUIRED";
        this.status = 402
        this.settingErrors(newErrors)
    }

    private settingErrors (newErrors: any[]) {
        let item: PaymentItem
        for (item of newErrors) {
            this.errors[item.getField()] = item.getMessage() ? [item.getMessage()] : []
        }
    }

}
