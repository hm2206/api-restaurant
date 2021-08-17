/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import PaymentItem from 'App/Helpers/PaymentItem'
import PaymentRequiredException from './PaymentRequiredException'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {

    let status = error?.status || 500
    let code = error?.code
    let message = error?.message
    let errors = error.errors || {};
    // custimizar errors
    try {
      if (code == 'E_VALIDATION_FAILURE') this.handleErrors(error?.messages?.errors || [])
    } catch (newError) {
      code = newError.code;
      message = newError.message;
      errors = newError?.errors || errors;
    }
    // response
    ctx.response.status(status).send({
      code,
      message,
      errors
    })

  }


  private handleErrors (errors: any = []) {
    let payload: PaymentItem[] = []; 
    for (let err of errors) {
      let value = new PaymentItem(err?.field, err.message);
      payload.push(value)
    }
    
    throw new PaymentRequiredException(payload)
  }
   
}
