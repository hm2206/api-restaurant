import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeederSeeder extends BaseSeeder {
  public async run () {
    try {
      await Role.create({
        name: "Basic",
        description: "User actions basic",
        isDefault: true
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
