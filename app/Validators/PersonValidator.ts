import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonValidator {

	constructor (protected ctx: HttpContextContract, id: any = null) {
		if (id) this.formatSchemaUpdate(id);
	}

	private formatSchema = {
		name: schema.string({ trim: true }),

		ape_pat: schema.string({ trim: true }),

		ape_mat: schema.string({ trim: true }),

		date_birth: schema.date({ format: "yyyy-MM-dd" }, [
			rules.required()
		]),

		gender: schema.enum(['F', 'M']),

		type_document_id: schema.number([
			rules.required()
		]),

		document_number: schema.string({ trim: true }, [
			rules.required(),
			rules.minLength(8),
			rules.unique({ table: 'people', column: 'document_number' }),
		])
	}

	public schema = schema.create(this.formatSchema)

	public messages = {}

	private formatSchemaUpdate(id: any) {
		let formatUpdate = {
			document_number: schema.string({ trim: true }, [
				rules.required(),
				rules.minLength(8),
				rules.unique({ table: 'people', column: 'document_number', whereNot: { id } }),
			])
		}

		this.formatSchema = Object.assign(this.formatSchema, formatUpdate);
		this.schema = schema.create(this.formatSchema);
	}

}
