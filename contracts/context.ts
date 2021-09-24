declare module '@ioc:Adonis/Core/HttpContext' {
  
  import SystemService from 'App/Services/SystemService'

  interface HttpContextContract {
    system: SystemService
  }

}