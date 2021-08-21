import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
	constructor (protected ctx: HttpContextContract, id: any = null) {
		if (id) this.formatSchemaUpdate(id);
	}

	private formatSchema: any = {
		name: schema.string({ trim: true }, [
			rules.unique({ table: "clients", column: "name" })
		]),

		description: schema.string({ trim: true }),

		device: schema.enum(['WEB', 'MOBILE', 'DESKTOP', 'CONSOLE'], [
			rules.required()
		]),

		version: schema.string({ trim: true })
	}

	public schema = schema.create(this.formatSchema);

	public messages = {}

	private formatSchemaUpdate(id: any) {
		let formatUpdate = {
			name: schema.string({ trim: true }, [
				rules.unique({ table: "clients", column: "name", whereNot: { id } })
			])
		}

		this.formatSchema = Object.assign(this.formatSchema, formatUpdate);
		this.schema = schema.create(this.formatSchema);
	}
}
