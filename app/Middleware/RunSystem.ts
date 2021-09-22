import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import System from 'App/Models/System'
import RunSystemException from 'App/Exceptions/RunSystemException'

export default class RunSystem {
  public async handle ({}: HttpContextContract, next: () => Promise<void>) {
    let systemToken = Env.get('SYSTEM_TOKEN', null)
    let system = await System.findBy('token', systemToken)
    if (!system) throw new RunSystemException();
    await next()
  }
}
