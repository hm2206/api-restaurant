import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import System from 'App/Models/System'

export default class SystemSeeder extends BaseSeeder {
  public async run () {
    await System.create({
      name: "Auth",
      description: "Sistema de control y autorización de usuarios",
      email: "auth@example.com",
      host: "127.0.0.1",
      version: "0.0.1"
    })
  }
}
