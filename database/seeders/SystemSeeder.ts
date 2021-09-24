import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import System from 'App/Models/System'

export default class SystemSeeder extends BaseSeeder {
  public async run () {

    const systems = [
      {
        name: "Auth",
        description: "Sistema de control y autorización de usuarios",
        email: "auth@example.com",
        host: "127.0.0.1",
        version: "0.0.1"
      },
      {
        name: "Restaurant",
        description: "Sistema de control de restaurantes",
        email: "restaurtantes@example.com",
        host: "127.0.0.1:7777",
        version: "0.0.1"
      }
    ]

    for(let system of systems) {
      try {
        await System.create(system)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
