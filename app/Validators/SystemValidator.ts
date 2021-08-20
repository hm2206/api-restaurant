import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SystemValidator {

	constructor (protected ctx: HttpContextContract, id: any = null) {
		if (id) this.formatSchemaUpdate(id);
	}

	private formatSchema = {
		name: schema.string({ trim: true }, [
			rules.unique({ table: "systems", column: "name" })
		]),

		email: schema.string({ trim: true }, [
			rules.email()
		]),

		host: schema.string({ trim: true }, [
			rules.url()
		]),

		version: schema.string({ trim: true })
	}

	public schema = schema.create(this.formatSchema);

	public messages = {}

	private formatSchemaUpdate(id: any) {
		let formatUpdate = {
			name: schema.string({ trim: true }, [
				rules.unique({ table: "systems", column: "name", whereNot: { id } })
			]),
		}

		this.formatSchema = Object.assign(this.formatSchema, formatUpdate);
		this.schema = schema.create(this.formatSchema);
	}
}
