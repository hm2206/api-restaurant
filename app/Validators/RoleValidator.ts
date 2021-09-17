import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleValidator {
	constructor (protected ctx: HttpContextContract, id :any = null) {
		if (id) this.formatSchemaUpdate(id);
	}

	private formatSchema = {

		name: schema.string({ trim: true }, [
			rules.minLength(3),
			rules.maxLength(40),
			rules.unique({ table: 'roles', column: 'name' })
		]),

		description: schema.string({ trim: true }, [
			rules.minLength(3),
			rules.maxLength(255),
		])

	}
	
	public schema = schema.create(this.formatSchema)

  	public messages = {}

	private formatSchemaUpdate(id: any) {
		let formatUpdate = {
			name: schema.string({ trim: true }, [
				rules.minLength(3),
				rules.maxLength(40),
				rules.unique({ table: "roles", column: "name", whereNot: { id } })
			]),
		}

		this.formatSchema = Object.assign(this.formatSchema, formatUpdate);
		this.schema = schema.create(this.formatSchema);
	}
}
