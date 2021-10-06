import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import PaymentRequiredException from '../../Exceptions/PaymentRequiredException';
import PaymentItem from '../../Helpers/PaymentItem';

export default class LoginController {

    public async login({ auth, request }: HttpContextContract) {
        const schemaLogin = schema.create({
            email: schema.string({ trim: true }),
            password: schema.string({}, [
                rules.minLength(8)
            ])
        })

        const payload = await request.validate({ schema: schemaLogin });
        
        const user = await User.findBy('email', payload.email);
        if (!user) throw new PaymentRequiredException([new PaymentItem("email", "El usuario no existe")])

        const isMatch = await Hash.verify(user.password, payload.password)
        if (!isMatch) throw new PaymentRequiredException([new PaymentItem("password", "La contraseña es incorrecta")])

        const ip_address = request.ip();
        const token = await auth.attempt(payload.email, payload.password, { ip_address });

        return token;
    }

    public async logout({ auth }: HttpContextContract) {
        await auth.logout();
        return { revoked: true }
    }

}
