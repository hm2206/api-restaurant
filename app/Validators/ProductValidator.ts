import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
	constructor (protected ctx: HttpContextContract, id?: any) {
		if (id) this.formatUpdateSchema(id);
	}

	private formatSchema = {
		name: schema.string({ trim: true }, [
			rules.maxLength(50),
			rules.minLength(3)
		]),

		code: schema.string({ trim: true }, [
			rules.unique({ table: 'products', column: "code" }),
			rules.maxLength(20)
		]),

		price: schema.number([
			rules.required()
		]),

		amount: schema.number([
			rules.required()
		]),

		restaurant_id: schema.number([
			rules.required()
		])
	}

	private formatUpdateSchema(id) {
		let updateFormat = {
			code: schema.string({ trim: true }, [
				rules.unique({ table: 'products', column: "code", whereNot: { id } }),
				rules.maxLength(20)
			])
		}
		// setting schema
		this.schema = schema.create({ ...this.formatSchema, ...updateFormat });
	}

	public schema = schema.create(this.formatSchema);

	public messages = {}
}
