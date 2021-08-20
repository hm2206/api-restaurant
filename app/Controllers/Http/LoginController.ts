import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginController {

    public async login({ auth, request }: HttpContextContract) {
        const schemaLogin = schema.create({
            email: schema.string({ trim: true }),
            password: schema.string({}, [
                rules.minLength(8)
            ])
        })

        const payload = await request.validate({ schema: schemaLogin });

        const ip_address = request.ip();
        const token = await auth.attempt(payload.email, payload.password, { ip_address });

        return token;
    }

}
