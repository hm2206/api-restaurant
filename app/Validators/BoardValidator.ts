import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BoardValidator {
	constructor (protected ctx: HttpContextContract) {}

	public schema = schema.create({
		number: schema.string({ trim: true }, [
			rules.maxLength(10)
		]),

		position: schema.string({ trim: true }, [
			rules.maxLength(40)
		]),

		restaurant_id: schema.number([
			rules.required()
		])
	});

	public messages = {}
}
