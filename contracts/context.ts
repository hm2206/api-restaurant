declare module '@ioc:Adonis/Core/HttpContext' {
  
  import SystemService from 'App/Services/SystemService'
  import { UserService } from 'App/Services/AuthService'

  interface HttpContextContract {
    system: SystemService,
    user: UserService,
  }

}