import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DocumentTypeValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    slug: schema.string({ trim: true }),
    name: schema.string({ trim: true }),
    name_short: schema.string({ trim: true })
  })

  public messages = {}
}
