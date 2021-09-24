import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import ApiAuth from 'App/Helpers/ApiAuth'

export default class Jwt {

  private async authorize(ctx: HttpContextContract) {
    let token = ctx.request.header('Authorization', '');
    if (!token) this.NotAuthorization();
    let auth = await ApiAuth.auth(token);
    if (!Object.keys(auth).length) this.NotAuthorization();
    return auth;
  }

  private NotAuthorization() {
    throw new AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS')
  }

  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    // obtener usuario authenticado
    ctx.user = await this.authorize(ctx);
    // next controller/middleware
    await next()
  }
}
