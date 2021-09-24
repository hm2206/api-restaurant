import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantValidator {
  constructor (protected ctx: HttpContextContract, id?: any) {
    if (id) this.formatUpdateSchema(id);
  }

  private formatSchema = {
    name: schema.string({ trim: true }, [
      rules.unique({ table: 'restaurants', column: "name" }),
      rules.maxLength(50)
    ]),

    address: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.minLength(10)
    ]),

    phone: schema.string({ trim: true }, [
      rules.maxLength(12),
      rules.minLength(8)
    ])
  }

  private formatUpdateSchema(id) {
    let updateFormat = {
      name: schema.string({ trim: true }, [
        rules.unique({ table: 'restaurants', column: "name", whereNot: { id } }),
        rules.maxLength(50)
      ])
    }
    // setting schema
    this.schema = schema.create({ ...this.formatSchema, ...updateFormat });
  }

  public schema = schema.create(this.formatSchema);

  public messages = {}
}
