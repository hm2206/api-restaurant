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
			rules.minLength(8),
			rules.confirmed()
		]),

		person_id: schema.number([
			rules.required()
		]),

		role_id: schema.number([
			rules.required()
		]),
	}

	public schema = schema.create(this.formatSchema);

	public messages = {}

	private formatSchemaUpdate(id: any) {

		let formatUpdate: any = {
			username: schema.string({ trim: true }, [
				rules.unique({ table: "users", column: "username", whereNot: { id } })
			]),

			email: schema.string({ trim: true }, [
				rules.email(),
				rules.unique({ table: "users", column: "email", whereNot: { id } })
			]),

			role_id: schema.number([
				rules.required()
			]),
		}

		let isModifyPassword = this.ctx.request.input('password');

		if (isModifyPassword) {
			formatUpdate.password = schema.string({ trim: true }, [
				rules.minLength(8),
				rules.confirmed(),
			])
		}

		this.formatSchema = formatUpdate;
		this.schema = schema.create(this.formatSchema);
	}

}
