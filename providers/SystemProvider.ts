import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import ApiAuth from 'App/Helpers/ApiAuth'

export default class SystemProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    const HttpContext = this.app.container.use('Adonis/Core/HttpContext')
    // obtener sistema authorizado
    const api: any = await ApiAuth.get('/systems/authorize/me')
    .then(res => res.data)
    .catch(() => ({}));
    // validar
    if (!Object.keys(api).length) {
      throw new InternalServerErrorException("El sistema no existe!")
    }
    // agregar al contexto
    HttpContext.macro('system', api);
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
