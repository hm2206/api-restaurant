declare module '@ioc:Adonis/Core/HttpContext' {

  import Client from 'App/Models/Client'
  import System from 'App/Models/System'
  
  interface HttpContextContract {
    client: Client,
    system: System,
  }

}