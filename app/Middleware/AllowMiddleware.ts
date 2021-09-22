import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientException from 'App/Exceptions/ClientException'
import Client from 'App/Models/Client' 
import System from 'App/Models/System'

export default class AllowMiddleware {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    let { request } = ctx;
    // code for middleware goes here. ABOVE THE NEXT CALL
    let systemToken = request.header('SystemToken', request.input('SystemToken', '_error'))
    let system = await System.findBy('token', systemToken);
    let clientToken = request.header('ClientToken', request.input('ClientToken', '_error'))
    let client = await Client.findBy('token', clientToken)
    // validations
    if (system) {
      // agregar sistema
      ctx.system = system
    } else if (client) {
      // agregar client
      ctx.client = client;
    } else {
      throw new ClientException()
    }
    // executar la siguiente acción
    await next()
  }
}
