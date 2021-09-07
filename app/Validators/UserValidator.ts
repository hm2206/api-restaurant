import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
	constructor (protected ctx: HttpContextContract, id: any = null) {
		if (id) this.formatSchemaUpdate(id);
	}

	private formatSchema: any = {
		username: schema.string({ trim: true }, [
			rules.unique({ table: "users", column: "username" })
		]),

		email: schema.string({ trim: true }, [
			rules.email(),
			rules.unique({ table: "users", column: "email" })
		]),

		password: schema.string({ trim: true }, [
			rules.minLength(8)
		]),

		personId: schema.number([
			rules.required()
		]),

		roleId: schema.number([
			rules.required()
		]),
	}

	public schema = schema.create(this.formatSchema);

	public messages = {}

	private formatSchemaUpdate(id: any) {
		let formatUpdate = {
			username: schema.string({ trim: true }, [
				rules.unique({ table: "users", column: "username", whereNot: { id } })
			]),

			email: schema.string({ trim: true }, [
				rules.email(),
				rules.unique({ table: "users", column: "email", whereNot: { id } })
			])
		}


		this.formatSchema = formatUpdate;
		this.schema = schema.create(this.formatSchema);
	}

}
