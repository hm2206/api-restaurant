import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import ObjectId from 'bson-objectid'

export default class ClientSeedSeeder extends BaseSeeder {
  public async run () {

    Client.truncate();

    let token = new ObjectId()

    await Client.create({
      name: "Testing",
      description: "Aplicación de Prueba",
      token: token.toHexString(),
      device: 'WEB',
      version: '0.0.1'
    });

  }
}
